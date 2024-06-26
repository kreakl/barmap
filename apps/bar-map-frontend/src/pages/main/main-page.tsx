import { getClient } from '@front-main/shared/api/graphql/apollo-client';
import { GET_OUTLETS_PAGES_COUNT } from '@front-main/pages/main/get-outlets-pages.query';
import { Suspense } from 'react';
import { SearchParams } from '@front-main/shared/model/types';
import { Pagination } from '@front-main/features/pagination';
import {
  BarCardList,
  BarCardListSkeleton,
} from '@front-main/widgets/bar-card-list';

export type MainPageProps = {
  searchParams: SearchParams;
};

const PAGE_SIZE = 4;
const VISIBLE_PAGES = 8;

export async function MainPage({ searchParams: { page } }: MainPageProps) {
  const {
    data: {
      outlets: { pageCount },
    },
  } = await getClient().query({
    query: GET_OUTLETS_PAGES_COUNT,
    variables: { pageSize: PAGE_SIZE },
  });

  return (
    <div className="4xl:w-1/3 mx-auto w-full md:w-3/4 lg:w-1/2 2xl:w-2/5">
      <Suspense key={page} fallback={<BarCardListSkeleton />}>
        <BarCardList pageSize={PAGE_SIZE} currentPage={Number(page) || 1} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={pageCount} visiblePages={VISIBLE_PAGES} />
      </div>
    </div>
  );
}
