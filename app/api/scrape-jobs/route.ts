import { NextResponse } from 'next/server';
import { ApifyClient } from 'apify-client';
import supabase from '@/utils/supabase/client';
import OpenAI from 'openai';

if (!process.env.APIFY_API_TOKEN) {
  throw new Error('APIFY_API_TOKEN environment variable is not set.');
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set.');
}

const apifyClient = new ApifyClient({ token: process.env.APIFY_API_TOKEN });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateOpenAIResponse = async (description: string, promptTemplate: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: `${promptTemplate}\n${description}` },
    ],
  });

  const choice = response?.choices?.[0]?.message?.content?.trim();
  if (!choice) {
    throw new Error('Invalid OpenAI response');
  }
  return choice;
};

const extractLanguageScores = (languageScores: string) => {
  let german_score = 'n/a';
  let english_score = 'n/a';
  for (const part of languageScores.split(',')) {
    if (part.includes('German')) {
      german_score = part.split('(')[1].replace(')', '').trim();
    } else if (part.includes('English')) {
      english_score = part.split('(')[1].replace(')', '').trim();
    }
  }
  return { german_score, english_score };
};

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

        // Generate OpenAI responses for each job description
        const languageScores = await generateOpenAIResponse(item.descriptionText, languagePromptTemplate);
        const { german_score, english_score } = extractLanguageScores(languageScores);

        const jobCategory = await generateOpenAIResponse(item.descriptionText, categoryPromptTemplate);
        const jobScore = await generateOpenAIResponse(item.descriptionText, scorePromptTemplate);

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
          job_score: jobScore,
          job_category: jobCategory,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          german_score: german_score,
          english_score: english_score,
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




// Prompt templates
const languagePromptTemplate = `Based on the job description for a position located in Germany, determine the required language proficiency levels. Select up to two languages, choosing from German and English, and specify their proficiency levels. The language proficiency levels available are: German (B2), German (C1), German (C2), English (B2), English (C1), and English (C2). Output the language proficiency levels in the format 'Language Proficiency (Level)', separated by a comma if selecting two. Focus solely on providing the language proficiency levels in your response, without including any additional information or context.

For example:
- If the job requires native German skills and professional English communication, your output could be: 'German (C2), English (B2)'.
- If the role demands professional proficiency in both German and English, consider: 'German (B2), English (B2)'.

Ensure your response strictly adheres to this format and includes no extraneous details beyond the specified language proficiency levels.
Even if you are unsure about the level, add at least one output never give back something blank.

Job Description:`;

const categoryPromptTemplate = `Based on the job description, categorize the job into one or more of the following categories, but select a maximum of 3, ideally just 1: Biz Dev Jobs, Creative Jobs, Delivery Jobs, Design Jobs, Marketing Jobs, Operations Jobs, Strategy Jobs, Tech Jobs. Provide the job categories separated by commas.

Job Description:`;

const scorePromptTemplate = `Evaluate the job description and assign a job score based on the following criteria:
- Low: The job offer is rather generic and seems very unspecial.
- Medium: The job offer is good and reasonably interesting.
- High: The job offer is extremely interesting and rare.

Provide only the job score without any additional information.

Job Description:`;