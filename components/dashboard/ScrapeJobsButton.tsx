import React, { useState, useEffect } from 'react';
import supabase from '@/utils/supabase/client';

const ScrapeJobsButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [processInfo, setProcessInfo] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [lastScrapeDate, setLastScrapeDate] = useState<Date | null>(null);
  const [daysAgo, setDaysAgo] = useState<number | null>(null);

  useEffect(() => {
    const fetchLastScrapeDate = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('created_at')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching last scrape date:', error);
      } else if (data && data.length > 0) {
        const lastDate = new Date(data[0].created_at);
        setLastScrapeDate(lastDate);

        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - lastDate.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
        setDaysAgo(daysDifference);
      }
    };

    fetchLastScrapeDate();
  }, []);

  const handleScrapeJobs = async () => {
    const controller = new AbortController();
    setAbortController(controller);

    try {
      setIsLoading(true);
      setProcessInfo('Scraping jobs...');

      const response = await fetch('/api/scrapeJobs', { 
        method: 'POST', 
        signal: controller.signal 
      });
      
      const result = await response.json();
      setIsLoading(false);
      setProcessInfo('Jobs scraped successfully');
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setProcessInfo('Job scraping aborted.');
      } else {
        setProcessInfo('Error scraping jobs');
      }
      setIsLoading(false);
    }
  };

  const handleAbort = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {lastScrapeDate && daysAgo !== null && (
        <div className="mb-4 text-center">
          <p className="text-gray-700">Last scrape: {lastScrapeDate.toLocaleDateString()}</p>
          <p className="text-gray-700">{daysAgo} days ago</p>
        </div>
      )}
      <button 
        onClick={handleScrapeJobs} 
        className={`bg-primary text-white p-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        Scrape Jobs
      </button>
      {isLoading && (
        <button 
          onClick={handleAbort} 
          className="bg-red-500 text-white p-2 rounded mt-2"
        >
          Abort
        </button>
      )}
      {processInfo && <p className="mt-2 text-gray-700">{processInfo}</p>}
    </div>
  );
};

export default ScrapeJobsButton;