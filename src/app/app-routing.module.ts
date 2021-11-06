import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuard } from './shared/_guards/auth.guard';
import {FacultyGuard} from './shared/_guards/faculty.guard';
import {StudentGuard} from './shared/_guards/student.guard';
import { McqComponent } from './mcq/mcq.component';
import { SubjectiveComponent } from './subjective/subjective.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/exam-portal',
    pathMatch: 'full'
  },
  //admin/login
  {
    path: 'mcq',
    component: McqComponent,
    canActivate: [StudentGuard]
  },
  {
    path: 'subjective',
    component: SubjectiveComponent,
    canActivate: [StudentGuard]
  },
  /*{
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full',
  },
  */
  //, canActivate: [AuthGuard]
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES },
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
  {
    path: '**',
    redirectTo: 'pages/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
