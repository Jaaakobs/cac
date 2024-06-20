import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 mt-8">
      <div className="max-w-screen-lg mx-auto flex justify-center space-x-8">
        <Link href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
        <Link href="/cookie-policy" className="hover:underline">
          Cookie Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;