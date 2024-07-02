"use client";

import { useState, useEffect } from 'react';
import supabase from '@/utils/supabase/client';
import CompanyCard from '@/components/CompanyCard';
import CompanySkeleton from '@/components/CompanySkeleton';
import Header from '@/components/HeaderAgencies';
import Footer from '@/components/Footer';
import NavigationTabs from '@/components/NavigationTabs';
import CompanyFilterComponent from '@/components/CompanyFilter';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import MenuBar from '@/components/MenuBar';

export type Company = {
  id: number;
  name: string;
  company_logo: string;
  company_description_short: string;
  job_count: number;
  industry: string;
  size: string;
};

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    keyword: '',
    industry: '',
    size: '',
  });
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [visibleCompaniesCount, setVisibleCompaniesCount] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data: agencies, error: agenciesError } = await supabase
        .from('agencies')
        .select('id, agency_name, profile_photo, about, industry, company_size');

      if (agenciesError) {
        console.error("Error fetching agencies:", agenciesError);
        setLoading(false);
        return;
      }

      // Fetch all active jobs
      const { data: jobs, error: jobsError } = await supabase
        .from('jobs')
        .select('agency_id')
        .eq('status', 'active');

      if (jobsError) {
        console.error("Error fetching jobs:", jobsError);
        setLoading(false);
        return;
      }

      // Count active jobs per agency
      const jobCountMap: { [key: number]: number } = {};
      jobs.forEach((job: any) => {
        if (job.agency_id) {
          if (!jobCountMap[job.agency_id]) {
            jobCountMap[job.agency_id] = 0;
          }
          jobCountMap[job.agency_id] += 1;
        }
      });

      const companiesData: Company[] = agencies.map((agency: any) => ({
        id: agency.id,
        name: agency.agency_name,
        company_logo: agency.profile_photo,
        company_description_short: agency.about,
        job_count: jobCountMap[agency.id] || 0,
        industry: agency.industry,
        size: agency.company_size,
      }));

      setCompanies(companiesData);
      setLoading(false);
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (!loading) {
      const filtered = companies.filter(company => {
        const matchesKeyword = filter.keyword === '' || company.name.toLowerCase().includes(filter.keyword.toLowerCase());
        const matchesIndustry = filter.industry === '' || company.industry === filter.industry;
        const matchesSize = filter.size === '' || company.size === filter.size;
        return matchesKeyword && matchesIndustry && matchesSize;
      });

      setFilteredCompanies(filtered);
    }
  }, [loading, companies, filter]);

  const loadMoreCompanies = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCompaniesCount(prevCount => prevCount + 20);
      setLoadingMore(false);
    }, 1000); // Simulating a network request with a timeout
  };

  const handleFilterChange = (filterUpdate: any) => {
    setFilter(filterUpdate);
  };

  const clearFilter = (name: string) => {
    setFilter({
      ...filter,
      [name]: '',
    });
  };

  const clearAllFilters = () => {
    setFilter({
      keyword: '',
      industry: '',
      size: '',
    });
  };

  const industries = Array.from(new Set(companies.map(company => company.industry))).map(value => ({ value, label: value }));
  const sizes = Array.from(new Set(companies.map(company => company.size))).map(value => ({ value, label: value }));

  return (
    <div className="p-6 max-w-screen-lg px-4 mx-auto">
      <MenuBar />
      <Header />
      <NavigationTabs />
      <div className="pt-4"></div>
      <CompanyFilterComponent
        filter={filter}
        setFilter={setFilter}
        industries={industries}
        sizes={sizes}
        clearFilter={clearFilter}
        clearAllFilters={clearAllFilters}
      />
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CompanySkeleton key={index} />
          ))}
        </div>
      ) : (
        <div>
          {filteredCompanies.length > 0 && (
            <div className="flex items-center justify-between mt-4 text-sm w-full mb-4">
              <div>
                Currently hiring <span className="font-bold">{filteredCompanies.filter(company => company.job_count > 0).length}</span> agenc{filteredCompanies.filter(company => company.job_count > 0).length !== 1 ? 'ies' : 'y'}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.filter(company => company.job_count > 0).slice(0, visibleCompaniesCount).map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
          {filteredCompanies.length > 0 && (
            <div className="flex items-center justify-between mt-4 text-sm w-full mb-4">
              <div>
                Not hiring <span className="font-bold">{filteredCompanies.filter(company => company.job_count === 0).length}</span> agenc{filteredCompanies.filter(company => company.job_count === 0).length !== 1 ? 'ies' : 'y'}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.filter(company => company.job_count === 0).slice(0, visibleCompaniesCount).map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
          {visibleCompaniesCount < filteredCompanies.length && (
            <div className="flex justify-center mt-6">
              <Button onClick={loadMoreCompanies} disabled={loadingMore}>
                {loadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}