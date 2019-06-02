import { IPlace } from './place';
import { ICountry } from './country';

export interface ICity{
    _id: string;
    name: string;
    places: IPlace[];
    country: ICountry;
}