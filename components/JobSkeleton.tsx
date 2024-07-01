// components/JobSkeleton.js
import { Skeleton } from "@/components/ui/skeleton";

const JobSkeleton = () => {
  return (
    <div className="relative p-6 bg-white rounded-lg shadow-md mb-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex items-center h-full w-full">
      <div className="flex-shrink-0">
        <Skeleton className="w-16 h-16 rounded-full mr-4" />
      </div>
      <div className="flex-grow w-full">
        <div className="flex items-center w-full">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/4 ml-2" />
        </div>
        <div className="flex flex-wrap items-center text-gray-700 mt-2 w-full">
          <Skeleton className="h-4 w-1/4 mr-4" />
          <Skeleton className="h-4 w-1/4 mr-4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-2 w-full">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      <div className="ml-auto pl-4">
        <Skeleton className="h-6 w-6" />
      </div>
    </div>
  );
};

export default JobSkeleton;