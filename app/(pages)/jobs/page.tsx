"use client";

import { useState, useEffect } from 'react';
import { useJobs, Job } from '@/utils/supabase/hooks/useJobs'; // Importing Job type
import JobListComponent from '@/components/JobList';
import MenuBar from '@/components/MenuBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterComponent from '@/components/JobFilter';

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
        return scoreValue(b.job_score) - scoreValue(a.job_score); // Sort by job_score for relevance
      });

      setFilteredJobs(sorted);
    }
  }, [loading, jobs, filter, sortOption]);

  const loadMoreJobs = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleJobsCount(prevCount => prevCount + 20);
      setLoadingMore(false);
    }, 1000); // Simulating a network request with a timeout
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
    <div className="p-6 max-w-screen-lg px-4 mx-auto">
      <MenuBar />
      <Header />
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
      {loading ? (
        <div>Loading job listings...</div>
      ) : (
        <JobListComponent
          jobs={filteredJobs}
          locations={locations.map(loc => ({ value: loc, label: loc }))}
          jobCategories={jobCategories}
          agencyIndustries={agencyIndustries}
          agencyNames={agencyNames}
          filter={filter}
          setFilter={handleFilterChange}
          clearFilter={clearFilter}
          clearAllFilters={clearAllFilters}
          loadMoreJobs={loadMoreJobs}
          visibleJobsCount={visibleJobsCount}
          loadingMore={loadingMore}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      )}
      <Footer />
    </div>
  );
}