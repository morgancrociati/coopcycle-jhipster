import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.CoopcycleRoleModule)
      },
      {
        path: 'compte',
        loadChildren: () => import('./compte/compte.module').then(m => m.CoopcycleCompteModule)
      },
      {
        path: 'restaurant',
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.CoopcycleRestaurantModule)
      },
      {
        path: 'cooperative',
        loadChildren: () => import('./cooperative/cooperative.module').then(m => m.CoopcycleCooperativeModule)
      },
      {
        path: 'panier',
        loadChildren: () => import('./panier/panier.module').then(m => m.CoopcyclePanierModule)
      },
      {
        path: 'produit',
        loadChildren: () => import('./produit/produit.module').then(m => m.CoopcycleProduitModule)
      },
      {
        path: 'commande',
        loadChildren: () => import('./commande/commande.module').then(m => m.CoopcycleCommandeModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CoopcycleEntityModule {}
