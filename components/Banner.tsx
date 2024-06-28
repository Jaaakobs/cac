import { Instagram } from 'lucide-react';

const Banner: React.FC = () => {
  return (
    <a
      href="https://www.instagram.com/creativeagency.careers/"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full bg-[#FF70AE] py-2 flex justify-center items-center text-white no-underline rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <span className="mr-2">Join us on Instagram!</span>
      <Instagram className="h-6 w-6" />
    </a>
  );
};

export default Banner;