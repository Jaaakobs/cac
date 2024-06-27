import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, BarChart, Folder, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect, useState } from "react";

type JobProps = {
  job: {
    id: number;
    title: string;
    company_logo: string;
    agency_name: string;
    company_id: number;
    location: string;
    employment_type: string;
    seniority_level: string;
    posted_at: string;
    apply_url: string;
    quick_apply_url: string;
    applicants_count: number;
    job_function: string;
    updated_at: string;
  };
};

const AboutJob = ({ job }: JobProps) => {
  const { toast } = useToast();
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const postedDate = new Date(job.posted_at);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - postedDate.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    setIsNew(diffDays <= 14);
  }, [job.posted_at]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      description: "Link copied to clipboard. You can now share the link with others.",
    });
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src={job.company_logo}
            alt={job.agency_name}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            {isNew && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md">New</span>
            )}
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <Link href={`/agencies/${job.company_id}`} passHref>
              <p className="text-gray-700 hover:underline cursor-pointer">
                {job.agency_name}
              </p>
            </Link>
          </div>
        </div>
        <Button onClick={handleShare} variant="secondary" className="ml-auto">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {job.location && (
          <div className="flex items-center text-gray-700">
            <MapPin className="mr-2 h-5 w-5 inline" />
            {job.location}
          </div>
        )}
        {job.employment_type && (
          <div className="flex items-center text-gray-700">
            <Briefcase className="mr-2 h-5 w-5 inline" />
            {job.employment_type}
          </div>
        )}
        {job.seniority_level && (
          <div className="flex items-center text-gray-700">
            <BarChart className="mr-2 h-5 w-5 inline" />
            {job.seniority_level}
          </div>
        )}
        {job.job_function && (
          <div className="flex items-center text-gray-700">
            <Folder className="mr-2 h-5 w-5 inline" />
            {job.job_function}
          </div>
        )}
      </div>
      <div className="flex space-x-4">
        <Button asChild>
          <a href={job.apply_url} target="_blank" rel="noopener noreferrer">
            Apply Now
          </a>
        </Button>
        {job.quick_apply_url && (
          <Button asChild>
            <a href={job.quick_apply_url} target="_blank" rel="noopener noreferrer">
              Quick Apply
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default AboutJob;