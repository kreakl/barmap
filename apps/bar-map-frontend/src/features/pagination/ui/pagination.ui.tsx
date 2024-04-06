'use client';

import {
  MdOutlineKeyboardArrowLeft as ArrowLeftIcon,
  MdOutlineKeyboardArrowRight as ArrowRightIcon,
  MdOutlineKeyboardDoubleArrowRight as DoubleArrowRightIcon,
  MdOutlineKeyboardDoubleArrowLeft as DoubleArrowLeftIcon,
} from 'react-icons/md';
import { usePagination } from '../lib/use-pagination.hook';
import { clsx } from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

export type PaginationProps = {
  totalPages: number;
  visiblePages: number;
};

export type PaginationNumberProps = {
  page: number | string;
  href: string;
  isActive: boolean;
};

export type PaginationArrowProps = {
  href: string;
  icon: ReactNode;
  isDisabled?: boolean;
};

function PaginationNumber({ page, href, isActive }: PaginationNumberProps) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-full text-sm border border-gray-300 hover:border-amber-600',
    {
      'z-10 bg-amber-600 border-amber-600 text-white': isActive,
    },
  );

  return isActive ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({ icon, href, isDisabled }: PaginationArrowProps) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md text-amber-600',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
    },
  );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}

export function Pagination({ totalPages = 1, visiblePages }: PaginationProps) {
  const { currentPage, pages, createPageURL } = usePagination(
    totalPages,
    visiblePages,
  );

  return (
    <div className="mx-2 inline-flex gap-4 md:mx-4">
      <PaginationArrow
        icon={<DoubleArrowLeftIcon />}
        href={createPageURL(1)}
        isDisabled={currentPage <= 1}
      />
      <PaginationArrow
        icon={<ArrowLeftIcon />}
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex gap-2">
        {pages.map(({ page, href }) => {
          return (
            <PaginationNumber
              key={`${page}-${href}`}
              href={href}
              page={page}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        icon={<ArrowRightIcon />}
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
      <PaginationArrow
        icon={<DoubleArrowRightIcon />}
        href={createPageURL(totalPages)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}
