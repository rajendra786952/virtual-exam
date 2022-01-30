import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'app/shared/services/student.service';
declare var $;
@Component({
  selector: 'app-view-past-test',
  templateUrl: './view-past-test.component.html',
  styleUrls: ['./view-past-test.component.scss']
})
export class ViewPastTestComponent implements OnInit,OnDestroy {
  show=sessionStorage.getItem('type');
  //show="MCQ";
  testid;
  roll;
  loader=false;
  //question:any;
question:any;
  
  constructor(private location:Location,private activeRoute:ActivatedRoute,
    private student:StudentService,private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.testid=this.activeRoute.snapshot.params['id'];
    this.roll = this.activeRoute.snapshot.params['roll'];
    if(this.testid!=null && this.testid!=undefined && this.testid!=''){
      this.getPastTest(this.testid,this.roll);
    }
  }
  
  ngOnDestroy(){
    sessionStorage.removeItem('type');
  }
  goback(){
    this.location.back();
  }
  getPastTest(v,v1){
    this.student.getPastTestViewbyroll(v,v1).subscribe((res:any)=>{
      if(res){
        console.log(res);
        this.question=res.response;
        this.loader=true;  
        this.cdr.detectChanges();
      }
    },
    error =>{
      this.loader=false; 
      console.log(error);
    });
  }
  check(i,j,k){
    if(this.question.ansList[i].answer==j-1){

    }
    else{
      $('#'+k+j).prop('checked', false);
    }
  }
}
