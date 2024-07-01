import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell } from 'lucide-react';
import Link from 'next/link';

const JobAlertButton: React.FC = () => {
  return (
    <Button asChild className="w-full md:w-auto md:ml-auto mt-4 md:mt-0">
      <Link href="/job-alerts">
        <span className="flex items-center">
          <Bell className="mr-2 h-4 w-4" />
          Create Job Alert
        </span>
      </Link>
    </Button>
  );
};

export default JobAlertButton;