import { ICooperative } from 'app/shared/model/cooperative.model';

export interface IRestaurant {
  id?: number;
  nom?: string;
  type?: string;
  description?: string;
  cooperatives?: ICooperative[];
}

export class Restaurant implements IRestaurant {
  constructor(
    public id?: number,
    public nom?: string,
    public type?: string,
    public description?: string,
    public cooperatives?: ICooperative[]
  ) {}
}
