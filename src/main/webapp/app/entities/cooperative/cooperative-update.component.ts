import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICooperative, Cooperative } from 'app/shared/model/cooperative.model';
import { CooperativeService } from './cooperative.service';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant/restaurant.service';
import { ICompte } from 'app/shared/model/compte.model';
import { CompteService } from 'app/entities/compte/compte.service';

type SelectableEntity = IRestaurant | ICompte;

@Component({
  selector: 'jhi-cooperative-update',
  templateUrl: './cooperative-update.component.html'
})
export class CooperativeUpdateComponent implements OnInit {
  isSaving = false;
  restaurants: IRestaurant[] = [];
  comptes: ICompte[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    restaurants: [],
    adminsys: [],
    admincoops: []
  });

  constructor(
    protected cooperativeService: CooperativeService,
    protected restaurantService: RestaurantService,
    protected compteService: CompteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cooperative }) => {
      this.updateForm(cooperative);

      this.restaurantService.query().subscribe((res: HttpResponse<IRestaurant[]>) => (this.restaurants = res.body || []));

      this.compteService.query().subscribe((res: HttpResponse<ICompte[]>) => (this.comptes = res.body || []));
    });
  }

  updateForm(cooperative: ICooperative): void {
    this.editForm.patchValue({
      id: cooperative.id,
      nom: cooperative.nom,
      restaurants: cooperative.restaurants,
      adminsys: cooperative.adminsys,
      admincoops: cooperative.admincoops
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cooperative = this.createFromForm();
    if (cooperative.id !== undefined) {
      this.subscribeToSaveResponse(this.cooperativeService.update(cooperative));
    } else {
      this.subscribeToSaveResponse(this.cooperativeService.create(cooperative));
    }
  }

  private createFromForm(): ICooperative {
    return {
      ...new Cooperative(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      restaurants: this.editForm.get(['restaurants'])!.value,
      adminsys: this.editForm.get(['adminsys'])!.value,
      admincoops: this.editForm.get(['admincoops'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICooperative>>): void {
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

  getSelected(selectedVals: SelectableEntity[], option: SelectableEntity): SelectableEntity {
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
