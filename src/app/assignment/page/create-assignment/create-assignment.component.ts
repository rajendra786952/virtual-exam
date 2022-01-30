import { DatePipe, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from '../../../shared/services/branch.service';
import { FacultyService } from '../../../shared/services/faculty.service';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.scss']
})
export class CreateAssignmentComponent implements OnInit {
assignMentForm:FormGroup;
mindate=new Date();
branch = [];
subject=[];
pdffile=null;
time = { hour: 0, minute: 0 };
time1 = { hour: 0, minute: 0 }
showtime = false;
showtime1 = false;
tvalidation = false;
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
   this.assignMentForm=this.fb.group({
     title:['',Validators.required],
     content:['',Validators.required],
     createdBy:[sessionStorage.getItem('username'),Validators.required],
     assignTime:['',Validators.required],
     time1:['',Validators.required],
     dueTime:['',Validators.required],
     time2:['',Validators.required],
     attachment:['',Validators.required],
     sem:['',Validators.required],
     branch:['',Validators.required],
     section:['',Validators.required],
     subjectCode:['',Validators.required],
     marks:['',Validators.required],
   })
  }
  goback(){
  this.location.back();
  }
  digit(v) {

    var pattern = /[0-9]/;
    if (v.data != null && v.data.match(pattern)) {

    }
    else {
      v.target.value = '';
    }
  }
  onSelectFile(event){
    console.log(event.target.files);
    if(event.target.files.length >0){
      this.assignMentForm.get('attachment').setValue(event.target.files[0]);
      this.pdffile=event.target.files[0].name;
    }
    /*this.temporaryFile=fileList[0];
    let fileReader: FileReader = new FileReader();
    fileReader.onloadend =  () => {
     console.log(fileReader.result);
     this.imgDataUrl=fileReader.result;
   }
   fileReader.readAsDataURL(fileList[0]);
   */
   }
   timer1(value: any) {
    if (this.time1.minute < 10 && this.time1.hour < 10) {
      this.assignMentForm.get('time2').setValue('0' + this.time1.hour + ':' + '0' + this.time1.minute)
    }
    else if (this.time1.hour < 10) {
      this.assignMentForm.get('time2').setValue('0' + this.time1.hour + ':' + this.time1.minute)
    }
    else if (this.time1.minute < 10) {
      this.assignMentForm.get('time2').setValue(this.time1.hour + ':' + '0' + this.time1.minute)
    }
    else {
      this.assignMentForm.get('time2').setValue(this.time1.hour + ':' + this.time1.minute)
    }

  }

  timer(value: any) {
    if (this.time.minute < 10 && this.time.hour < 10) {
      this.assignMentForm.get('time1').setValue('0' + this.time.hour + ':' + '0' + this.time.minute)
    }
    else if (this.time.hour < 10) {
      this.assignMentForm.get('time1').setValue('0' + this.time.hour + ':' + this.time.minute)
    }
    else if (this.time.minute < 10) {
      this.assignMentForm.get('time1').setValue(this.time.hour + ':' + '0' + this.time.minute)
    }
    else {
      this.assignMentForm.get('time1').setValue(this.time.hour + ':' + this.time.minute)
    }

  }
  remove() {
    this.assignMentForm.get('time1').setValue(null);
  }

  remove1() {
    this.assignMentForm.get('time2').setValue(null);
  }

  hide() {
    this.showtime = false;
  }
  hide1() {
    this.showtime1 = false;
  }
  setTime() {
    this.showtime1 = false;
    this.showtime = true;
  }

  setTime1() {
    this.showtime = false;
    this.showtime1 = true;
  }
  submit(){
    console.log(this.assignMentForm);
    console.log(this.assignMentForm.value);
    this.tvalidation = false;
    var h = Math.floor(this.time.hour);
    var m = this.time.minute;
    console.log(h + "  " + m);
    if (this.assignMentForm.get('assignTime').value.getDate() == this.assignMentForm.get('dueTime').value.getDate()) {
      if (this.time1.hour < h) {
        this.tvalidation = true;
        return;
      }
      else if (this.time1.hour == h && this.time1.minute < m) {
        this.tvalidation = true;
        return;
      }
    }
    if(this.assignMentForm.invalid)
     return ;
     this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    let req=this.assignMentForm.value;
    req.assignTime = this.datePipe.transform(req.assignTime, 'yyyy-MM-dd') + " " + req.time1;
    req.dueTime = this.datePipe.transform(req.dueTime, 'yyyy-MM-dd') + " " + req.time2;
    delete req.time1;
    delete req.time2  
     let formData=new FormData()
     Object.keys(req).forEach((value,index)=>{
       console.log(req[value]);
       formData.append(value,req[value])
     });
    this.facultyService.createAssignment(formData).subscribe((res:any)=>{
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
}
