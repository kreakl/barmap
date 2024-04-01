import { Bar } from '../types';
import { gql, TypedDocumentNode } from '@apollo/client';

export const GET_ALL_OUTLETS_QUERY: TypedDocumentNode<Bar> = gql`
  query GetAllOutletsQuery {
    outlets {
      id
      description
      phoneNumber
      photos {
        url
      }
      bar {
        id
        description
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
`;
