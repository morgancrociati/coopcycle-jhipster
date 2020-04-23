import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IPanier } from 'app/shared/model/panier.model';
import { Dispo } from 'app/shared/model/enumerations/dispo.model';

export interface IProduit {
  id?: number;
  nom?: string;
  prix?: number;
  disponibilite?: Dispo;
  description?: string;
  restaurant?: IRestaurant;
  paniers?: IPanier[];
}

export class Produit implements IProduit {
  constructor(
    public id?: number,
    public nom?: string,
    public prix?: number,
    public disponibilite?: Dispo,
    public description?: string,
    public restaurant?: IRestaurant,
    public paniers?: IPanier[]
  ) {}
}
