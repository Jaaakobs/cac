"use client";

import Link from 'next/link';
import MenuBar from '@/components/MenuBar';
import Footer from '@/components/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <MenuBar />
      <div className="p-6 max-w-screen-lg mx-auto">
        <Link href="/" className="text-blue-600 hover:underline flex items-center mb-4">
          <span className="mr-2">&larr;</span> Back to job board
        </Link>
        <h1 className="text-3xl font-bold mb-4">CreativeAgencyCareers Job Board Privacy Policy</h1>
        <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
        <p className="mb-4">Version 7.0, Last update April 2024.</p>
        <p className="mb-4">1. To whom does this privacy policy apply?</p>
        <p className="mb-4">
          This privacy policy applies to you if you are a visitor to the job board (a "Job Seeker") at careers.creativeagencycareers.com (the "Site") and sets out how data that identifies or is associated with you ("personal data") is collected, stored, processed, transferred, shared and used when you use the Site to access and interact with professional opportunities with companies in the CreativeAgencyCareers network (the "Network"). We CreativeAgencyCareers (the owners of the Site) (hereinafter referred to as "we", "us", "our") respect your privacy and are committed to protecting it. Please read this privacy policy carefully. By using this Site, you agree you have been informed of how we use the Personal Data we collect.
        </p>
        <p className="mb-4">2. Who is the Data Controller of your personal data?</p>
        <p className="mb-4">
          CreativeAgencyCareers processes personal data as a Data Controller for the purposes outlined in Section 4 of this policy.
        </p>
        <p className="mb-4">
          CreativeAgencyCareers's registered address is Max-Urich-Straße 3, 13355, Berlin, Germany. You can contact CreativeAgencyCareers via mail at this address. Alternatively, you can contact CreativeAgencyCareers via email at privacy@creativeagencycareers.com.
        </p>
        <p className="mb-4">3. What information do we collect?</p>
        <p className="mb-4">3.1. Subscribing to Job Alerts</p>
        <p className="mb-4">
          When you subscribe to receive notifications of new jobs within the Network matching your preferences ("Job Alerts"), we will ask you to provide certain personal data, including:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>A valid email address</li>
          <li>Your job preferences</li>
        </ul>
        <p className="mb-4">3.2. Applying to a job directly on the Site</p>
        <p className="mb-4">
          If you apply to a job directly on this job board (NOT if you apply on a third party site hosting a job posting that this Site has linked out to), we will ask you to provide:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Personal data such as your name and contact details</li>
          <li>Your resume or CV</li>
          <li>Details of your employment history</li>
        </ul>
        <p className="mb-4">
          This information is necessary to facilitate the job application process and to ensure that your application reaches the relevant employers.
        </p>
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;