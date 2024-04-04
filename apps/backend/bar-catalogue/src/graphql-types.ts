
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { GraphQLCountryCode, GraphQLPhoneNumber, GraphQLPositiveFloat } from 'graphql-scalars'

export enum Order {
    ASC = "ASC",
    DESC = "DESC"
}

export interface State {
    __typename?: 'State';
    isoAlphaCode2: CountryCode;
    name: string;
}

export interface BarTypeCategory {
    __typename?: 'BarTypeCategory';
    id: number;
    types: BarType[];
    name: string;
}

export interface BarType {
    __typename?: 'BarType';
    id: number;
    name: string;
    category: BarTypeCategory;
}

export interface Franchise {
    __typename?: 'Franchise';
    id: number;
    name: string;
    bars: Bar[];
}

export interface Bar {
    __typename?: 'Bar';
    id: number;
    averageBillSum?: Nullable<PositiveFloat>;
    name: string;
    description: string;
    types: BarType[];
    franchise: Franchise;
    outlets: BarOutlet[];
    logoUrl?: Nullable<string>;
}

export interface Photo {
    __typename?: 'Photo';
    id: number;
    url: string;
    outlet: BarOutlet;
}

export interface BarOutlet {
    __typename?: 'BarOutlet';
    id: number;
    photos: Photo[];
    phoneNumber: PhoneNumber;
    address: Address;
    bar: Bar;
    description: string;
}

export interface Point {
    __typename?: 'Point';
    coordinates: number[];
}

export interface Address {
    __typename?: 'Address';
    id: number;
    location: Point;
    street: string;
    city: string;
    state: State;
    barOutlets: BarOutlet[];
}

export interface PaginatedBarOutletDto {
    __typename?: 'PaginatedBarOutletDto';
    data: BarOutlet[];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalCount: number;
    page: number;
    pageCount: number;
    pageSize: number;
}

export interface PaginatedBarDto {
    __typename?: 'PaginatedBarDto';
    data: Bar[];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalCount: number;
    page: number;
    pageCount: number;
    pageSize: number;
}

export interface IQuery {
    __typename?: 'IQuery';
    bars(order?: Nullable<Order>, page?: Nullable<number>, pageSize?: Nullable<number>, typeIds?: Nullable<number[]>): PaginatedBarDto | Promise<PaginatedBarDto>;
    bar(id: number): Bar | Promise<Bar>;
    outlets(order?: Nullable<Order>, page?: Nullable<number>, pageSize?: Nullable<number>, typeIds?: Nullable<number[]>): PaginatedBarOutletDto | Promise<PaginatedBarOutletDto>;
    outlet(id: number): BarOutlet | Promise<BarOutlet>;
    barCategories(): BarTypeCategory[] | Promise<BarTypeCategory[]>;
}

export type CountryCode = typeof GraphQLCountryCode;
export type PositiveFloat = typeof GraphQLPositiveFloat;
export type PhoneNumber = typeof GraphQLPhoneNumber;
type Nullable<T> = T | null;
