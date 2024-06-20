import { useState, useEffect } from 'react';
import supabase from '@/utils/supabase/client';

export type Job = {
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

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [jobCategories, setJobCategories] = useState<string[]>([]);
  const [agencyIndustries, setAgencyIndustries] = useState<string[]>([]);
  const [agencyNames, setAgencyNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase.from('jobs').select('*');

      if (error) {
        console.error("Error fetching jobs:", error);
      } else {
        setJobs(data || []);
        const uniqueLocations = Array.from(new Set(data.map(job => job.location)));
        const uniqueJobCategories = Array.from(new Set(data.map(job => job.job_category)));
        const uniqueAgencyIndustries = Array.from(new Set(data.map(job => job.agency_industry)));
        const uniqueAgencyNames = Array.from(new Set(data.map(job => job.agency_name)));
        setLocations(uniqueLocations);
        setJobCategories(uniqueJobCategories);
        setAgencyIndustries(uniqueAgencyIndustries);
        setAgencyNames(uniqueAgencyNames);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return { jobs, locations, jobCategories, agencyIndustries, agencyNames, loading };
};