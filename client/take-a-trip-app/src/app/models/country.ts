import { ICity } from './city';

export interface ICountry{
    _id: string;
    name: string;
    cities: ICity[];
}