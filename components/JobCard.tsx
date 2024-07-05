import { MapPin, Briefcase, BarChart, Folder, ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

type JobProps = {
  job: {
    id: number;
    title: string;
    company_logo: string;
    agency_name: string;
    agency_id: number;
    location: string;
    employment_type: string;
    seniority_level: string;
    posted_at: string;
    job_function: string;
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

const isNewJob = (postedAt: string) => {
  const postedDate = new Date(postedAt);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - postedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 14;
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
      <div className={`relative p-6 bg-white rounded-lg shadow-md mb-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 ${isMobile ? 'flex flex-col' : 'flex items-center'} h-full w-full border border-gray-300`}>
        {isMobile && isNewJob(job.posted_at) && (
          <Badge className="absolute top-3 left-3">New</Badge>
        )}
        {isMobile ? (
          <>
            <div className="flex justify-between items-center mb-4 w-full">
              <img
                src={job.company_logo}
                alt={job.agency_name}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex flex-col w-full ml-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-bold w-full">{job.title}</h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-left w-full">
              <div className="flex flex-wrap items-center text-gray-700 mb-2 w-full">
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
              <div className="flex flex-wrap items-center gap-4 w-full">
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
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex-shrink-0">
              <img
                src={job.company_logo}
                alt={job.agency_name}
                className="w-16 h-16 rounded-full mr-4"
              />
            </div>
            <div className="flex-grow w-full">
              <div className="flex items-center w-full">
                <h3 className="text-xl font-bold max-w-[720px] truncate">{job.title}</h3>
                {isNewJob(job.posted_at) && (
                  <Badge className="ml-2">New</Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center text-gray-700 mt-2 w-full">
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
              <div className="flex flex-wrap items-center gap-4 mt-2 w-full">
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
            <div className="ml-auto pl-4">
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default JobCard;