import { IPlace } from './place';

export interface ICity{
    _id: string;
    name: string;
    places: IPlace[];
    country: string;
}