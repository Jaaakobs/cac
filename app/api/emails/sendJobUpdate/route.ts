import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import JobUpdate from '@/components/emails/JobUpdate';
import supabase from '@/utils/supabase/client';
import * as React from 'react';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set.');
}

const resend = new Resend(process.env.RESEND_API_KEY);

const updateMatchingJobIds = async () => {
  const { error } = await supabase.rpc('update_matching_job_ids');
  if (error) {
    console.error('Error updating matching job ids:', error);
    throw error;
  }
};

export async function POST() {
  try {
    // Update matching job IDs
    await updateMatchingJobIds();

    // Fetch users from jobAlerts table
    const { data: users, error: usersError } = await supabase
      .from('jobAlerts')
      .select('id, email, name, matching_job_ids');

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }

    // Loop through each user and send an email with their matching jobs
    for (const user of users) {
      const jobIds = user.matching_job_ids ? user.matching_job_ids.split(',') : [];

      if (jobIds.length > 0) {
        // Fetch job details for matching job IDs
        const { data: jobsData, error: jobsError } = await supabase
          .from('jobs')
          .select('id, title, agency_name, location, employment_type, seniority_level, posted_at, job_function')
          .in('id', jobIds);

        if (jobsError) {
          console.error('Error fetching jobs for user:', user.email, jobsError);
          continue;
        }

        // Convert jobsData to the correct type
        const jobs: Array<{ id: string; title: string; agency_name: string; location: string; employment_type: string; seniority_level: string; posted_at: string; job_function: string }> = jobsData as any;

        // Send the email using Resend
        const { data, error } = await resend.emails.send({
          from: 'Creative Agency Careers <no-reply@creativeagencycareers.com>',
          to: [user.email],
          subject: 'Your Job Updates',
          react: React.createElement(JobUpdate, { name: user.name, jobs }) as React.ReactElement,
        });

        if (error) {
          console.error('Error sending email to user:', user.email, error);
        } else {
          console.log('Email sent successfully to:', user.email);
        }
      }
    }

    return NextResponse.json({ message: 'Job update emails sent successfully' });
  } catch (error) {
    console.error('Error sending job update emails:', error);
    return NextResponse.json({ error: 'Error sending job update emails' }, { status: 500 });
  }
}