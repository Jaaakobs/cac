"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cacLogo from '@/images/cac-logo.png';
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useRouter } from 'next/navigation';
import Banner from '@/components/Banner';

const MenuBar: React.FC = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/job-alerts');
  };

  const handleBannerClose = () => {
    setIsBannerVisible(false);
  };

  return (
    <>
      <Banner onClose={handleBannerClose} />
      <div className={`flex items-center justify-between w-full max-w-screen-lg mx-auto ${isBannerVisible ? 'mt-4' : ''}`}>
        <Link href="/">
          <Image src={cacLogo} alt="CAC Logo" width={80} height={40} />
        </Link>
        <Button onClick={handleButtonClick}>
          <Bell className="mr-2 h-4 w-4" />
          Create Job Alert
        </Button>
      </div>
    </>
  );
};

export default MenuBar;