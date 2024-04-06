import { BarCard, BarCardInfo } from '@front-main/entities/bar/ui';
import { getClient, Order } from '@front-main/shared/api';
import { GET_ALL_OUTLETS_QUERY } from '@front-main/widgets/bar-card-list/api/get-all-outlets.query';
import { Nullable } from '@front-main/shared/models';
import { ImageGrid } from '@front-main/shared/ui';
import { BookmarkBar } from '@front-main/features/bookmark-bar/ui/bookmark-bar.ui';

export type BarCardListProps = {
  order?: Order;
  currentPage?: number;
  pageSize?: number;
  typeIds?: Nullable<number[]>;
};

export async function BarCardList({
  order = Order.ASC,
  currentPage = 1,
  pageSize = 10,
  typeIds,
}: BarCardListProps) {
  const {
    data: {
      outlets: { data: outlets },
    },
  } = await getClient().query({
    query: GET_ALL_OUTLETS_QUERY,
    variables: { order, page: currentPage, pageSize, typeIds },
  });

  return (
    <div>
      {(outlets || []).map(
        ({
          id,
          description,
          photos,
          address,
          bar: { name, types, averageBillSum },
        }) => (
          <div
            className="flex min-h-[70vh] flex-col gap-4 border-b-[1px] border-b-zinc-200 p-3
              md:h-auto md:min-h-min md:flex-row md:content-center md:py-8"
            key={id}
          >
            <div className="h-[40vh] flex-shrink-0 md:h-60 md:w-[44%]">
              <ImageGrid
                imageUrls={photos.map(({ url }) => url)}
                variant="rounded"
              />
            </div>
            <div className="flex-1 basis-1/2">
              <BarCard
                headerActionSlot={<BookmarkBar />}
                title={name}
                description={description}
                variant={{ size: 'md' }}
              >
                <BarCardInfo
                  address={`${address.city}. ${address.street}`}
                  categoryList={types.map((type) => type.name)}
                  billSum={
                    averageBillSum ? averageBillSum.toString() : undefined
                  }
                />
              </BarCard>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
