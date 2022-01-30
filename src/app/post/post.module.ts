import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './page/post-list/post-list.component';
import { CreatePostComponent } from './page/create-post/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [PostListComponent, CreatePostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgSelectModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    NgxSpinnerModule
  ]
})
export class PostModule { }
