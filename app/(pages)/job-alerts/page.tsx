'use client';

import React, { useEffect } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/HeaderAlert';
import NavigationTabs from '@/components/NavigationTabs';
import JobAlertForm from '@/components/JobAlertForm';
import MenuBar from '@/components/MenuBar';
import Banner from '@/components/Banner';

const locations = [
  { value: 'Berlin', label: 'Berlin' },
  { value: 'Hamburg', label: 'Hamburg' },
  { value: 'Munich', label: 'Munich' },
  { value: 'Cologne', label: 'Cologne' },
  { value: 'Frankfurt', label: 'Frankfurt' },
  { value: 'Stuttgart', label: 'Stuttgart' },
  { value: 'Düsseldorf', label: 'Düsseldorf' },
  { value: 'Dortmund', label: 'Dortmund' },
  { value: 'Essen', label: 'Essen' },
  { value: 'Leipzig', label: 'Leipzig' },
  { value: 'Bremen', label: 'Bremen' },
  { value: 'Dresden', label: 'Dresden' },
  { value: 'Hanover', label: 'Hanover' },
  { value: 'Nuremberg', label: 'Nuremberg' },
  { value: 'Duisburg', label: 'Duisburg' },
  { value: 'Germany', label: 'Germany' },
];

const jobFunctions = [
  { value: 'Creative Jobs', label: 'Creative Jobs' },
  { value: 'Marketing Jobs', label: 'Marketing Jobs' },
  { value: 'Tech', label: 'Tech' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Strategy', label: 'Strategy' },
  { value: 'Delivery', label: 'Delivery' },
  { value: 'Design', label: 'Design' },
  { value: 'Biz Dev', label: 'Biz Dev' },
  { value: 'Creative', label: 'Creative' },
  { value: 'Strategy', label: 'Strategy' },
];

const industries = [
  { value: 'Advertising Services', label: 'Advertising Services' },
  { value: 'Design Services', label: 'Design Services' },
  { value: 'Public Relations and Communications Services', label: 'Public Relations and Communications Services' },
  { value: 'Marketing Services', label: 'Marketing Services' },
  { value: 'Business Consulting and Services', label: 'Business Consulting and Services' },
  { value: 'Software Development', label: 'Software Development' },
  { value: 'Design', label: 'Design' },
];

const seniorities = [
  { value: 'Executive', label: 'Executive' },
  { value: 'Director', label: 'Director' },
  { value: 'Mid-Senior Level', label: 'Mid-Senior Level' },
  { value: 'Associate', label: 'Associate' },
  { value: 'Entry Level', label: 'Entry Level' },
  { value: 'Internship', label: 'Internship' },
];

const employmentTypes = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Internship', label: 'Internship' },
];

const JobAlerts = () => {
  return (
    <div className="p-6 max-w-screen-lg px-4 mx-auto">
      <MenuBar />
      <Header />
      <NavigationTabs />
      <div className="pt-4"></div>
      <main className="w-full mx-auto">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">How does it work?</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>We’ll set up a secure profile with all your preferences.</li>
                <li>Each week, we'll match your custom criteria to the freshest job offers.</li>
                <li>And there you have it! Your personalized job selection awaits you in the one email you'll actually enjoy reading.</li>
              </ul>
            </div>
            <div className="bg-white md:col-span-2 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Create your job alerts</h2>
              <JobAlertForm
                locations={locations}
                jobFunctions={jobFunctions}
                industries={industries}
                seniorities={seniorities}
                employmentTypes={employmentTypes}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobAlerts;