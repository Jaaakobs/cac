import Image from 'next/image';
import cacHeader from '@/images/cac_header.svg';

const Header: React.FC = () => {
  return (
    <header className="py-12">
      <div className="max-w-screen-lg mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold text-black mb-4">
            Get Tailored Job Alerts
          </h1>
          <p className="text-lg text-gray-700">
            Let the right opportunities come to you! Just share what you're looking for to receive your weekly custom offers selection straight into your inbox.
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <Image src={cacHeader} alt="Germany's Creative Jobs Hub" layout="responsive" />
        </div>
      </div>
    </header>
  );
};

export default Header;