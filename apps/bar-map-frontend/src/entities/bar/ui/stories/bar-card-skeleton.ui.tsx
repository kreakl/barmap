import Skeleton from 'react-loading-skeleton';

export function BarCardSkeleton() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="w-2/3">
        <Skeleton count={3} className="mb-4" />
      </div>
      <div className="w-3/4">
        <Skeleton count={5} className="w-full" />
      </div>
    </div>
  );
}
