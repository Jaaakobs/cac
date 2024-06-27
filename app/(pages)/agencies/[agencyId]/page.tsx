"use client";

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import supabase from '@/utils/supabase/client';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Globe, Linkedin } from 'lucide-react';
import Link from 'next/link';
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
    .eq('agency_id', company.id);  // Use agency_id instead of agency_name

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
  const [showFullAbout, setShowFullAbout] = useState(false);

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

  const toggleShowFullAbout = () => {
    setShowFullAbout(!showFullAbout);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-screen-lg px-4 mx-auto">
      <BackLink />
      <div className="flex flex-col md:flex-row items-start gap-8 mb-6">
        <img
          src={company.profile_photo}
          alt={company.agency_name}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-2xl font-semibold">{company.agency_name}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-gray-200 text-gray-700">
              <MapPin className="mr-1 h-4 w-4 inline" />
              {company.headquarters}
            </Badge>
            <Badge className="bg-gray-200 text-gray-700">{company.industry}</Badge>
            <Badge className="bg-gray-200 text-gray-700">{company.company_size}</Badge>
            <Badge className="bg-gray-200 text-gray-700">Founded in {company.founded}</Badge>
          </div>
          <p className="text-gray-600 mt-2">{company.tagline}</p>
          <div className="flex space-x-4 mt-4">
            {company.linkedin_url && (
              <Button asChild>
                <Link href={company.linkedin_url} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
            )}
            {company.website && (
              <Button asChild>
                <Link href={company.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Website
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          {showFullAbout ? company.about : `${company.about.slice(0, 300)}...`}
        </p>
        {company.about.length > 300 && (
          <Button onClick={toggleShowFullAbout} variant="link" className="mt-2 text-blue-500">
            {showFullAbout ? 'Read Less' : 'Read More'}
          </Button>
        )}
      </div>
      <div className="border-t border-gray-300 pt-6">
        <h2 className="text-xl font-semibold mb-4">Open Positions</h2>
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