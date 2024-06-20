import { formatDistanceToNow } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

type Job = {
  id: number;
  title: string;
  agency_name: string;
  company_logo: string;
  location: string;
  posted_at: string;
  job_function: string;
  seniority_level: string;
  employment_type: string;
  apply_url: string;
};

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const postedDate = Date.parse(job.posted_at) ? new Date(job.posted_at) : null;
  const postedDateText = postedDate ? formatDistanceToNow(postedDate, { addSuffix: true }) : 'Invalid date';

  // Clean job functions string
  const cleanedJobFunctions = job.job_function.replace(/,\s*and\s*/g, ',').split(',');

  // Extract city from location
  const city = job.location.split(',')[0];

  return (
    <a href={job.apply_url} target="_blank" rel="noopener noreferrer" className="block w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 w-full">
        <img
          src={job.company_logo}
          alt={job.agency_name}
          className="w-16 h-16 rounded-lg mr-4 object-cover"
        />
        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
          <div className="flex flex-col gap-1 w-full">
            <div className="text-lg font-semibold text-gray-900">{job.title}</div>
            <a href={`/company/${job.agency_name}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 font-medium hover:underline">
              {job.agency_name}
            </a>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {city} 
              <Calendar className="w-4 h-4 ml-2" />
              {postedDateText}
            </div>
            <div className="flex flex-wrap gap-2 mt-2 text-gray-500">
              {cleanedJobFunctions.map((func: string, index: number) => (
                <Badge key={index} variant="outline">
                  {func.trim()}
                </Badge>
              ))}
              <Badge variant="outline">
                {job.seniority_level}
              </Badge>
              <Badge variant="outline">
                {job.employment_type}
              </Badge>
            </div>
          </div>
          <Button variant="link" className="mt-2 md:mt-0 md:ml-4 hover:no-underline hidden md:block">
            Read more &gt;
          </Button>
        </div>
      </div>
    </a>
  );
}