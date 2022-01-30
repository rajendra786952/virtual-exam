import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentRoutingModule } from './assignment-routing.module';
import { CreateAssignmentComponent } from './page/create-assignment/create-assignment.component';
import { AssignmentComponent } from './page/assignment/assignment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { PastAssignmentComponent } from './page/past-assignment/past-assignment.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [CreateAssignmentComponent, AssignmentComponent, PastAssignmentComponent],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgSelectModule,
    NativeDateModule,
    MatDatepickerModule,
    NgbTimepickerModule,
    FormsModule,
    MatButtonModule,
    NgxSpinnerModule
  ]
})
export class AssignmentModule { }
