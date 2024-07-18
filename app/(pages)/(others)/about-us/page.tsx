'use client';

import Link from 'next/link';
import Image from 'next/image';
import MenuBar from '@/components/MenuBar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import CAC_Strategy from '@/images/CAC_Strategy.svg';
import CAC_HomePage from '@/images/CAC_HomePage.svg';
import CAC_BizDev from '@/images/CAC_BizDev.svg';
import CAC_Marketing from '@/images/CAC_Marketing.svg';
import ClaudiaImage from '@/images/claudia.jpeg';
import JakobImage from '@/images/jakob.jpeg';
import { useEffect, useRef, RefObject } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

const AboutUs = () => {
  const nextSectionRef: RefObject<HTMLDivElement> = useRef(null);

  const handleScrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background">
      {/* Header Section */}
      <section className="relative flex flex-col items-center justify-center pt-6">
        <MenuBar />
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center max-w-[1088px]">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold text-black mb-4">The Matchmakers of Germany’s Advertising Scene</h1>
            <Button className="mt-4" onClick={handleScrollToNextSection}>Get to Know Us</Button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <Image src={CAC_Strategy} alt="Strategy" width={500} height={500} className="mx-auto" />
          </div>
        </div>
      </section>

      <div className="p-6 max-w-screen-lg mx-auto">
        {/* Next Section */}
<section ref={nextSectionRef} className="flex flex-col items-center justify-center py-12">
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-center max-w-[1088px]">
    <div className="md:w-1/2">
      <Image src={CAC_HomePage} alt="Home Page" width={400} height={300} className="mx-auto md:mx-0 transform -scale-x-100" />
    </div>
    <div className="md:w-1/2 mt-8 md:mt-0">
      <p className="text-gray-700 mt-4">Let's face it, the German creative agency scene is a vibrant jungle, with hidden gems tucked away behind every corner. But finding your dream role? That shouldn’t feel like an expedition.</p>
      <p className="text-xl mt-4 font-bold text-primary">That's where we come in.</p>
      <p className="text-gray-700 mt-4">
        Born in 2024 from a marketer's frustration (
        <HoverCardDemo name="Claudia" link="https://www.linkedin.com/in/claudia-salutari/" image={ClaudiaImage.src} />
        ) and a developer's ingenuity (
        <HoverCardDemo name="Jakob" link="https://www.linkedin.com/in/jakob-engelhardt/" image={JakobImage.src} />
        ), Creative Agency Careers is your shortcut to the best creative jobs in Germany.
      </p>
    </div>
  </div>
</section>

        {/* Quote Section */}
        <section className="flex items-center justify-center py-12">
          <h2 className="text-3xl font-bold text-primary text-center max-w-[800px]">Whether you’re a seasoned creative looking for a change or a fresh talent ready to break in, we’re here to help you thrive in the agency world.</h2>
        </section>

        {/* Boxes Section */}
        <section className="flex flex-col md:flex-row items-center justify-center py-12 gap-8 px-4">
          <div className="flex flex-col md:flex-row items-start justify-center gap-8 w-full">
            <div className="bg-gray-200 p-8 rounded-lg shadow-md flex flex-col items-center text-center w-full h-full transition-transform transform hover:scale-105 hover:shadow-lg">
              <Image src={CAC_BizDev} alt="Biz Dev" width={200} height={150} className="mb-4" />
              <h3 className="text-2xl font-bold text-primary mt-4">No more Generic Job Portals</h3>
              <p className="text-gray-700 mt-2">We curate openings from the top agencies, from bold powerhouses to those niche studios you wish you knew about.</p>
            </div>
            <div className="bg-gray-200 p-8 rounded-lg shadow-md flex flex-col items-center text-center w-full h-full transition-transform transform hover:scale-105 hover:shadow-lg">
              <Image src={CAC_Marketing} alt="Marketing" width={200} height={150} className="mb-4" />
              <h3 className="text-2xl font-bold text-primary mt-4">Nor Application Overwhelm</h3>
              <p className="text-gray-700 mt-2">We streamline the process, making it easier than ever to put your best foot forward.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

const HoverCardDemo: React.FC<{ name: string, link: string, image: string }> = ({ name, link, image }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer text-primary hover:underline">{name}</span>
      </HoverCardTrigger>
      <HoverCardContent className="w-65 p-2">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{name}</h4>
            <p className="text-sm">Check out {name}'s LinkedIn profile.</p>
            <div className="flex items-center pt-2">
              <a href={link} target="_blank" className="text-xs text-muted-foreground hover:underline">
                Visit LinkedIn
              </a>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AboutUs;