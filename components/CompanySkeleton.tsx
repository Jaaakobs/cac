// components/CompanySkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

const CompanySkeleton = () => {
  return (
    <div className="flex flex-col items-start p-4 border border-gray-300 rounded-lg bg-white shadow-sm w-full">
      <Skeleton className="w-16 h-16 rounded-lg mb-4" />
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 mt-2">
          <Skeleton className="h-6 w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default CompanySkeleton;