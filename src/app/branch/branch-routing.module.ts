import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchaddComponent } from './page/branchadd/branchadd.component';
import { BranchlistComponent } from './page/branchlist/branchlist.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'list'
  },
  {
    path:'new',
    component:BranchaddComponent
  },
  {
    path:'list',
    component:BranchlistComponent
  },
 {
   path:'edit',
   component:BranchaddComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
