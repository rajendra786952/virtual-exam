import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../../shared/services/student.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private route: Router,private cdRef: ChangeDetectorRef,
  private toster:ToastrService,private studentService:StudentService) { }
  postlist=[];
  ngOnInit(): void {
    this.getPost();
  }
  ngAfterViewInit() {
   
  }
  getPost(){
    this.studentService.getPost().subscribe((res:any)=>{
      if(res){
        console.log(res);
        if(typeof(res.response)=='string'){
          this.toster.success('',res.response, {
            positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500,timeOut:2000
          });
          this.cdRef.detectChanges();
        }
        else{
         /* res.response.map((x:any)=>{
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
 


}
