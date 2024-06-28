"use client";

import Link from 'next/link';
import MenuBar from '@/components/MenuBar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import BackLink from '@/components/BackLink';

const AboutUs: React.FC = () => {
  const sections = [
    {
      title: "Our Story",
      content: `Creative Agency Careers (CAC) was founded by Clara and Jakob, two passionate individuals with a vision to revolutionize the creative industry. With backgrounds in creative arts and technology, they recognized the challenges faced by both agencies and job seekers in finding the perfect match. Their journey began with a simple idea - to create a platform that embodies the spirit of creativity and connects talented individuals with inspiring agencies.`
    },
    {
      title: "Our Mission",
      content: `Our mission is to bridge the gap between creative talent and innovative agencies. We strive to create a space where opportunities are boundless and where the right connections lead to groundbreaking work. We believe in the power of storytelling, and our platform is designed to showcase the unique stories and visions of creative agencies, helping job seekers find workplaces where they can truly thrive.`
    },
    {
      title: "Our Vision",
      content: `We envision a future where the creative industry is more interconnected, where talent finds its perfect home, and where agencies discover the driving force behind their vision. By making meaningful connections, we aim to contribute to the evolution of the creative landscape, fostering a community where creativity flourishes.`
    },
    {
      title: "Our Founders",
      content: `Clara and Jakob are the heart and soul of Creative Agency Careers. Clara, with her extensive experience in the creative arts, brings a deep understanding of the industry's nuances. Jakob, a tech enthusiast, ensures that our platform is not only innovative but also user-friendly. Together, they are committed to making CAC the go-to platform for creative careers.`
    },
    {
      title: "Join Us",
      content: `At Creative Agency Careers, we believe that the right opportunity can change everything. Whether you are a creative professional looking for your next challenge or an agency seeking the perfect addition to your team, we invite you to join us in redefining the future of creative work. Together, we can create a world where creativity flourishes, and opportunities are boundless.`
    }
  ];

  return (
    <div>
      <MenuBar />
      <div className="bg-background p-6 max-w-screen-lg mx-auto">
        <div className="flex items-center mb-4">
          <BackLink />
        </div>
        <div className="grid gap-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-xl font-bold mb-2">{section.title}</h2>
              <p className="text-gray-700">{section.content}</p>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;