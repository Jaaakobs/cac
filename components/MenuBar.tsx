"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cacLogo from '@/images/cac-logo.png';
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useRouter } from 'next/navigation';

const MenuBar: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/job-alerts');
  };

  return (
    <div className="flex items-center justify-between p-4 w-full max-w-screen-lg mx-auto">
      <Link href="/">
        <Image src={cacLogo} alt="CAC Logo" width={80} height={40} />
      </Link>
      <Button onClick={handleButtonClick}>
        <Bell className="mr-2 h-4 w-4" />
        Job Alerts
      </Button>
    </div>
  );
};

export default MenuBar;




