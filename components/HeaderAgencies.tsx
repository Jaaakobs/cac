import Image from 'next/image';
import cacLogo from '@/images/cac-logo.png';

const Header: React.FC = () => {
  return (
    <header className="pt-4 md:py-6">
      <div className="max-w-screen-lg mx-auto px-4 flex flex-col items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center max-w-[800px]">
            The Most Promising Creative Agencies
          </h1>
          <p className="text-sm md:text-lg text-gray-700 text-center mb-2 md:mb-3 max-w-[600px]">
          Start your search by finding what agencies there are. Discover the most promising creative agencies and find your perfect fit.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;