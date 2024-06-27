import { MapPin, Briefcase, BarChart, Folder, ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type JobProps = {
  job: {
    id: number; // Ensure the job has an id property
    title: string;
    company_logo: string;
    agency_name: string;
    agency_id: number;
    location: string;
    employment_type: string;
    seniority_level: string;
    posted_at: string;
    job_function: string | null; // Allow job_function to be null
  };
};

const getPostedAtText = (postedAt: string) => {
  const postedDate = new Date(postedAt);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - postedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    return "Today";
  } else if (diffDays === 2) {
    return "Yesterday";
  } else if (diffDays <= 14) {
    return `${diffDays} days ago`;
  } else if (diffDays <= 30) {
    return `${Math.ceil(diffDays / 7)} weeks ago`;
  } else if (diffDays <= 60) {
    return "1 month ago";
  } else {
    return `${Math.ceil(diffDays / 30)} months ago`;
  }
};

const JobCard = ({ job }: JobProps) => {
  const firstLocationWord = job.location ? job.location.split(",")[0] : "";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const postedAtText = getPostedAtText(job.posted_at);

  return (
    <Link href={`/jobs/${job.id}`} passHref>
      <div className="p-6 bg-white rounded-lg shadow-md mb-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 relative flex items-center h-full w-full">
        <div className="flex-shrink-0">
          <img
            src={job.company_logo}
            alt={job.agency_name}
            className="w-16 h-16 rounded-full mr-4"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold w-full">{job.title}</h3>
          <div className="flex flex-wrap items-center text-gray-700 mt-2">
            <Link href={`/agencies/${job.agency_id}`} passHref>
              <span className="hover:underline cursor-pointer mr-4">
                {job.agency_name}
              </span>
            </Link>
            {firstLocationWord && (
              <div className="flex items-center mr-4">
                <MapPin className="mr-1 h-4 w-4 inline" />
                {firstLocationWord}
              </div>
            )}
            {postedAtText && (
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4 inline" />
                {postedAtText}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            {job.employment_type && (
              <div className="flex items-center text-gray-700">
                <Briefcase className="mr-1 h-4 w-4 inline" />
                {job.employment_type}
              </div>
            )}
            {job.seniority_level && (
              <div className="flex items-center text-gray-700">
                <BarChart className="mr-1 h-4 w-4 inline" />
                {job.seniority_level}
              </div>
            )}
            {job.job_function && (
              <div className="flex items-center text-gray-700">
                <Folder className="mr-1 h-4 w-4 inline" />
                {job.job_function}
              </div>
            )}
          </div>
        </div>
        {!isMobile && (
          <div className="ml-auto pl-4">
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </div>
        )}
      </div>
    </Link>
  );
};

export default JobCard;