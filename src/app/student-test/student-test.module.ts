import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TestComponent } from './page/test/test.component';
import { RouterModule, Routes } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {  MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PastTestComponent } from './page/past-test/past-test.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ViewPastTestComponent } from './page/view-past-test/view-past-test.component';
import { StaticsticComponent } from './page/staticstic/staticstic.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PostComponent } from './page/post/post.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AssignmentComponent } from './page/assignment/assignment.component';
import { OngoingComponent } from './page/assignment/page/ongoing/ongoing.component';
import { MissedComponent } from './page/assignment/page/missed/missed.component';
import { CompleteComponent } from './page/assignment/page/complete/complete.component';
const route:Routes=[
  {
    path:'test',
    component:TestComponent
  },
  {
    path:'past-test',
    component:PastTestComponent
  },
  {
    path:'past-test/:id',
    component:ViewPastTestComponent
  },
  {
    path:'stats',
    component:StaticsticComponent
  },
  {
    path:'post',
    component:PostComponent
  },
  {
    path:'assignment/ongoing',
    component:OngoingComponent,
  },
  {
    path:'assignment/missed',
    component:MissedComponent,
  },
  {
    path:'assignment/complete',
    component:CompleteComponent,
  }
]

@NgModule({
  declarations: [TestComponent, PastTestComponent, ViewPastTestComponent,StaticsticComponent, PostComponent,
     AssignmentComponent,OngoingComponent,MissedComponent,CompleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgApexchartsModule,
    NgSelectModule,
    NativeDateModule,
    MatDatepickerModule,
    NgxSpinnerModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule
  ],
  providers: [DatePipe]
})
export class StudentTestModule { }
