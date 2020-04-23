import { IRestaurant } from 'app/shared/model/restaurant.model';
import { ICompte } from 'app/shared/model/compte.model';

export interface ICooperative {
  id?: number;
  nom?: string;
  restaurants?: IRestaurant[];
  adminsys?: ICompte[];
  admincoops?: ICompte[];
}

export class Cooperative implements ICooperative {
  constructor(
    public id?: number,
    public nom?: string,
    public restaurants?: IRestaurant[],
    public adminsys?: ICompte[],
    public admincoops?: ICompte[]
  ) {}
}
