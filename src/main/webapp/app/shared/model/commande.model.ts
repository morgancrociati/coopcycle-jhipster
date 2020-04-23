import { IRestaurant } from 'app/shared/model/restaurant.model';
import { ICompte } from 'app/shared/model/compte.model';
import { IPanier } from 'app/shared/model/panier.model';
import { Preparation } from 'app/shared/model/enumerations/preparation.model';
import { Livraison } from 'app/shared/model/enumerations/livraison.model';
import { MoyenDePayement } from 'app/shared/model/enumerations/moyen-de-payement.model';

export interface ICommande {
  id?: number;
  etatPrep?: Preparation;
  etatLiv?: Livraison;
  paiement?: MoyenDePayement;
  restaurant?: IRestaurant;
  livreur?: ICompte;
  client?: ICompte;
  numPanier?: IPanier;
}

export class Commande implements ICommande {
  constructor(
    public id?: number,
    public etatPrep?: Preparation,
    public etatLiv?: Livraison,
    public paiement?: MoyenDePayement,
    public restaurant?: IRestaurant,
    public livreur?: ICompte,
    public client?: ICompte,
    public numPanier?: IPanier
  ) {}
}
