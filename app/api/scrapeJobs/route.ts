import { NextResponse } from 'next/server';
import { ApifyClient } from 'apify-client';
import supabase from '@/utils/supabase/client';

if (!process.env.APIFY_API_TOKEN) {
  throw new Error('APIFY_API_TOKEN environment variable is not set.');
}

const apifyClient = new ApifyClient({ token: process.env.APIFY_API_TOKEN });

const parseBigInt = (value: string | undefined) => {
  return value ? parseInt(value, 10) || null : null;
};

export async function POST() {
  try {
    console.log('Starting job scraping process...');

    // Fetch agencies from the database
    const { data: agencies, error: agenciesError } = await supabase
      .from('agencies')
      .select('*')
      .eq('job_scraping', true)
      .not('linkedin_jobs_url', 'is', null);

    if (agenciesError) {
      console.error('Error fetching agencies:', agenciesError);
      return NextResponse.json({ error: 'Error fetching agencies' }, { status: 500 });
    }

    console.log('Agencies fetched:', agencies.length);

    // Iterate over each agency and fetch jobs
    for (const agency of agencies) {
      if (agency.last_scraped_date) {
        const lastScraped = new Date(agency.last_scraped_date);
        const now = new Date();
        const diffHours = (now.getTime() - lastScraped.getTime()) / 1000 / 60 / 60;
        if (diffHours < 24) {
          console.log(`Skipping agency: ${agency.agency_name}, scraped within the last 24 hours.`);
          continue;
        }
      }

      console.log(`Processing agency: ${agency.agency_name}`);

      // Mark all current jobs for the agency as inactive
      const { error: updateError } = await supabase
        .from('jobs')
        .update({ status: 'inactive' })
        .eq('agency_id', agency.id);

      if (updateError) {
        console.error('Error marking current jobs as inactive:', updateError);
        return NextResponse.json({ error: 'Error marking current jobs as inactive' }, { status: 500 });
      }

      // Fetch new jobs from Apify
      const runInput = {
        searchUrl: agency.linkedin_jobs_url,
        scrapeCompany: true,
        startPage: 1,
        count: 25,
        proxy: {
          useApifyProxy: true,
          apifyProxyGroups: ['BUYPROXIES94952'],
          apifyProxyCountry: 'US',
        },
        scrapeJobDetails: false,
        scrapeSkills: false,
        minDelay: 2,
        maxDelay: 5,
      };

      const run = await apifyClient.actor('gdbRh93zn42kBYDyS').call(runInput);
      const { items: newJobs } = await apifyClient.dataset(run.defaultDatasetId).listItems();

      const jobIds = new Set();
      const jobsToUpsert = [];

      for (const item of newJobs) {
        if (jobIds.has(item.id)) {
          console.warn(`Duplicate job ID found: ${item.id}. Skipping.`);
          continue;
        }

        const jobData = {
          id: item.id,
          title: item.title,
          agency_name: agency.agency_name,
          company_logo: item.companyLogo,
          location: item.location,
          posted_at: item.postedAt,
          job_function: item.jobFunction,
          seniority_level: item.seniorityLevel,
          employment_type: item.employmentType,
          apply_url: item.applyUrl,
          link: item.link,
          industries: item.industries,
          agency_industry: agency.industry,
          agency_id: agency.id,
          description_html: item.descriptionHtml,
          description_text: item.descriptionText,
          salary_info: item.salaryInfo.join(', '),
          benefits: item.benefits.join(', '),
          company_description: item.companyDescription,
          company_website: item.companyWebsite,
          company_slogan: item.companySlogan,
          company_employees_count: parseBigInt(item.companyEmployeesCount),
          applicants_count: parseBigInt(item.applicantsCount),
          company_linkedin_url: item.companyLinkedinUrl,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          status: 'active', // Mark as active
        };

        jobsToUpsert.push(jobData);
        jobIds.add(item.id);
      }

      // Upsert jobs
      const { error: upsertError } = await supabase.from('jobs').upsert(jobsToUpsert, { onConflict: 'id' });

      if (upsertError) {
        console.error('Error upserting jobs:', upsertError);
        return NextResponse.json({ error: 'Error upserting jobs' }, { status: 500 });
      }

      // Update the agency's last_scraped_date, open_jobs, and closed_jobs
      const { error: agencyUpdateError } = await supabase
        .from('agencies')
        .update({
          last_scraped_date: new Date().toISOString(),
          open_jobs: jobsToUpsert.filter(job => job.status === 'active').length,
          closed_jobs: jobsToUpsert.filter(job => job.status === 'inactive').length,
        })
        .eq('id', agency.id);

      if (agencyUpdateError) {
        console.error('Error updating agency:', agencyUpdateError);
        return NextResponse.json({ error: 'Error updating agency' }, { status: 500 });
      }

      console.log('Job listings updated successfully for agency:', agency.agency_name);
    }

    return NextResponse.json({ message: 'Job listings updated successfully' });
  } catch (error) {
    console.error('Error scraping jobs:', error);
    return NextResponse.json({ error: 'Error scraping jobs' }, { status: 500 });
  }
}