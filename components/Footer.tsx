import Link from 'next/link';
import Image from 'next/image';
import cacLogo from '@/images/CAC-Logo-space.svg';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 mt-8">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0 md:items-center">
        <div className="flex justify-center w-full md:w-auto md:justify-start">
          <Image src={cacLogo} alt="CAC Logo" width={100} height={100} />
        </div>
        <div className="text-center italic md:flex md:items-center md:space-x-2">
          <Link href="/about-us" className="hover:accent-foreground transition">
            Your CAC-Team
          </Link>
          <Link href="/manifesto" className="hover:accent-foreground transition ml-2">
            with ❤️‍🔥 from Berlin
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/cookie-policy" className="hover:underline">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;