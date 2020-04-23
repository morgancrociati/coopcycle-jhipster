import { ICommande } from 'app/shared/model/commande.model';
import { IProduit } from 'app/shared/model/produit.model';
import { EtatPanier } from 'app/shared/model/enumerations/etat-panier.model';

export interface IPanier {
  id?: number;
  etatPanier?: EtatPanier;
  numCommande?: ICommande;
  produits?: IProduit[];
}

export class Panier implements IPanier {
  constructor(public id?: number, public etatPanier?: EtatPanier, public numCommande?: ICommande, public produits?: IProduit[]) {}
}
