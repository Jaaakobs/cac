'use client';

import React, { useEffect } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/HeaderAlert';
import NavigationTabs from '@/components/NavigationTabs';

declare global {
  interface Window {
    Tally: any;
  }
}

const JobAlerts = () => {
  useEffect(() => {
    if (typeof window.Tally !== 'undefined') {
      window.Tally.loadEmbeds();
    } else {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.onload = () => window.Tally.loadEmbeds();
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="bg-background p-6 max-w-screen-lg px-4 mx-auto">
      <Header />
      <NavigationTabs />
      <div className="pt-4"></div>
      <main className="max-w-screen-lg mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">How does it work?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>We’ll set up a secure profile with all your preferences.</li>
              <li>Each week, we'll match your custom criteria to the freshest job offers.</li>
              <li>And there you have it! Your personalized job selection awaits you in the one email you'll actually enjoy reading.</li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="p-6 rounded-lg">
              <iframe
                data-tally-src="https://tally.so/embed/mV5qZM?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height="743"
                title="undefined"
                className="w-full"
              ></iframe>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobAlerts;