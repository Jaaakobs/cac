import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

type Company = {
  id: number;
  name: string;
  company_logo: string;
  company_description_short: string;
  job_count: number;
};

type CompanyCardProps = {
  company: Company;
};

export default function CompanyCard({ company }: CompanyCardProps) {
  const truncateDescription = (description: string, length: number) => {
    if (description.length <= length) {
      return description;
    }
    return `${description.substring(0, length)}...`;
  };

  return (
    <Link href={`/agencies/${company.id}`} passHref>
      <div className="flex flex-col items-start p-4 border border rounded-lg bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 w-full cursor-pointer border border-gray-300">
        <div className="flex items-center w-full mb-2">
          <img
            src={company.company_logo}
            alt={company.name}
            className="w-16 h-16 rounded-lg mr-4 object-cover"
          />
          <div className="text-lg font-semibold text-gray-900">{company.name}</div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="text-sm text-gray-700 font-medium">
            {truncateDescription(company.company_description_short, 150)}
          </div>
          <div>
            <Badge>
              {company.job_count} {company.job_count === 1 ? 'job' : 'jobs'}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}