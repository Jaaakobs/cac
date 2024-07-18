import React, { useState } from 'react';

const ScrapeJobsButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [processInfo, setProcessInfo] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

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
      <button 
        onClick={handleScrapeJobs} 
        className={`bg-blue-500 text-white p-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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