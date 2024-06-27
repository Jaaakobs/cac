import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Linkedin } from "lucide-react";
import Link from 'next/link';

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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <img
          src={company.profile_photo}
          alt={company.agency_name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">{company.agency_name}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-gray-200 text-gray-700">
              <MapPin className="mr-1 h-4 w-4 inline" />
              {company.headquarters}
            </Badge>
            <Badge className="bg-gray-200 text-gray-700">
              {company.industry}
            </Badge>
            <Badge className="bg-gray-200 text-gray-700">
              {company.company_size}
            </Badge>
            <Badge className="bg-gray-200 text-gray-700">
              Founded in {company.founded}
            </Badge>
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