"use client";

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import supabase from '@/utils/supabase/client';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import AboutCompany from '@/components/AboutCompany';
import BackLink from '@/components/BackLink';

type CompanyPageProps = {
  params: {
    agencyId: string;  // Use agencyId instead of id
  };
};

const fetchCompanyAndJobs = async (agencyId: string) => {
  const { data: company, error: companyError } = await supabase
    .from('agencies')
    .select('*')
    .eq('id', agencyId)
    .single();

  if (companyError) {
    console.error('Error fetching company:', companyError);
    return { company: null, jobs: [] };
  }

  const { data: jobs, error: jobsError } = await supabase
    .from('jobs')
    .select('*')
    .eq('agency_id', company.id)
    .eq('status', 'active');  // Only fetch jobs with status 'active'

  if (jobsError) {
    console.error('Error fetching jobs:', jobsError);
    return { company, jobs: [] };
  }

  return { company, jobs: jobs || [] };
};

const CompanyPage: React.FC<CompanyPageProps> = ({ params }) => {
  const { agencyId } = params;  // Use agencyId instead of id
  const [company, setCompany] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { company, jobs } = await fetchCompanyAndJobs(agencyId);
      if (!company) {
        notFound();
      } else {
        setCompany(company);
        setJobs(jobs);
        setLoading(false);
      }
    };

    fetchData();
  }, [agencyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-screen-lg px-4 mx-auto">
      <BackLink />
      <AboutCompany company={company} />
      <div className="border-t border-gray-300 pt-6">
        <h2 className="text-xl font-semibold mb-4">Open Positions ({jobs.length})</h2>
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No open positions available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CompanyPage;