"use client";

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import supabase from '@/utils/supabase/client';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import AboutJob from '@/components/AboutJob';
import BackLink from '@/components/BackLink';
import AboutCompany from '@/components/AboutCompany';
import JobDescription from '@/components/JobDescription';

type JobPageProps = {
  params: {
    jobId: string;
  };
};

const fetchJobAndCompany = async (jobId: string) => {
  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', jobId)
    .single();

  if (jobError) {
    console.error('Error fetching job:', jobError);
    return { job: null, company: null, otherJobs: [] };
  }

  const { data: company, error: companyError } = await supabase
    .from('agencies')
    .select('*')
    .eq('id', job.agency_id)
    .single();

  if (companyError) {
    console.error('Error fetching company:', companyError);
    return { job, company: null, otherJobs: [] };
  }

  const { data: otherJobs, error: otherJobsError } = await supabase
    .from('jobs')
    .select('*')
    .eq('agency_id', job.agency_id)
    .neq('id', jobId);

  if (otherJobsError) {
    console.error('Error fetching other jobs:', otherJobsError);
    return { job, company, otherJobs: [] };
  }

  return { job, company, otherJobs: otherJobs || [] };
};

const JobPage: React.FC<JobPageProps> = ({ params }) => {
  const { jobId } = params;
  const [job, setJob] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [otherJobs, setOtherJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { job, company, otherJobs } = await fetchJobAndCompany(jobId);
      if (!job || !company) {
        notFound();
      } else {
        setJob(job);
        setCompany(company);
        setOtherJobs(otherJobs);
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-screen-lg px-4 mx-auto">
      <BackLink />
      <AboutJob job={job} />
      <JobDescription job={job} />
      <AboutCompany company={company} />
      {otherJobs.length > 0 && (
        <div className="border-t border-gray-300 mt-6 pt-6">
          <h2 className="text-xl font-semibold mb-4">Other open jobs from {company.agency_name}</h2>
          <div className="grid grid-cols-1 gap-4">
            {otherJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default JobPage;