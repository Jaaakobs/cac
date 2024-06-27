"use client";

import Link from 'next/link';
import MenuBar from '@/components/MenuBar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";

export function ButtonLink() {
  return (
    <Link href="/" passHref>
      <Button variant="link">
        &larr; Back to job board
      </Button>
    </Link>
  );
}

const Manifesto: React.FC = () => {
  const sections = [
    {
      title: "Problem",
      content: `The creative industry thrives on talent, innovation, and collaboration. However, finding the right opportunities in creative agencies can be daunting. The existing job platforms are often cluttered, impersonal, and fail to capture the essence of the creative spirit. The result? A mismatch between agencies seeking unique talents and individuals striving to make their mark in the creative world.`
    },
    {
      title: "Aspiration",
      content: `Our north star is to bridge the gap between exceptional creative agencies and extraordinary talent. We aspire to create a platform that reflects the dynamic and inspiring nature of the creative industry. We believe that when the right people come together, magic happens. Our mission is to make that connection seamless, personal, and inspiring.`
    },
    {
      title: "Inspiration",
      content: `We draw inspiration from visionary companies that have transformed their industries through innovation and a relentless focus on user experience. Companies like IDEO, Behance, and Dribbble have redefined the creative landscape by empowering individuals and fostering communities of passionate creatives. We aim to contribute to this legacy by creating a platform that celebrates and amplifies the unique stories and visions of creative agencies.`
    },
    {
      title: "Solution",
      content: `Creative Agency Careers (CAC) is not just another job board; it’s a curated space where creativity meets opportunity. We meticulously select agencies that stand out for their innovation, culture, and impact. Our platform is designed to showcase these agencies in a way that resonates with creative professionals.

      We believe in the power of storytelling. Each agency profile on CAC goes beyond the basics, highlighting the agency’s ethos, landmark projects, and the unique experiences they offer to their team members. By doing so, we help job seekers find workplaces where they can truly thrive and contribute meaningfully.`
    },
    {
      title: "Impact",
      content: `The creative industry is a cornerstone of cultural and economic development, especially in Europe. By connecting top-tier agencies with top-tier talent, we aim to fuel this engine of creativity. Our platform will streamline the job search process, saving time for both job seekers and agencies. More importantly, it will foster connections that lead to groundbreaking work and career satisfaction.

      We envision a future where creative professionals find roles that align with their passions and where agencies discover talents that drive their vision forward. By making these connections, we will not only enhance individual careers but also contribute to the evolution of the creative industry as a whole.`
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
          <ButtonLink />
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

export default Manifesto;