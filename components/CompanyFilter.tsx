import React, { useState } from 'react';
import Select from 'react-select';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type Filter = {
  keyword: string;
  industry: string;
  size: string;
};

type CompanyFilterComponentProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  industries: { value: string, label: string }[];
  sizes: { value: string, label: string }[];
  clearFilter: (name: string) => void;
  clearAllFilters: () => void;
};

const CompanyFilterComponent: React.FC<CompanyFilterComponentProps> = ({
  filter,
  setFilter,
  industries = [],
  sizes = [],
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
      [name]: value ? value.value : '',
    });
  };

  const handleClearAll = () => {
    setFilter({
      keyword: '',
      industry: '',
      size: '',
    });
    clearAllFilters();
  };

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
            placeholder="Search by name or keyword"
            value={filter.keyword}
            onChange={handleFilterChange}
            className="border border-gray-300 p-3 pl-10 w-full rounded-lg bg-white h-12"
          />
        </div>
        <Button className="md:hidden w-full" onClick={() => setDrawerOpen(true)}>All filters</Button>
      </div>
      <div className="hidden md:grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 items-center w-full">
        <div className="col-span-1">
          <Select
            name="industry"
            options={industries}
            value={industries.find(industry => industry.value === filter.industry) || null}
            onChange={(value) => handleSelectChange('industry', value)}
            placeholder="Industry"
            className="rounded-lg text-sm"
            classNamePrefix="react-select"
          />
        </div>
        <div className="col-span-1">
          <Select
            name="size"
            options={sizes}
            value={sizes.find(size => size.value === filter.size) || null}
            onChange={(value) => handleSelectChange('size', value)}
            placeholder="Size"
            className="rounded-lg text-sm"
            classNamePrefix="react-select"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {Object.keys(filter).map((key) => {
          const value = filter[key as keyof typeof filter];
          if (value) {
            return (
              <div key={key} className="flex items-center border border-gray-300 rounded px-2 py-1 text-sm">
                <span>{typeof value === 'string' ? value : ''}</span>
                <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={() => clearFilter(key)}>
                  &times;
                </button>
              </div>
            );
          }
          return null;
        })}
        {Object.values(filter).some((value) => value) && (
          <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={handleClearAll}>
            Clear all
          </button>
        )}
      </div>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="px-4 py-4">
          <DrawerHeader>
            <DrawerTitle>All filters</DrawerTitle>
            <DrawerDescription>Filter the companies</DrawerDescription>
          </DrawerHeader>
          <div className="space-y-4">
            <Select
              name="industry"
              options={industries}
              value={industries.find(industry => industry.value === filter.industry) || null}
              onChange={(value) => handleSelectChange('industry', value)}
              placeholder="Industry"
              className="rounded-lg text-sm"
              classNamePrefix="react-select"
            />
            <Select
              name="size"
              options={sizes}
              value={sizes.find(size => size.value === filter.size) || null}
              onChange={(value) => handleSelectChange('size', value)}
              placeholder="Size"
              className="rounded-lg text-sm"
              classNamePrefix="react-select"
            />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="w-full mt-4">Apply Filters</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CompanyFilterComponent;