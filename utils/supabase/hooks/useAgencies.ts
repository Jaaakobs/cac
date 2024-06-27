import { useState, useEffect, useRef } from 'react';
import supabase from '@/utils/supabase/client';

export type Agency = {
  id: number;
  agency_name: string;
  linkedin_url: string;
  background_cover_image_url: string;
  linkedin_internal_id: number;
  profile_photo: string;
  industry: string;
  tagline: string;
  company_size_on_linkedin: string;
  about: string;
  website: string;
  company_size: string;
  headquarters: string;
  type: string;
  founded: number;
  specialties: string;
  linkedin_jobs_url: string;
};

export const useAgencies = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    const fetchAgencies = async () => {
      const { data, error } = await supabase.from('agencies').select('*');

      if (error) {
        console.error("Error fetching agencies:", error);
      } else {
        setAgencies(data || []);
        localStorage.setItem('agencies', JSON.stringify(data));
      }
      setLoading(false);
    };

    if (dataFetchedRef.current) {
      const agenciesData = localStorage.getItem('agencies');
      if (agenciesData) {
        setAgencies(JSON.parse(agenciesData));
        setLoading(false);
      } else {
        fetchAgencies();
      }
    } else {
      dataFetchedRef.current = true;
      fetchAgencies();
    }
  }, []);

  return { agencies, loading };
};