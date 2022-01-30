import { DatePipe, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from '../../../shared/services/branch.service';
import { FacultyService } from '../../../shared/services/faculty.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm:FormGroup;
  branch = [];
  subject=[];
  pdffile=null;
  sem = [{ name: 'First Semester', value: '1' }, { name: 'Second Semester', value: '2' }, { name: 'Third Semester', value: '3' }, { name: 'Fourth Semester', value: '4' }, { name: 'Fifth Semester', value: '5' },
  { name: 'Sixth Semester', value: '6' }, { name: 'Seventh Semester', value: '7' }, { name: 'Eighth Semester', value: '8' }]
  constructor(private fb:FormBuilder,private facultyService:FacultyService,private location:Location
    ,private branchService:BranchService,private cdRef:ChangeDetectorRef,
    private datePipe: DatePipe,private toastr: ToastrService,private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
   this.initForm();
   this.getBranch();
  }
  initForm(){
    this.postForm=this.fb.group({
      title:['',Validators.required],
      content:['',Validators.required],
      createdBy:[sessionStorage.getItem('username'),Validators.required],
      attachment:[''],
      sem:['',Validators.required],
      branch:['',Validators.required],
      section:['',Validators.required],
      subjectCode:['',Validators.required]
    })
   }
   goback(){
    this.location.back();
   }
   onSelectFile(event){
    console.log(event.target.files);
    if(event.target.files.length >0){
      this.postForm.get('attachment').setValue(event.target.files[0]);
      this.pdffile=event.target.files[0].name;
    }
   }
  getBranch() {
    this.branchService.getAllBranch().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.branch= res.response;
        this.cdRef.detectChanges();
      }
    },
      error => {
        console.log(error);
      })
  }
  
  setSubject(event:any){
   console.log(event);
   let subjectList=[];
   event.subjects.map((x:any)=>{
     subjectList.push({name:x,value:x});
   })
   this.subject=subjectList;
  }
submit(){
  console.log(this.postForm);
  console.log(this.postForm.value);
  if(this.postForm.invalid)
   return ;
   this.spinner.show(undefined,
    {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
   let req=this.postForm.value;
   if(req.attachment==null || req.attachment=='' || req.attachment==undefined)
     delete req.attachment;   
   let formData=new FormData()
   Object.keys(req).forEach((value,index)=>{
     console.log(req[value]);
     formData.append(value,req[value])
   });
  this.facultyService.createPost(formData).subscribe((res:any)=>{
    if(res){
      this.spinner.hide();
      console.log(res);
      this.toastr.success('', res.response, {
        positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
      });
      this.goback();
    }
  },
  error =>{
    this.spinner.hide();
    console.log(error);
  }) 
     }
}




  
  
  
