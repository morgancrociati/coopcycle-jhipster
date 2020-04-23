import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICommande, Commande } from 'app/shared/model/commande.model';
import { CommandeService } from './commande.service';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant/restaurant.service';
import { ICompte } from 'app/shared/model/compte.model';
import { CompteService } from 'app/entities/compte/compte.service';

type SelectableEntity = IRestaurant | ICompte;

@Component({
  selector: 'jhi-commande-update',
  templateUrl: './commande-update.component.html'
})
export class CommandeUpdateComponent implements OnInit {
  isSaving = false;
  restaurants: IRestaurant[] = [];
  comptes: ICompte[] = [];

  editForm = this.fb.group({
    id: [],
    etatPrep: [null, [Validators.required]],
    etatLiv: [null, [Validators.required]],
    paiement: [null, [Validators.required]],
    restaurant: [],
    livreur: [],
    client: []
  });

  constructor(
    protected commandeService: CommandeService,
    protected restaurantService: RestaurantService,
    protected compteService: CompteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ commande }) => {
      this.updateForm(commande);

      this.restaurantService.query().subscribe((res: HttpResponse<IRestaurant[]>) => (this.restaurants = res.body || []));

      this.compteService.query().subscribe((res: HttpResponse<ICompte[]>) => (this.comptes = res.body || []));
    });
  }

  updateForm(commande: ICommande): void {
    this.editForm.patchValue({
      id: commande.id,
      etatPrep: commande.etatPrep,
      etatLiv: commande.etatLiv,
      paiement: commande.paiement,
      restaurant: commande.restaurant,
      livreur: commande.livreur,
      client: commande.client
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const commande = this.createFromForm();
    if (commande.id !== undefined) {
      this.subscribeToSaveResponse(this.commandeService.update(commande));
    } else {
      this.subscribeToSaveResponse(this.commandeService.create(commande));
    }
  }

  private createFromForm(): ICommande {
    return {
      ...new Commande(),
      id: this.editForm.get(['id'])!.value,
      etatPrep: this.editForm.get(['etatPrep'])!.value,
      etatLiv: this.editForm.get(['etatLiv'])!.value,
      paiement: this.editForm.get(['paiement'])!.value,
      restaurant: this.editForm.get(['restaurant'])!.value,
      livreur: this.editForm.get(['livreur'])!.value,
      client: this.editForm.get(['client'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommande>>): void {
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
}
