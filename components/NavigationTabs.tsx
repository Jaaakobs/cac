import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import supabase from '@/utils/supabase/client';

const CACHE_KEY_JOBS = 'jobsCount';
const CACHE_KEY_AGENCIES = 'agenciesCount';
const CACHE_EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

const NavigationTabs = () => {
  const pathname = usePathname();
  const [jobsCount, setJobsCount] = useState(0);
  const [agenciesCount, setAgenciesCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { count: jobs, error: jobsError } = await supabase
          .from('jobs')
          .select('*', { count: 'exact', head: true });

        if (jobsError) {
          console.error('Error fetching jobs count:', jobsError);
        } else {
          localStorage.setItem(CACHE_KEY_JOBS, JSON.stringify({ count: jobs || 0, timestamp: Date.now() }));
          setJobsCount(jobs || 0);
        }

        const { count: agencies, error: agenciesError } = await supabase
          .from('agencies')
          .select('*', { count: 'exact', head: true });

        if (agenciesError) {
          console.error('Error fetching agencies count:', agenciesError);
        } else {
          localStorage.setItem(CACHE_KEY_AGENCIES, JSON.stringify({ count: agencies || 0, timestamp: Date.now() }));
          setAgenciesCount(agencies || 0);
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    const getCachedCount = (key: string) => {
      const cachedData = localStorage.getItem(key);
      if (cachedData) {
        const { count, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
          return count;
        }
      }
      return null;
    };

    const cachedJobsCount = getCachedCount(CACHE_KEY_JOBS);
    const cachedAgenciesCount = getCachedCount(CACHE_KEY_AGENCIES);

    if (cachedJobsCount !== null) {
      setJobsCount(cachedJobsCount);
    }

    if (cachedAgenciesCount !== null) {
      setAgenciesCount(cachedAgenciesCount);
    }

    if (cachedJobsCount === null || cachedAgenciesCount === null) {
      fetchCounts();
    }
  }, []);

  return (
    <div className="bg-background border-b">
      <div className="flex justify-between items-center max-w-screen-lg mx-auto px-4 py-4">
        <div className="flex space-x-8">
          <Link href="/jobs" className={`no-underline ${pathname === '/jobs' ? 'font-bold border-b-2 border-primary' : 'text-gray-600 border-b-2 border-transparent'}`}>
            <span className="hidden sm:inline">Search jobs {jobsCount > 0 && `(${jobsCount})`}</span>
            <span className="sm:hidden">Jobs {jobsCount > 0 && `(${jobsCount})`}</span>
          </Link>
          <Link href="/agencies" className={`no-underline ${pathname === '/agencies' ? 'font-bold border-b-2 border-primary' : 'text-gray-600 border-b-2 border-transparent'}`}>
            <span className="hidden sm:inline">Explore Agencies {agenciesCount > 0 && `(${agenciesCount})`}</span>
            <span className="sm:hidden">Agencies {agenciesCount > 0 && `(${agenciesCount})`}</span>
          </Link>
        </div>
        <Link href="/job-alerts" className={`no-underline ${pathname === '/job-alerts' ? 'font-bold border-b-2 border-primary' : 'text-gray-600 border-b-2 border-transparent'}`}>
          Job alerts
        </Link>
      </div>
    </div>
  );
};

export default NavigationTabs;