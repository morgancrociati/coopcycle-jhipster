import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPanier, Panier } from 'app/shared/model/panier.model';
import { PanierService } from './panier.service';
import { ICommande } from 'app/shared/model/commande.model';
import { CommandeService } from 'app/entities/commande/commande.service';

@Component({
  selector: 'jhi-panier-update',
  templateUrl: './panier-update.component.html'
})
export class PanierUpdateComponent implements OnInit {
  isSaving = false;
  numcommandes: ICommande[] = [];

  editForm = this.fb.group({
    id: [],
    etatPanier: [null, [Validators.required]],
    numCommande: []
  });

  constructor(
    protected panierService: PanierService,
    protected commandeService: CommandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ panier }) => {
      this.updateForm(panier);

      this.commandeService
        .query({ filter: 'numpanier-is-null' })
        .pipe(
          map((res: HttpResponse<ICommande[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICommande[]) => {
          if (!panier.numCommande || !panier.numCommande.id) {
            this.numcommandes = resBody;
          } else {
            this.commandeService
              .find(panier.numCommande.id)
              .pipe(
                map((subRes: HttpResponse<ICommande>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICommande[]) => (this.numcommandes = concatRes));
          }
        });
    });
  }

  updateForm(panier: IPanier): void {
    this.editForm.patchValue({
      id: panier.id,
      etatPanier: panier.etatPanier,
      numCommande: panier.numCommande
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const panier = this.createFromForm();
    if (panier.id !== undefined) {
      this.subscribeToSaveResponse(this.panierService.update(panier));
    } else {
      this.subscribeToSaveResponse(this.panierService.create(panier));
    }
  }

  private createFromForm(): IPanier {
    return {
      ...new Panier(),
      id: this.editForm.get(['id'])!.value,
      etatPanier: this.editForm.get(['etatPanier'])!.value,
      numCommande: this.editForm.get(['numCommande'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPanier>>): void {
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

  trackById(index: number, item: ICommande): any {
    return item.id;
  }
}
