import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchlistComponent } from './page/branchlist/branchlist.component';
import { BranchaddComponent } from './page/branchadd/branchadd.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BranchViewComponent } from './page/branch-view/branch-view.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [BranchlistComponent, BranchaddComponent, BranchViewComponent],
  imports: [
    CommonModule,
    BranchRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class BranchModule { }
