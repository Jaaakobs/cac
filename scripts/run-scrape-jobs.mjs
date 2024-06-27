import fetch from 'node-fetch';

const runScrapeJobs = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/scrape-jobs', {
      method: 'POST',
    });
    if (response.ok) {
      console.log('Job scraping initiated successfully');
    } else {
      const errorText = await response.text();
      console.error('Failed to initiate job scraping:', errorText);
    }
  } catch (error) {
    console.error('Error running scrape jobs:', error);
  }
};

runScrapeJobs();