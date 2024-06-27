"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";

const BackLink: React.FC = () => {
  const pathname = usePathname();
  const previousPath = pathname.includes('/agencies') ? '/agencies' : '/jobs';

  return (
    <div className="pb-4"> {/* Added padding below the button */}
      <Link href={previousPath} passHref>
        <Button variant="link">
          {previousPath === '/agencies' ? '← Back to agencies overview' : '← Back to job board'}
        </Button>
      </Link>
    </div>
  );
};

export default BackLink;