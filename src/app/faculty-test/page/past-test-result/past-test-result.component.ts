import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyService } from 'app/shared/services/faculty.service';

@Component({
  selector: 'app-past-test-result',
  templateUrl: './past-test-result.component.html',
  styleUrls: ['./past-test-result.component.scss']
})
export class PastTestResultComponent implements OnInit {
 displayedColumns: string[] = ['s_no','name','rollNo'];
 displayedColumns1: string[] = ['s_no','name','rollNo','score','Action'];
  dataSource = new MatTableDataSource<any>();
  dataSource1 = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
constructor(private location:Location,private activeRoute:ActivatedRoute,
  private faculty:FacultyService,private route:Router,private cdr:ChangeDetectorRef) { }
testid;

  ngOnInit(): void {
    this.testid=this.activeRoute.snapshot.params['id'];
    if(this.testid!=null && this.testid!=undefined && this.testid!=''){
      this.getPastTestresult(this.testid);
    }
    
  }
  getPastTestresult(v){
    this.faculty.pastTestResult(v).subscribe((res:any)=>{
      if(res){
        var present=[];
        var absent=[];
        res.response.map((x)=>{   
          if(x.isPresent){
            present.push(x);
          }
          else{
            absent.push(x);
          }
        });
        this.dataSource=new MatTableDataSource(absent);
        this.dataSource1=new MatTableDataSource(present);
        this.cdr.detectChanges();
      }
    },
    error =>{
      console.log(error);
    })
  }
  goback(){
    this.location.back();
  }

  view(v){
      this.route.navigate(['exam-portal/faculty/past-test/',this.testid,v]);  
  }
}
