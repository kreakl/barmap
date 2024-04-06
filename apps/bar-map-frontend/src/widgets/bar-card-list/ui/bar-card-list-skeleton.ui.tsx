import { ImageGridSkeleton } from '@front-main/shared/ui/image-grid';
import { BarCardSkeleton } from '@front-main/entities/bar/ui/stories/bar-card-skeleton.ui';

export type BarCardListSkeletonProps = {
  count?: number;
};

export function BarCardListSkeleton({ count = 4 }: BarCardListSkeletonProps) {
  return (
    <div className="w-full border-b-[1px] ">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="*:flex-1 mb-4 flex h-80 flex-col gap-4 overflow-hidden md:mb-10 md:h-60 md:flex-row md:gap-10"
        >
          <div className="h-1/3 md:h-full md:w-1/3">
            <ImageGridSkeleton />
          </div>
          <BarCardSkeleton />
        </div>
      ))}
    </div>
  );
}
