"use client";

import { useState, useEffect } from 'react';
import { useJobs, Job } from '@/utils/supabase/hooks/useJobs';
import JobCard from '@/components/JobCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterComponent from '@/components/JobFilter';
import NavigationTabs from '@/components/NavigationTabs';
import SubscriptionComponent from '@/components/SubscriptionComponent';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Banner from '@/components/Banner';

export default function Jobs() {
  const { jobs, locations, jobCategories, agencyIndustries, agencyNames, loading } = useJobs();
  const [filter, setFilter] = useState({
    keyword: '',
    jobCategory: '',
    location: [] as { value: string, label: string }[],
    agencyIndustry: '',
    agencyName: '',
    seniorityLevel: '',
    employmentType: '',
  });

  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [visibleJobsCount, setVisibleJobsCount] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortOption, setSortOption] = useState<'relevance' | 'date'>('relevance');

  useEffect(() => {
    if (!loading) {
      const filtered = jobs.filter(job => {
        const matchesKeyword =
          filter.keyword === '' ||
          job.title.toLowerCase().includes(filter.keyword.toLowerCase()) ||
          job.agency_name.toLowerCase().includes(filter.keyword.toLowerCase());
        const matchesJobCategory = filter.jobCategory === '' || job.job_category === filter.jobCategory;
        const matchesLocation = filter.location.length === 0 || filter.location.some(loc => job.location.includes(loc.value));
        const matchesAgencyIndustry = filter.agencyIndustry === '' || job.agency_industry === filter.agencyIndustry;
        const matchesAgencyName = filter.agencyName === '' || job.agency_name === filter.agencyName;
        const matchesSeniorityLevel = filter.seniorityLevel === '' || job.seniority_level === filter.seniorityLevel;
        const matchesEmploymentType = filter.employmentType === '' || job.employment_type === filter.employmentType;

        return (
          matchesKeyword &&
          matchesJobCategory &&
          matchesLocation &&
          matchesAgencyIndustry &&
          matchesAgencyName &&
          matchesSeniorityLevel &&
          matchesEmploymentType
        );
      });

      const sorted = filtered.sort((a, b) => {
        const scoreValue = (score: string) => {
          if (score === 'High') return 3;
          if (score === 'Medium') return 2;
          if (score === 'Low') return 1;
          return 0;
        };
        if (sortOption === 'date') {
          return new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime();
        }
        return scoreValue(b.job_score) - scoreValue(a.job_score);
      });

      setFilteredJobs(sorted);
    }
  }, [loading, jobs, filter, sortOption]);

  const loadMoreJobs = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleJobsCount(prevCount => prevCount + 20);
      setLoadingMore(false);
    }, 1000);
  };

  const handleFilterChange = (filterUpdate: any) => {
    setFilter(filterUpdate);
  };

  const clearFilter = (name: string) => {
    setFilter({
      ...filter,
      [name]: name === 'location' ? [] : '',
    });
  };

  const clearAllFilters = () => {
    setFilter({
      keyword: '',
      jobCategory: '',
      location: [],
      agencyIndustry: '',
      agencyName: '',
      seniorityLevel: '',
      employmentType: '',
    });
  };

  return (
    <div className="bg-background p-6 max-w-screen-lg px-4 mx-auto">
      <Banner />
      <Header />
      <NavigationTabs />
      <div className="pt-4">
        <FilterComponent
          filter={filter}
          setFilter={setFilter}
          locations={locations.map(loc => ({ value: loc, label: loc }))}
          jobCategories={jobCategories}
          agencyIndustries={agencyIndustries}
          agencyNames={agencyNames}
          clearFilter={clearFilter}
          clearAllFilters={clearAllFilters}
        />
      </div>
      {loading ? (
        <div>Loading job listings...</div>
      ) : (
        <div className="block w-full max-w-[1088px] mx-auto px-4">
          {filteredJobs.length > 0 && (
            <div className="flex items-center justify-between mt-4 text-sm w-full mb-4">
              <div>
                Showing <span className="font-bold">{filteredJobs.length}</span> job{filteredJobs.length !== 1 ? 's' : ''}
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
          {filteredJobs.length > 0 ? (
            <>
              <div className="flex flex-col gap-0">
                {filteredJobs.slice(0, visibleJobsCount).map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              {visibleJobsCount < filteredJobs.length && (
                <div className="flex justify-center items-center mt-4 mb-4">
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
      )}
      <Footer />
    </div>
  );
}