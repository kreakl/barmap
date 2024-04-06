import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { isEmpty } from 'lodash';

export const usePagination = (totalPages: number, visiblePages: number) => {
  const range = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages],
  );

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get('page')) || 1;

  const createPageURL = useCallback(
    (pageNumber: number) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const params = new URLSearchParams(searchParams!);
      params.set('page', pageNumber.toString());
      return `${pathName}?${params.toString()}`;
    },
    [pathName, searchParams],
  );

  const blocks = useMemo(() => {
    const blockSize = visiblePages;
    const blocksTotal = Math.ceil(totalPages / blockSize);
    const currBlock = Math.max(0, Math.ceil(currentPage / blockSize - 1));

    return {
      total: blocksTotal,
      current: currBlock,
      size: blockSize,
    };
  }, [currentPage, totalPages, visiblePages]);

  const visibleRange = useMemo(() => {
    const start = blocks.current * blocks.size;
    const delta = totalPages - start;
    const end = start + (delta > blocks.size ? blocks.size : delta);

    return range.slice(start, end);
  }, [blocks, range, totalPages]);

  const isPrevMoreHidden = blocks.total === 1 || blocks.current === 0;

  const isNextMoreHidden =
    blocks.total === 1 || blocks.current === blocks.total - 1;

  const pages = useMemo(() => {
    let pageList: { page: string | number; href: string }[] = [];

    if (isEmpty(visibleRange)) {
      return pageList;
    }

    if (!isPrevMoreHidden) {
      const prevMorePages = blocks.current * blocks.size;
      pageList = [
        { page: 1, href: createPageURL(1) },
        { page: '...', href: createPageURL(prevMorePages) },
      ];
    }

    visibleRange.map((page) => {
      pageList.push({ page: page, href: createPageURL(page) });
    });

    if (!isNextMoreHidden) {
      const moreNextPages = (blocks.current + 1) * blocks.size + 1;
      pageList = [
        ...pageList,
        { page: '...', href: createPageURL(moreNextPages) },
        { page: totalPages, href: createPageURL(totalPages) },
      ];
    }

    return pageList;
  }, [
    blocks,
    createPageURL,
    isNextMoreHidden,
    isPrevMoreHidden,
    totalPages,
    visibleRange,
  ]);

  return {
    createPageURL,
    currentPage,
    pages,
  };
};
