import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import cacLogo from '@/images/CAC-Logo-space.svg';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 mt-8">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center">
        <Image src={cacLogo} alt="CAC Logo" width={100} height={100} className="mb-4" />
        <div className="flex items-center space-x-8">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/cookie-policy" className="hover:underline">
            Cookie Policy
          </Link>
          <Link href="https://www.instagram.com/creativeagency.careers/" target="_blank">
            <Button variant="ghost" size="icon">
              <Instagram className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto text-center mt-8 italic">
        <Link href="/about-us" className="hover:text-red-500 transition">
          Your CAC-Team
        </Link>
        <Link href="/manifesto" className="hover:text-red-500 transition ml-2">
          with ❤️‍🔥 from Berlin
        </Link>
      </div>
    </footer>
  );
};

export default Footer;