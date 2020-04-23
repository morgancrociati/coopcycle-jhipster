import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICompte, Compte } from 'app/shared/model/compte.model';
import { CompteService } from './compte.service';

@Component({
  selector: 'jhi-compte-update',
  templateUrl: './compte-update.component.html'
})
export class CompteUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    pseudo: [null, [Validators.required]],
    email: [null, [Validators.required]],
    motDePasse: [null, [Validators.required, Validators.minLength(8)]]
  });

  constructor(protected compteService: CompteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ compte }) => {
      this.updateForm(compte);
    });
  }

  updateForm(compte: ICompte): void {
    this.editForm.patchValue({
      id: compte.id,
      pseudo: compte.pseudo,
      email: compte.email,
      motDePasse: compte.motDePasse
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const compte = this.createFromForm();
    if (compte.id !== undefined) {
      this.subscribeToSaveResponse(this.compteService.update(compte));
    } else {
      this.subscribeToSaveResponse(this.compteService.create(compte));
    }
  }

  private createFromForm(): ICompte {
    return {
      ...new Compte(),
      id: this.editForm.get(['id'])!.value,
      pseudo: this.editForm.get(['pseudo'])!.value,
      email: this.editForm.get(['email'])!.value,
      motDePasse: this.editForm.get(['motDePasse'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompte>>): void {
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
}
