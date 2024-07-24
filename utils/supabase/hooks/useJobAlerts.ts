import { useState, useEffect, useRef } from 'react';
import supabase from '@/utils/supabase/client';

export type JobAlert = {
  id: bigint;
  created_at: string;
  email: string;
  name: string;
  location: string;
  job_function: string;
  industry: string;
  seniority: string;
  employment_type: string;
  doi: boolean;
  matching_job_ids: string;
  subscribed: boolean;
};

export const useJobAlerts = () => {
  const [jobAlerts, setJobAlerts] = useState<JobAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    const fetchJobAlerts = async () => {
      const { data, error } = await supabase.from('jobAlerts').select('*');

      if (error) {
        console.error("Error fetching job alerts:", error);
      } else {
        setJobAlerts(data || []);
        localStorage.setItem('jobAlerts', JSON.stringify(data));
      }
      setLoading(false);
    };

    if (dataFetchedRef.current) {
      const jobAlertsData = localStorage.getItem('jobAlerts');
      if (jobAlertsData) {
        setJobAlerts(JSON.parse(jobAlertsData));
        setLoading(false);
      } else {
        fetchJobAlerts();
      }
    } else {
      dataFetchedRef.current = true;
      fetchJobAlerts();
    }
  }, []);

  return { jobAlerts, loading };
};