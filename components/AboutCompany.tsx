import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Linkedin, Briefcase, Folder } from "lucide-react";
import Link from 'next/link';
import { Button } from './ui/button';

type CompanyProps = {
  company: {
    profile_photo: string;
    agency_name: string;
    headquarters: string;
    industry: string;
    company_size: string;
    founded: number;
    tagline: string;
    linkedin_url: string;
    website: string;
    about: string;
  };
};

const AboutCompany = ({ company }: CompanyProps) => {
  const [showFullAbout, setShowFullAbout] = useState(false);

  const toggleShowFullAbout = () => {
    setShowFullAbout(!showFullAbout);
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <img
          src={company.profile_photo}
          alt={company.agency_name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">{company.agency_name}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-500">
            <div className="flex items-center">
              <Briefcase className="mr-1 h-4 w-4" />
              {company.company_size}
            </div>
            <div className="flex items-center">
              <Folder className="mr-1 h-4 w-4" />
              {company.industry}
            </div>
          </div>
          <p className="text-gray-600 mt-2">{company.tagline}</p>
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        {company.website && (
          <Badge>
            <Globe className="mr-2 h-4 w-4" />
            <Link href={company.website} target="_blank" rel="noopener noreferrer">
              Website
            </Link>
          </Badge>
        )}
        {company.linkedin_url && (
          <Badge>
            <Linkedin  className="mr-2 h-4 w-4" />
            <Link href={company.linkedin_url} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Link>
          </Badge>
        )}
      </div>
      <div>
        <p className="text-gray-700">
          {showFullAbout ? company.about : `${company.about.slice(0, 300)}...`}
        </p>
        {company.about.length > 300 && (
          <Button onClick={toggleShowFullAbout} variant="link" className="mt-2 text-blue-500">
            {showFullAbout ? 'Read Less' : 'Read More'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AboutCompany;