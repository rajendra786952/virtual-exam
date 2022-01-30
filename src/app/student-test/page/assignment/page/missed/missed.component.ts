import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../../../../shared/services/student.service';
@Component({
  selector: 'app-missed',
  templateUrl: './missed.component.html',
  styleUrls: ['./missed.component.scss']
})
export class MissedComponent implements OnInit {
  pdffile;
  assignmentlist=[]
    constructor(private studentService:StudentService,private toastr:ToastrService,private cdRef:ChangeDetectorRef) { }
  
    ngOnInit(): void {
      this.getAssignment();
    }
    getAssignment(){
      this.studentService.getAssignmentsMissed().subscribe((res:any)=>{
        if(res){
         console.log(res);
         if(typeof(res.response)=='string'){
          this.toastr.success('',res.response, {
            positionClass: 'toast-bottom-center', closeButton: true, "easeTime":500,timeOut:2000
          });
          this.cdRef.detectChanges();
        }
        else{
          this.assignmentlist=res.response;
          console.log(this.assignmentlist);
          this.cdRef.detectChanges();
        }
         
        }
      },
      error =>{
        console.log(error);
      })
    }
    onSelectFile(event){
      console.log(event.target.files);
      if(event.target.files.length >0){
        this.pdffile=event.target.files[0];
      }
    }
    submit(id){
      let formData=new FormData();
      formData.append('assignmentUniqueKey',id);
      formData.append('attachment',this.pdffile);
      this.studentService.submitAssignment(formData).subscribe((res:any)=>{
        if(res){
         console.log(res);
         this.getAssignment();
        }
      },
      error =>{
        console.log(error);
      })
    }
}
