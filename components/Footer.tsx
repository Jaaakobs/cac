import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import cacLogo from '@/images/cac-logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-8 w-full">
      <div className="w-full pt-16 pb-8">
        <div className="max-w-screen-lg mx-auto flex flex-col items-center text-center space-y-4 px-4">
          <h2 className="text-2xl font-bold text-primary">Stay in the loop</h2>
          <div className="max-w-[800px] mx-auto">
            <p className="text-gray-700">
              Follow us on Instagram as we build a community around Germany's top advertising news,
              share tips for landing your dream role, and offer a sneak peek into agency life.
            </p>
            <p className="text-gray-700 mt-2">
              Feeling chatty? We're all ears for feedback and suggestions. Drop us a line{' '}
              <a href="mailto:creativeagencycareers@gmail.com" className="text-black underline">here</a> or via DMs.
            </p>
            <p className="text-gray-700">
            </p>
          </div>
        </div>
      </div>
      <div className="w-full pt-8 pb-8">
        <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 px-4">
          <div className="flex justify-center w-full md:w-auto md:justify-start">
            <Link href="/" passHref>
              <Image src={cacLogo} alt="CAC Logo" width={100} height={100} className="cursor-pointer" />
            </Link>
          </div>
          <div className="text-center italic flex flex-col items-center space-y-2 md:space-y-0 max-w-[650px]">
            <Link href="/about-us" className="hover:underline transition">
              Your CAC-Team with <span className="text-blue-500">💙</span> from Berlin
            </Link>
            <div className="flex flex-col md:flex-row md:space-x-4 mt-2 md:mt-0">
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="hover:underline">
                Cookie Policy
              </Link>
            </div>
          </div>
          <div className="flex justify-center w-full md:w-auto md:justify-end">
            <Link href="https://www.instagram.com/creativeagency.careers/" passHref target="_blank" rel="noopener noreferrer">
              <Instagram className="h-6 w-6 text-primary hover:text-primary-dark" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;