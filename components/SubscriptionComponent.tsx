"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Link from "next/link";

const SubscriptionComponent: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-6 w-full mx-auto mt-4">
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-lg"></div>
      <h2 className="text-xl font-bold mt-4 text-center">Be the first to know when new jobs are available</h2>
      <p className="text-gray-700 mt-2 text-center">Get new jobs matching this search in your inbox. Set up your custom job alerts now!</p>
      <Link href="/job-alerts" passHref>
        <Button asChild className="w-full mt-4 flex items-center justify-center md:w-auto">
          <span className="w-full flex items-center justify-center">
            <Bell className="mr-2 h-4 w-4" />
            Create Job Alert
          </span>
        </Button>
      </Link>
    </div>
  );
};

export default SubscriptionComponent;