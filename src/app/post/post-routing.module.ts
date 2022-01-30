import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './page/create-post/create-post.component';
import { PostListComponent } from './page/post-list/post-list.component';

const routes: Routes = [
  {
   path:'',
   redirectTo:'list',
   pathMatch:'full'
  },
  {
    path:'list',
    component:PostListComponent
  },
  {
    path:'new',
    component:CreatePostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
