import Image, { ImageProps } from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { clsx } from 'clsx';

type ImageGridProps = {
  imageUrls: ImageProps['src'][];
  variant?: 'square' | 'rounded';
};

export function ImageGrid({ imageUrls, variant = 'square' }: ImageGridProps) {
  const isMoreThanTwoImages = imageUrls.length > 2;

  return (
    <div
      className={clsx('flex h-full w-full gap-2 overflow-hidden', {
        'flex-wrap': isMoreThanTwoImages,
        'flex-col': !isMoreThanTwoImages,
        'rounded-xl': variant === 'rounded',
      })}
    >
      {imageUrls.map((url, idx) => (
        <div
          key={`${url}-${idx}`}
          className={clsx(
            'relative aspect-square w-full flex-1 basis-[calc(50%-0.5rem)] overflow-hidden',
            {
              'h-1/2': isMoreThanTwoImages,
            },
          )}
        >
          <Image src={url} alt="image of a bar" className="object-cover" fill />
        </div>
      ))}
    </div>
  );
}

type ImageGridSkeletonProps = {
  count?: number;
  variant?: 'square' | 'rounded';
};

export function ImageGridSkeleton({
  count = 3,
  variant,
}: ImageGridSkeletonProps) {
  return (
    <div
      className={clsx('flex h-full w-full flex-wrap gap-2', {
        'rounded-xl': variant === 'rounded',
      })}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex-1 basis-[calc(50%-0.5rem)]">
          <Skeleton className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}
