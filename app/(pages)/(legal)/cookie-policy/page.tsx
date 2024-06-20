"use client";

import Link from 'next/link';
import MenuBar from '@/components/MenuBar';
import Footer from '@/components/Footer';

const CookiePolicy: React.FC = () => {
  return (
    <div>
      <MenuBar />
      <div className="p-6 max-w-screen-lg mx-auto">
        <Link href="/" className="text-blue-600 hover:underline flex items-center mb-4">
          <span className="mr-2">&larr;</span> Back to job board
        </Link>
        <h1 className="text-3xl font-bold mb-4">CreativeAgencyCareers Job Board Cookie Policy</h1>
        <h2 className="text-xl font-bold mb-4">Cookie Policy</h2>
        <p className="mb-4">Version 7.0, Last update April 2024.</p>
        <p className="mb-4">1. What are cookies?</p>
        <p className="mb-4">
          Cookies are small text files that are placed on your device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
        </p>
        <p className="mb-4">2. How do we use cookies?</p>
        <p className="mb-4">
          We use cookies to enhance your experience on our Site, including:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Keeping you signed in</li>
          <li>Understanding how you use our Site</li>
          <li>Personalizing your experience on our Site</li>
        </ul>
        <p className="mb-4">3. What types of cookies do we use?</p>
        <p className="mb-4">
          We use both session cookies (which expire once you close your web browser) and persistent cookies (which stay on your device for a set period of time or until you delete them).
        </p>
        <p className="mb-4">4. How to manage cookies</p>
        <p className="mb-4">
          You can manage cookies through your browser settings. You can choose to block or delete cookies, but this may affect your experience on our Site.
        </p>
        <Footer />
      </div>
    </div>
  );
};

export default CookiePolicy;