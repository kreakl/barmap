
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { GraphQLCountryCode, GraphQLPhoneNumber } from 'graphql-scalars'

export class State {
    __typename?: 'State';
    isoAlphaCode2: CountryCode;
    name: string;
}

export class BarTypeCategory {
    __typename?: 'BarTypeCategory';
    id: number;
    name: string;
    barTypeList: BarType[];
}

export class BarType {
    __typename?: 'BarType';
    id: number;
    name: string;
    barList: Bar[];
    category: BarTypeCategory;
}

export class Franchise {
    __typename?: 'Franchise';
    id: number;
    name: string;
    barList: Bar[];
}

export class Bar {
    __typename?: 'Bar';
    id: number;
    name: string;
    description: string;
    typeList: BarType[];
    franchise: Franchise;
    outletList: BarOutlet[];
    logoUrl?: Nullable<string>;
    outlets: BarOutlet[];
    types: BarType[];
}

export class BarOutlet {
    __typename?: 'BarOutlet';
    id: number;
    phoneNumber?: Nullable<PhoneNumber>;
    address: Address;
    pictureUrl?: Nullable<string>;
    bar: Bar;
}

export class Point {
    __typename?: 'Point';
    coordinates: number[];
}

export class Address {
    __typename?: 'Address';
    id: number;
    location: Point;
    street: string;
    city: string;
    state: State;
    barOutletList: BarOutlet[];
}

export abstract class IQuery {
    __typename?: 'IQuery';
    bars: Bar[];
    bar?: Bar;
}

export type CountryCode = typeof GraphQLCountryCode;
export type PhoneNumber = typeof GraphQLPhoneNumber;
type Nullable<T> = T | null;
