import React from 'react';
import JobCard from '@/components/JobCard';
import SubscriptionComponent from '@/components/SubscriptionComponent';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Job = {
  id: number;
  title: string;
  agency_name: string;
  company_logo: string;
  location: string;
  posted_at: string;
  job_function: string;
  seniority_level: string;
  employment_type: string;
  apply_url: string;
  industries: string;
  job_category: string;
  agency_industry: string;
  job_score: string; // Ensure job_score is a string
};

type Filter = {
  keyword: string;
  jobCategory: string;
  location: { value: string, label: string }[];
  agencyIndustry: string;
  agencyName: string;
  seniorityLevel: string;
  employmentType: string;
};

type JobListComponentProps = {
  jobs: Job[];
  locations: { value: string, label: string }[];
  jobCategories: string[];
  agencyIndustries: string[];
  agencyNames: string[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  clearFilter: (name: string) => void;
  clearAllFilters: () => void;
  loadMoreJobs: () => void;
  visibleJobsCount: number;
  loadingMore: boolean;
  sortOption: 'relevance' | 'date';
  setSortOption: (option: 'relevance' | 'date') => void;
};

const JobListComponent: React.FC<JobListComponentProps> = ({
  jobs,
  locations,
  jobCategories,
  agencyIndustries,
  agencyNames,
  filter,
  setFilter,
  clearFilter,
  clearAllFilters,
  loadMoreJobs,
  visibleJobsCount,
  loadingMore,
  sortOption,
  setSortOption,
}) => {
  return (
    <div className="block w-full max-w-[1088px] mx-auto px-4">
      {jobs.length > 0 && (
        <div className="flex items-center justify-between mt-4 text-sm w-full mb-4">
          <div>
            Showing <span className="font-bold">{jobs.length}</span> job{jobs.length !== 1 ? 's' : ''}
          </div>
          <div className="flex items-center">
            <span>Sort by: </span>
            <button
              className={`ml-2 ${sortOption === 'relevance' ? 'font-medium text-black' : 'text-blue-500'}`}
              onClick={() => setSortOption('relevance')}
            >
              Relevance
            </button>
            <span className="mx-2">-</span>
            <button
              className={`${sortOption === 'date' ? 'font-medium text-black' : 'text-blue-500'}`}
              onClick={() => setSortOption('date')}
            >
              Date
            </button>
          </div>
        </div>
      )}
      {jobs.length > 0 ? (
        <>
          <div className="flex flex-col gap-4">
            {jobs.slice(0, visibleJobsCount).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          {visibleJobsCount < jobs.length && (
            <div className="self-center mt-4 mb-4">
              <Button onClick={loadMoreJobs} disabled={loadingMore}>
                {loadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}
        </>
      ) : (
        <SubscriptionComponent />
      )}
    </div>
  );
};

export default JobListComponent;