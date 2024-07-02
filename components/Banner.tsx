import { Instagram, X } from 'lucide-react';
import { useState, useEffect } from 'react';

type BannerProps = {
  onClose: () => void;
};

const Banner: React.FC<BannerProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const bannerClosed = sessionStorage.getItem('bannerClosed');
    if (bannerClosed === 'true') {
      setIsVisible(false);
      onClose();
    }
  }, [onClose]);

  const handleClose = () => {
    sessionStorage.setItem('bannerClosed', 'true');
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative w-full bg-[#FF70AE] py-2 flex justify-center items-center text-white no-underline rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <a
        href="https://www.instagram.com/creativeagency.careers/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-white"
      >
        <span className="mr-2">Join us on Instagram!</span>
        <Instagram className="h-6 w-6" />
      </a>
      <button
        onClick={handleClose}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Banner;