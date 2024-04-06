import { gql, TypedDocumentNode } from '@apollo/client';
import {
  OutletsData,
  OutletsQueryVariables,
} from '@front-main/shared/api';

export const GET_ALL_OUTLETS_QUERY: TypedDocumentNode<
  OutletsData,
  OutletsQueryVariables
> = gql`
  query GetAllOutletsQuery(
    $order: Order = ASC
    $page: Int = 1
    $pageSize: Int = 10
    $typeIds: [Int!]
  ) {
    outlets(
      pageSize: $pageSize
      order: $order
      page: $page
      typeIds: $typeIds
    ) {
      pageCount
      totalCount
      data {
        id
        description
        phoneNumber
        photos {
          url
        }
        bar {
          id
          averageBillSum
          name
          types {
            name
          }
        }
        address {
          city
          street
          location {
            coordinates
          }
        }
      }
    }
  }
`;
