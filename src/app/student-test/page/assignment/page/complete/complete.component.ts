import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../../../../shared/services/student.service';
@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {
  displayedColumns: string[] = ['s_no','title','subjectCode','assignTime','dueTime','lateSubmission','maxMarks','marks']
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private route: Router,private cdRef: ChangeDetectorRef,
    private toster:ToastrService,private studentService:StudentService) { }

  ngOnInit(): void {
    this.getAssignment();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getAssignment(){
    this.studentService.getAssignmentsComplete().subscribe((res:any)=>{
      if(res){
        console.log(res);
        if(typeof(res.response)=='string'){
          this.toster.success('',res.response, {
            positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500,timeOut:2000
          });
          this.cdRef.detectChanges();
        }
        else if(res.response.length == 0){
          this.toster.success('','Completed Assignment Not Found', {
            positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500,timeOut:2000
          });
          this.cdRef.detectChanges();
        }
        else{
          this.dataSource=res.response;
          this.cdRef.detectChanges();
        }
      }
    },
    error =>{
      console.log(error);
    }) 
  }

}
