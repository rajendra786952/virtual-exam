import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FacultyService } from '../../../shared/services/faculty.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  constructor(private route: Router,private cdRef: ChangeDetectorRef,
    private toster:ToastrService,private facultyService:FacultyService) { }
  postlist=[];
  ngOnInit(): void {
    this.getPost();
  }
  ngAfterViewInit() {
   
  }
  getPost(){
    this.facultyService.getPost().subscribe((res:any)=>{
      if(res){
        console.log(res);
        if(typeof(res.response)=='string'){
          this.toster.success('',res.response, {
            positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500,timeOut:2000
          });
          this.cdRef.detectChanges();
        }
        else{
          /*res.response.map((x:any)=>{
            let date=x.createdAt.split(' ');
            x.date=date[0];
            x.time=date[1];
            //return x;
          })
          */
          this.postlist=res.response;
          this.cdRef.detectChanges();
        }
      }
    },
    error =>{
      console.log(error);
    }) 
  }
  newPost() {
    this.route.navigate(['exam-portal/faculty/post/new']);
  }

}
