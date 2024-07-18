import { NextResponse } from 'next/server';

async function triggerScrapeJobs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scrapeJobs`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to scrape jobs');
  }
}

async function triggerUpdateJobs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateJobs`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to update jobs');
  }
}

export async function POST() {
  try {
    await triggerScrapeJobs();
    await triggerUpdateJobs();
    return NextResponse.json({ message: 'Full update completed successfully' });
  } catch (error) {
    console.error('Error during full update:', error);
    return NextResponse.json({ error: 'Error during full update' }, { status: 500 });
  }
}