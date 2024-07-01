"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const SuggestAgencyComponent: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-6 w-full mx-auto mt-4">
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-lg"></div>
      <h2 className="text-xl font-bold mt-4 text-center">Is there an agency missing?</h2>
      <p className="text-gray-700 mt-2 text-center">Let us know if there's an agency you'd like to see listed.</p>
      <a href="https://tally.so/r/wALXVy" target="_blank" rel="noopener noreferrer" className="w-full mt-4 flex items-center justify-center md:w-auto">
        <Button asChild className="w-full flex items-center justify-center">
          <span className="w-full flex items-center justify-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Suggest an Agency
          </span>
        </Button>
      </a>
    </div>
  );
};

export default SuggestAgencyComponent;