import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'app/shared/services/student.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  loader=false;
  //question:any;
question:any;
  
  constructor(private location:Location,private activeRoute:ActivatedRoute,private student:StudentService,
    private spinner: NgxSpinnerService,private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.testid=this.activeRoute.snapshot.params['id'];
    if(this.testid!=null && this.testid!=undefined && this.testid!=''){
      this.getPastTest(this.testid);
    }
  }
  
  ngOnDestroy(){
    sessionStorage.removeItem('type');
  }
  goback(){
    this.location.back();
  }
  getPastTest(v){
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.student.getPastTestView(v).subscribe((res:any)=>{
      if(res){
        console.log(res);
        this.question=res.response;
        setTimeout(()=>{
          this.spinner.hide();
          this.loader=true;
        },2000)
        this.cdr.detectChanges();
      }
    },
    error =>{
      this.spinner.hide();
      console.log(error);
    });
  }

   check(i,j,k){
    if(this.question[i].correctOption==j){

    }
    else{
      $('#'+k+i).prop('checked', false);
    }
  }
}
