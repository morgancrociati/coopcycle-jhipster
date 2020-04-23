import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduit, Produit } from 'app/shared/model/produit.model';
import { ProduitService } from './produit.service';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant/restaurant.service';
import { IPanier } from 'app/shared/model/panier.model';
import { PanierService } from 'app/entities/panier/panier.service';

type SelectableEntity = IRestaurant | IPanier;

@Component({
  selector: 'jhi-produit-update',
  templateUrl: './produit-update.component.html'
})
export class ProduitUpdateComponent implements OnInit {
  isSaving = false;
  restaurants: IRestaurant[] = [];
  paniers: IPanier[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    prix: [null, [Validators.required, Validators.min(0)]],
    disponibilite: [null, [Validators.required]],
    description: [],
    restaurant: [],
    paniers: []
  });

  constructor(
    protected produitService: ProduitService,
    protected restaurantService: RestaurantService,
    protected panierService: PanierService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produit }) => {
      this.updateForm(produit);

      this.restaurantService.query().subscribe((res: HttpResponse<IRestaurant[]>) => (this.restaurants = res.body || []));

      this.panierService.query().subscribe((res: HttpResponse<IPanier[]>) => (this.paniers = res.body || []));
    });
  }

  updateForm(produit: IProduit): void {
    this.editForm.patchValue({
      id: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      disponibilite: produit.disponibilite,
      description: produit.description,
      restaurant: produit.restaurant,
      paniers: produit.paniers
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produit = this.createFromForm();
    if (produit.id !== undefined) {
      this.subscribeToSaveResponse(this.produitService.update(produit));
    } else {
      this.subscribeToSaveResponse(this.produitService.create(produit));
    }
  }

  private createFromForm(): IProduit {
    return {
      ...new Produit(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prix: this.editForm.get(['prix'])!.value,
      disponibilite: this.editForm.get(['disponibilite'])!.value,
      description: this.editForm.get(['description'])!.value,
      restaurant: this.editForm.get(['restaurant'])!.value,
      paniers: this.editForm.get(['paniers'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduit>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IPanier[], option: IPanier): IPanier {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
