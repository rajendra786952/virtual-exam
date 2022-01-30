import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentComponent } from './page/assignment/assignment.component';
import { CreateAssignmentComponent } from './page/create-assignment/create-assignment.component';
import { PastAssignmentComponent } from './page/past-assignment/past-assignment.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path:'new',
    component:CreateAssignmentComponent
  },
  {
    path:'list',
    component:AssignmentComponent,
  },
  {
    path:'past',
    component:PastAssignmentComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule { }
