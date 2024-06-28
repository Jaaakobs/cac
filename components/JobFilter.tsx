import React, { useState } from 'react';
import Select from 'react-select';
import { MapPin, Search, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import JobAlertButton from '@/components/JobAlertButton';

type FilterComponentProps = {
  filter: {
    keyword: string;
    jobCategory: string;
    location: { value: string, label: string }[];
    agencyIndustry: string;
    agencyName: string;
    seniorityLevel: string;
    employmentType: string;
  };
  setFilter: (filter: any) => void;
  locations: { value: string, label: string }[];
  jobCategories: string[];
  agencyIndustries: string[];
  agencyNames: string[];
  clearFilter: (name: string) => void;
  clearAllFilters: () => void;
};

const FilterComponent: React.FC<FilterComponentProps> = ({
  filter,
  setFilter,
  locations = [],
  jobCategories = [],
  agencyIndustries = [],
  agencyNames = [],
  clearFilter,
  clearAllFilters,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: any) => {
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleClearAll = () => {
    setFilter({
      keyword: '',
      jobCategory: '',
      location: [],
      agencyIndustry: '',
      agencyName: '',
      seniorityLevel: '',
      employmentType: '',
    });
    clearAllFilters();
  };

  // Filter out categories that contain a comma
  const singleJobCategories = jobCategories.filter(category => !category.includes(','));
  const uniqueAgencyNames = Array.from(new Set(agencyNames)).map(name => ({ value: name, label: name }));

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white mb-6 space-y-4 w-full max-w-[1088px] mx-auto"> 
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <div className="relative flex-1 w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            name="keyword"
            placeholder="Job title, company or keyword"
            value={filter.keyword}
            onChange={handleFilterChange}
            className="border border-gray-300 p-3 pl-10 w-full rounded-lg bg-white h-12"
          />
        </div>
        <div className="relative flex-1 w-full">
          <Select
            isMulti
            isSearchable={false} // Disable search input
            name="location"
            options={locations}
            value={filter.location}
            onChange={(value) => handleSelectChange('location', value)}
            placeholder={
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                Location
              </div>
            }
            className="w-full rounded-lg h-12"
            classNamePrefix="react-select"
            styles={{
              control: (provided) => ({
                ...provided,
                height: '48px', // Tailwind h-12 is 48px
                minHeight: '48px',
              }),
            }}
          />
        </div>
        <Button variant="outline" className="md:hidden w-full" onClick={() => setDrawerOpen(true)}>
          <Filter className="mr-2 h-4 w-4" />
          All filters
        </Button>
      </div>
      <div className="hidden md:grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 items-center w-full">
        <div className="col-span-1">
          <Select
            name="jobCategory"
            options={singleJobCategories.map(cat => ({ value: cat, label: cat }))}
            value={null}
            onChange={(value) => handleSelectChange('jobCategory', value ? value.value : '')}
            placeholder="Job function"
            isSearchable={false} // Disable search input
            className="rounded-lg text-sm"
            classNamePrefix="react-select"
          />
        </div>
        <div className="col-span-1">
          <Select
            name="agencyIndustry"
            options={agencyIndustries.map(industry => ({ value: industry, label: industry }))}
            value={null}
            onChange={(value) => handleSelectChange('agencyIndustry', value ? value.value : '')}
            placeholder="Industry"
            isSearchable={false} // Disable search input
            className="rounded-lg text-sm"
            classNamePrefix="react-select"
          />
        </div>
        <div className="col-span-1">
          <Select
            name="agencyName"
            options={uniqueAgencyNames}
            value={null}
            onChange={(value) => handleSelectChange('agencyName', value ? value.value : '')}
            placeholder="Company"
            isSearchable={false} // Disable search input
            className="rounded-lg text-sm"
            classNamePrefix="react-select"
          />
        </div>
        <div className="col-span-1">
          <Select
            name="seniorityLevel"
            options={['Internship', 'Entry level', 'Associate', 'Mid-Senior level', 'Director'].map(level => ({ value: level, label: level }))}
            value={null}
            onChange={(value) => handleSelectChange('seniorityLevel', value ? value.value : '')}
            placeholder="Seniority"
            isSearchable={false} // Disable search input
            className="rounded-lg text-sm"
            classNamePrefix="react-select"
          />
        </div>
        <div className="col-span-1">
          <Select
            name="employmentType"
            options={['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => ({ value: type, label: type }))}
            value={null}
            onChange={(value) => handleSelectChange('employmentType', value ? value.value : '')}
            placeholder="Employment"
            isSearchable={false} // Disable search input
            className="rounded-lg text-sm"
            classNamePrefix="react-select"
          />
        </div>
      </div>
  
      <div className="flex flex-wrap gap-2 mt-2">
        {filter.location && Array.isArray(filter.location) && filter.location.map(loc => (
          <div key={loc.value} className="flex items-center border border-gray-300 rounded px-2 py-1 text-sm">
            <span>{loc.label}</span>
            <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={() => handleSelectChange('location', filter.location.filter(location => location.value !== loc.value))}>
              &times;
            </button>
          </div>
        ))}
        {Object.keys(filter).map((key) => {
          if (filter[key as keyof typeof filter] && key !== 'location') {
            const value = filter[key as keyof typeof filter];
            return (
              <div key={key} className="flex items-center border border-gray-300 rounded px-2 py-1 text-sm">
                <span>
                  {typeof value === 'string' ? value : Array.isArray(value) ? value.map((v: { label: string }) => v.label).join(', ') : ''}
                </span>
                <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={() => clearFilter(key)}>
                  &times;
                </button>
              </div>
            );
          }
          return null;
        })}
        {Object.values(filter).some((value) => value && (Array.isArray(value) ? value.length : value)) && (
          <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={handleClearAll}>
            Clear all
          </button>
        )}
      </div>
  
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="px-4 py-4">
          <DrawerHeader>
            <DrawerTitle>All filters</DrawerTitle>
            <DrawerDescription>Filter the job listings</DrawerDescription>
          </DrawerHeader>
          <div className="space-y-4">
            <Select
              name="jobCategory"
              options={singleJobCategories.map(cat => ({ value: cat, label: cat }))}
              value={null}
              onChange={(value) => handleSelectChange('jobCategory', value ? value.value : '')}
              placeholder="Job function"
              isSearchable={false} // Disable search input
              className="rounded-lg text-sm"
              classNamePrefix="react-select"
            />
            <Select
              name="agencyIndustry"
              options={agencyIndustries.map(industry => ({ value: industry, label: industry }))}
              value={null}
              onChange={(value) => handleSelectChange('agencyIndustry', value ? value.value : '')}
              placeholder="Industry"
              isSearchable={false} // Disable search input
              className="rounded-lg text-sm"
              classNamePrefix="react-select"
            />
            <Select
              name="agencyName"
              options={uniqueAgencyNames}
              value={null}
              onChange={(value) => handleSelectChange('agencyName', value ? value.value : '')}
              placeholder="Company"
              isSearchable={false} // Disable search input
              className="rounded-lg text-sm"
              classNamePrefix="react-select"
            />
            <Select
              name="seniorityLevel"
              options={['Internship', 'Entry level', 'Associate', 'Mid-Senior level', 'Director'].map(level => ({ value: level, label: level }))}
              value={null}
              onChange={(value) => handleSelectChange('seniorityLevel', value ? value.value : '')}
              placeholder="Seniority"
              isSearchable={false} // Disable search input
              className="rounded-lg text-sm"
              classNamePrefix="react-select"
            />
            <Select
              name="employmentType"
              options={['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => ({ value: type, label: type }))}
              value={null}
              onChange={(value) => handleSelectChange('employmentType', value ? value.value : '')}
              placeholder="Employment"
              isSearchable={false} // Disable search input
              className="rounded-lg text-sm"
              classNamePrefix="react-select"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {filter.location && Array.isArray(filter.location) && filter.location.map(loc => (
                <div key={loc.value} className="flex items-center border border-gray-300 rounded px-2 py-1 text-sm">
                  <span>{loc.label}</span>
                  <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={() => handleSelectChange('location', filter.location.filter(location => location.value !== loc.value))}>
                    &times;
                  </button>
                </div>
              ))}
              {Object.keys(filter).map((key) => {
                if (filter[key as keyof typeof filter] && key !== 'location') {
                  const value = filter[key as keyof typeof filter];
                  return (
                    <div key={key} className="flex items-center border border-gray-300 rounded px-2 py-1 text-sm">
                      <span>
                        {typeof value === 'string' ? value : Array.isArray(value) ? value.map((v: { label: string }) => v.label).join(', ') : ''}
                      </span>
                      <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={() => clearFilter(key)}>
                        &times;
                      </button>
                    </div>
                  );
                }
                return null;
              })}
              {Object.values(filter).some((value) => value && (Array.isArray(value) ? value.length : value)) && (
                <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={handleClearAll}>
                  Clear all
                </button>
              )}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="w-full mt-4">Apply Filters</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <JobAlertButton />
    </div>
  );
};

export default FilterComponent;