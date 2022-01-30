import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {BranchService} from '../../../shared/services/branch.service';
@Component({
  selector: 'app-branchadd',
  templateUrl: './branchadd.component.html',
  styleUrls: ['./branchadd.component.scss']
})
export class BranchaddComponent implements OnInit ,OnDestroy{
  branchForm:FormGroup;
  branchData;
  constructor(private location:Location,private fb:FormBuilder,private branchSErvice:BranchService,
    public toastr: ToastrService,private activateRoute:ActivatedRoute) { }
  ngOnDestroy(): void {
    sessionStorage.removeItem('edit-branch'); 
  }

  ngOnInit(): void {
    this.initForm();
    console.log(sessionStorage.getItem('edit-branch'))
    if(sessionStorage.getItem('edit-branch')){
      this.branchData=JSON.parse(sessionStorage.getItem('edit-branch'));
      console.log(this.branchData);
      this.branchForm.get('branch').setValue(this.branchData.branch);
      let sub=this.branchForm.get('sub') as FormArray;
      sub.clear();
      this.branchData.subjects.map((x:any)=>{
        sub.push(this.fb.group({sub_name :this.fb.control(x,Validators.required)}));
      });
    }
    
  }
  initForm(){
    this.branchForm=this.fb.group({
      branch:['',Validators.required],
      sub:this.fb.array([this.getFormGroup()])
    })
    console.log(this.branchForm);
  }

  getFormGroup():FormGroup{
    return this.fb.group({sub_name :this.fb.control('',Validators.required)});
  }
  addSubject(){
   let ar=this.branchForm.get('sub') as FormArray;
   ar.push(this.getFormGroup());
  }
  removeSub(index){
    let ar=this.branchForm.get('sub') as FormArray;
    ar.removeAt(index);
  }
  goback(){
  this.location.back();
  }
  submit(){
    
   console.log(this.branchForm.value);
   
   if(this.branchForm.invalid){
     return ;
   }
   let ar=[];
   this.branchForm.value.sub.map((x:any)=>{
     ar.push(x.sub_name);
   })
   let req={};
   req['branch']=this.branchForm.value.branch;
   req['subjects']=ar;
   console.log(req);
   if(this.branchData){
     req['branchId']=this.branchData.branchId;
    this.branchSErvice.updateBranch(req).subscribe((res:any)=>{
      console.log(res);
     if(res){
       console.log(res);
       this.toastr.success('Branch Update Successfull', res[0], {
        positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
      });
      this.goback();
     }
    },
    error =>{
      console.log(error);
      this.toastr.show('', error.response, {
        positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
      });
    })
   }
   else{
    this.branchSErvice.createBranch(req).subscribe((res:any)=>{
      console.log(res);
     if(res){
       console.log(res);
       this.toastr.success('Branch Created Successfull', res[0], {
        positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
      });
      
      this.goback();
     }
    },
    error =>{
      console.log(error);
      this.toastr.show('', error.response, {
        positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
      });
    })
   }
 
  }

}
