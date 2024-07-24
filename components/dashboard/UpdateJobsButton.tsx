import React, { useState, useEffect } from 'react';
import supabase from '@/utils/supabase/client';

const UpdateJobsButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [processInfo, setProcessInfo] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [missingJobCategoryCount, setMissingJobCategoryCount] = useState<number | null>(null);
  const [missingJobScoreCount, setMissingJobScoreCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchMissingJobs = async () => {
      const { data: jobCategoryData, error: jobCategoryError } = await supabase
        .from('jobs')
        .select('*', { count: 'exact' })
        .is('job_category', null);

      const { data: jobScoreData, error: jobScoreError } = await supabase
        .from('jobs')
        .select('*', { count: 'exact' })
        .is('job_score', null);

      if (jobCategoryError) {
        console.error('Error fetching jobs missing job_category:', jobCategoryError);
      } else {
        setMissingJobCategoryCount(jobCategoryData.length);
      }

      if (jobScoreError) {
        console.error('Error fetching jobs missing job_score:', jobScoreError);
      } else {
        setMissingJobScoreCount(jobScoreData.length);
      }
    };

    fetchMissingJobs();
  }, []);

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
      {missingJobCategoryCount !== null && missingJobScoreCount !== null && (
        <div className="mb-4 text-center">
          <p className="text-gray-700">Jobs missing category: {missingJobCategoryCount}</p>
          <p className="text-gray-700">Jobs missing score: {missingJobScoreCount}</p>
        </div>
      )}
      <button 
        onClick={handleUpdateJobs} 
        className={`bg-primary text-white p-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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