import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ErrorPageComponent } from "./error/error-page.component";

import { LoginPageComponent } from "./login/login-page.component";

import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: 'Error Page'
        }
      },  
      {
        path:'exam-portal',
        component:HomeComponent
      },  
      {
        
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login Page'
        }
      },  
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
