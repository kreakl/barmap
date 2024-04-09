import { MainPage } from '@front-main/pages/main/main-page';
import { SearchParams } from '@front-main/shared/models';

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return <MainPage searchParams={searchParams} />;
}
