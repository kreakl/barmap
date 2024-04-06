import {
  BarTypeCategory,
  IQuery,
  PaginatedBarDto,
  PaginatedBarOutletDto,
} from '@bar-map/graphql-types';

export * from '@bar-map/graphql-types';

type OutletsQueryParameters = Parameters<IQuery['outlets']>;

type BarsQueryParameters = Parameters<IQuery['bars']>;

type OutletsVariablesNames = ['order', 'page', 'pageSize', 'typeIds'];

type BarsVariablesNames = OutletsVariablesNames;

export type OutletsQueryVariables = {
  [K in keyof Omit<
    OutletsQueryParameters,
    keyof Array<unknown>
  > as OutletsVariablesNames[K]]: OutletsQueryParameters[K];
};

export type BarsQueryVariables = {
  [K in keyof Omit<
    BarsQueryParameters,
    keyof Array<unknown>
  > as BarsVariablesNames[K]]: OutletsQueryParameters[K];
};

export type OutletsData = {
  outlets: PaginatedBarOutletDto;
};

export type BarData = {
  bars: PaginatedBarDto;
};

export type CategoryData = {
  barCategories: BarTypeCategory[];
};
