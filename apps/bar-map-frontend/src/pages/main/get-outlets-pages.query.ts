import { gql, TypedDocumentNode } from '@apollo/client';
import {
  OutletsQueryVariables,
  PaginatedBarOutletDto,
} from '@front-main/shared/api';

type OutletsPageCountData = {
  outlets: Pick<PaginatedBarOutletDto, 'pageCount'>;
};

export const GET_OUTLETS_PAGES_COUNT: TypedDocumentNode<
  OutletsPageCountData,
  OutletsQueryVariables
> = gql`
  query GetOutletsPagesCount($pageSize: Int!) {
    outlets(pageSize: $pageSize) {
      pageCount
    }
  }
`;
