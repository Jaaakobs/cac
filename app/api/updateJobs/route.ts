import { NextResponse } from 'next/server';
import supabase from '@/utils/supabase/client';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set.');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BATCH_SIZE = 10;

interface Job {
  id: string;
  title: string;
  employment_type: string;
  seniority_level: string;
  job_function: string;
  ai_update: boolean;
  description_text: string;
}

const generateOpenAIResponse = async (prompt: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt },
    ],
  });

  const choice = response?.choices?.[0]?.message?.content?.trim();
  if (!choice) {
    throw new Error('Invalid OpenAI response');
  }
  return choice;
};

const updateJobCategoryAndScore = async (job: Job): Promise<{ jobCategory: string; jobScore: string }> => {
  const categoryPrompt = `Based on the job description, categorize the job into one or more of the following categories, but select a maximum of 3, ideally just 1: Biz Dev Jobs, Creative Jobs, Delivery Jobs, Design Jobs, Marketing Jobs, Operations Jobs, Strategy Jobs, Tech Jobs. Provide the job categories separated by commas. Don't provide anything else or that you cannot assign a job. If you don't have any assignment then leave this field blank. Never add anything else.

Job Description: ${job.description_text}`;

  const scorePrompt = `Evaluate the job description and assign a job score based on the following criteria:
- Low: The job offer is rather generic and seems very unspecial.
- Medium: The job offer is good and reasonably interesting.
- High: The job offer is extremely interesting and rare.

Provide only the job score without any additional information.

Job Description: ${job.description_text}`;

  const jobCategory = await generateOpenAIResponse(categoryPrompt);
  const jobScore = await generateOpenAIResponse(scorePrompt);

  return { jobCategory, jobScore };
};

export async function POST() {
  try {
    console.log('Starting job update process...');

    let offset = 0;
    let jobsToUpdate = [];

    while (true) {
      const { data: jobs, error: jobsError } = await supabase
        .from('jobs')
        .select('*')
        .eq('ai_update', false)
        .order('id', { ascending: true })
        .range(offset, offset + BATCH_SIZE - 1);

      if (jobsError) {
        console.error('Error fetching jobs:', jobsError);
        return NextResponse.json({ error: 'Error fetching jobs' }, { status: 500 });
      }

      if (jobs.length === 0) {
        // Check if there are any jobs left with ai_update = false
        const { data: remainingJobs, error: remainingJobsError } = await supabase
          .from('jobs')
          .select('id')
          .eq('ai_update', false);

        if (remainingJobsError) {
          console.error('Error fetching remaining jobs:', remainingJobsError);
          return NextResponse.json({ error: 'Error fetching remaining jobs' }, { status: 500 });
        }

        if (remainingJobs.length === 0) {
          break; // No more jobs to process
        }

        offset = 0; // Reset offset to re-check all jobs
        continue; // Continue the loop to process remaining jobs
      }

      for (const job of jobs) {
        const { jobCategory, jobScore } = await updateJobCategoryAndScore(job);

        const isCategoryValid = jobCategory && jobCategory.match(/^(Biz Dev Jobs|Creative Jobs|Delivery Jobs|Design Jobs|Marketing Jobs|Operations Jobs|Strategy Jobs|Tech Jobs)(, (Biz Dev Jobs|Creative Jobs|Delivery Jobs|Design Jobs|Marketing Jobs|Operations Jobs|Strategy Jobs|Tech Jobs)){0,2}$/);
        const isScoreValid = jobScore && (jobScore === 'Low' || jobScore === 'Medium' || jobScore === 'High');

        jobsToUpdate.push({
          id: job.id,
          job_category: jobCategory,
          job_score: jobScore,
          ai_update: isCategoryValid && isScoreValid,
        });
      }

      const { error: updateError } = await supabase
        .from('jobs')
        .upsert(jobsToUpdate, { onConflict: 'id' });

      if (updateError) {
        console.error('Error updating jobs:', updateError);
        return NextResponse.json({ error: 'Error updating jobs' }, { status: 500 });
      }

      offset += BATCH_SIZE;
      jobsToUpdate = []; // Reset jobsToUpdate for the next batch
    }

    return NextResponse.json({ message: 'Job updates completed successfully' });
  } catch (error) {
    console.error('Error updating jobs:', error);
    return NextResponse.json({ error: 'Error updating jobs' }, { status: 500 });
  }
}