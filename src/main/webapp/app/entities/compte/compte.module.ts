import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoopcycleSharedModule } from 'app/shared/shared.module';
import { CompteComponent } from './compte.component';
import { CompteDetailComponent } from './compte-detail.component';
import { CompteUpdateComponent } from './compte-update.component';
import { CompteDeleteDialogComponent } from './compte-delete-dialog.component';
import { compteRoute } from './compte.route';

@NgModule({
  imports: [CoopcycleSharedModule, RouterModule.forChild(compteRoute)],
  declarations: [CompteComponent, CompteDetailComponent, CompteUpdateComponent, CompteDeleteDialogComponent],
  entryComponents: [CompteDeleteDialogComponent]
})
export class CoopcycleCompteModule {}
