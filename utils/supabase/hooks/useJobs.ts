import { useState, useEffect, useRef } from 'react';
import supabase from '@/utils/supabase/client';

export type Job = {
  id: number;
  title: string;
  agency_id: number;
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
  job_score: string;
  status: string;
  updated_at: string;
  created_at: string;
  description_html: string;
  description_text: string;
  salary_info: string;
  benefits: string;
  company_description: string;
  company_linkedin_url: string;
  company_website: string;
  company_slogan: string;
  company_employees_count: number;
  applicants_count: number;
  link: string;
  german_score: string;
  english_score: string;
  cac_description: string;
};

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [jobCategories, setJobCategories] = useState<string[]>([]);
  const [agencyIndustries, setAgencyIndustries] = useState<string[]>([]);
  const [agencyNames, setAgencyNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    const fetchJobs = async () => {
      console.log("Fetching jobs from Supabase...");
      const { data, error } = await supabase.from('jobs').select(`
        id,
        title,
        agency_id,
        agency_name,
        company_logo,
        location,
        posted_at,
        job_function,
        seniority_level,
        employment_type,
        apply_url,
        industries,
        job_category,
        agency_industry,
        job_score,
        status,
        updated_at,
        created_at,
        description_html,
        description_text,
        salary_info,
        benefits,
        company_description,
        company_linkedin_url,
        company_website,
        company_slogan,
        company_employees_count,
        applicants_count,
        link,
        german_score,
        english_score,
        cac_description
      `);

      if (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
        return;
      } 

      if (data) {
        console.log("Jobs data fetched:", data);
        setJobs(data);
        const uniqueLocations = Array.from(new Set(data.map(job => job.location)));
        const uniqueJobCategories = Array.from(new Set(data.map(job => job.job_category)));
        const uniqueAgencyIndustries = Array.from(new Set(data.map(job => job.agency_industry)));
        const uniqueAgencyIds = Array.from(new Set(data.map(job => job.agency_id)));

        const { data: agenciesData, error: agenciesError } = await supabase
          .from('agencies')
          .select('id, agency_name')
          .in('id', uniqueAgencyIds);

        if (agenciesError) {
          console.error("Error fetching agency names:", agenciesError);
        } else if (agenciesData) {
          console.log("Agencies data fetched:", agenciesData);
          const agencyMap = new Map(agenciesData.map((agency: any) => [agency.id, agency.agency_name]));
          const agencyNamesList = data.map(job => agencyMap.get(job.agency_id) || 'Unknown');
          setAgencyNames(agencyNamesList);

          setLocations(uniqueLocations);
          setJobCategories(uniqueJobCategories);
          setAgencyIndustries(uniqueAgencyIndustries);

          localStorage.setItem('jobs', JSON.stringify(data));
          localStorage.setItem('locations', JSON.stringify(uniqueLocations));
          localStorage.setItem('jobCategories', JSON.stringify(uniqueJobCategories));
          localStorage.setItem('agencyIndustries', JSON.stringify(uniqueAgencyIndustries));
          localStorage.setItem('agencyNames', JSON.stringify(agencyNamesList));
        }
      }

      setLoading(false);
    };

    if (dataFetchedRef.current) {
      const jobsData = localStorage.getItem('jobs');
      const locationsData = localStorage.getItem('locations');
      const jobCategoriesData = localStorage.getItem('jobCategories');
      const agencyIndustriesData = localStorage.getItem('agencyIndustries');
      const agencyNamesData = localStorage.getItem('agencyNames');

      if (jobsData && locationsData && jobCategoriesData && agencyIndustriesData && agencyNamesData) {
        console.log("Fetching data from local storage...");
        setJobs(JSON.parse(jobsData));
        setLocations(JSON.parse(locationsData));
        setJobCategories(JSON.parse(jobCategoriesData));
        setAgencyIndustries(JSON.parse(agencyIndustriesData));
        setAgencyNames(JSON.parse(agencyNamesData));
        setLoading(false);
      } else {
        fetchJobs();
      }
    } else {
      dataFetchedRef.current = true;
      fetchJobs();
    }
  }, []);

  return { jobs, locations, jobCategories, agencyIndustries, agencyNames, loading };
};