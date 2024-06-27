import { useState, useEffect, useRef } from 'react';
import supabase from '@/utils/supabase/client';

export type Company = {
  id: number;
  name: string;
  company_logo: string;
  company_description_short: string;
  job_count: number;
};

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      // Fetch agencies
      const { data: agencies, error: agenciesError } = await supabase
        .from('agencies')
        .select('id, agency_name, profile_photo, about');

      if (agenciesError) {
        console.error("Error fetching agencies:", agenciesError);
        setLoading(false);
        return;
      }

      // Fetch all jobs
      const { data: jobs, error: jobsError } = await supabase
        .from('jobs')
        .select('agency_id');

      if (jobsError) {
        console.error("Error fetching jobs:", jobsError);
        setLoading(false);
        return;
      }

      // Count jobs per agency
      const jobCountMap: { [key: number]: number } = {};
      jobs.forEach((job: any) => {
        if (job.agency_id) {
          if (!jobCountMap[job.agency_id]) {
            jobCountMap[job.agency_id] = 0;
          }
          jobCountMap[job.agency_id] += 1;
        }
      });

      // Map agency data to companies
      const companies = agencies.map((agency: any) => ({
        id: agency.id,
        name: agency.agency_name,
        company_logo: agency.profile_photo,
        company_description_short: agency.about,
        job_count: jobCountMap[agency.id] || 0,
      }));

      console.log("Processed companies data:", companies);
      setCompanies(companies);
      localStorage.setItem('companies', JSON.stringify(companies));
      setLoading(false);
    };

    if (dataFetchedRef.current) {
      const companiesData = localStorage.getItem('companies');
      if (companiesData) {
        setCompanies(JSON.parse(companiesData));
        setLoading(false);
      } else {
        fetchCompanies();
      }
    } else {
      dataFetchedRef.current = true;
      fetchCompanies();
    }
  }, []);

  return { companies, loading };
};