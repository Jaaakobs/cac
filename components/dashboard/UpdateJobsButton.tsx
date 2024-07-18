import React, { useState } from 'react';

const UpdateJobsButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [processInfo, setProcessInfo] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const handleUpdateJobs = async () => {
    const controller = new AbortController();
    setAbortController(controller);

    try {
      setIsLoading(true);
      setProcessInfo('Updating jobs...');

      const response = await fetch('/api/updateJobs', { 
        method: 'POST', 
        signal: controller.signal 
      });
      
      const result = await response.json();
      setIsLoading(false);
      setProcessInfo('Jobs updated successfully');
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setProcessInfo('Job update aborted.');
      } else {
        setProcessInfo('Error updating jobs');
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
        onClick={handleUpdateJobs} 
        className={`bg-blue-500 text-white p-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        Update Jobs
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

export default UpdateJobsButton;