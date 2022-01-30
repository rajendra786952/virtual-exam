import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../shared/services/student.service';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import { SpeedTestService } from 'ng-speed-test';
import arrayShuffle from 'array-shuffle';
import { NgOpenCVService, OpenCVLoadResult } from 'ng-open-cv';
import { tap, switchMap, filter } from 'rxjs/operators';
import { forkJoin, Observable,  BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

declare var $;
declare var cv;
@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.scss']
})
export class McqComponent implements OnInit ,OnDestroy{
  elem;
  status="runing";
  testStatus=false;
  timestatus=true;
  statusactive;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  mcq:any;
  coutSwitchTab=0;
  display = "none";
  @ViewChild("video")
  public video: ElementRef;
  @ViewChild("video")
  public video1: ElementRef;
  @ViewChild('canvasInput')
  canvas: ElementRef;
  error:any;
  faceStatus=false;
  clearInterval;
  faceContainerStatus=true;
  stream;
  private classifiersLoaded = new BehaviorSubject<boolean>(false);
  classifiersLoaded$ = this.classifiersLoaded.asObservable();
  constructor(private student:StudentService,private cdr:ChangeDetectorRef,private toastr:ToastrService,
    private router:Router,@Inject(DOCUMENT) private document: Document,private speedTestService:SpeedTestService,
    private ngOpenCVService: NgOpenCVService,private toaster:ToastrService) {   
  }
 @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }
  
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(e: KeyboardEvent) {
    console.log(e);
    if(e.ctrlKey){
      return ;
    }
    if(e.altKey){
     return;
    }
    if(e.metaKey){
      return ;
    }
    if(e.shiftKey){
      return ;
    }
  }
  @HostListener('keydown', ['$event']) keyInput(e: KeyboardEvent) {
    e.preventDefault();
    console.log(e);
  } 
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }
  @HostListener('mousedown', ['$event']) blockdown(e: KeyboardEvent) {
    e.preventDefault();
  }
  @HostListener('selectstart', ['$event']) blockselect(e: KeyboardEvent) {
    e.preventDefault();
  }
  
  ngOnInit(): void {
   this.ngOpenCVService.isReady$
      .pipe(
        filter((result: OpenCVLoadResult) => result.ready),
        switchMap(() => {
        
          return this.loadClassifiers();
        })
      )
      .subscribe(() => {
        this.classifiersLoaded.next(true);
      });
      
  }
  getInitFunction(){
   this.gettestquestion();
   this.elem = document.documentElement;
   this.getpop();
   this.fullscreen();
   this.offline();
   this.active();
  }
  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {

         this.stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (this.stream) {
          this.video.nativeElement.srcObject = this.stream;
          this.video.nativeElement.play();
          this.error = null;
         this.clearInterval=setInterval(()=>{
            this.capture();
          },10000);
          
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
        console.log(e);
      }
    }
  }
  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    //console.log(this.canvas.nativeElement.toDataURL("image/png"));
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, 640, 480);
      this.detectFace();
  }
  loadClassifiers(): Observable<any> {
    return forkJoin(
      this.ngOpenCVService.createFileFromUrl(
        'haarcascade_frontalface_default.xml',
        `assets/opencv/data/haarcascades/haarcascade_frontalface_default.xml`
      ),
      this.ngOpenCVService.createFileFromUrl(
        'haarcascade_eye.xml',
        `assets/opencv/data/haarcascades/haarcascade_eye.xml`
      )
    );
  }
  detectFace() {

    this.ngOpenCVService.isReady$
      .pipe(
        filter((result: OpenCVLoadResult) => result.ready),
        switchMap(() => {
          return this.classifiersLoaded$;
        }),
        tap(() => {
          this.findFaceAndEyes();
        })
      )
      .subscribe(() => {
        console.log('Face detected');
      });
  }
  findFaceAndEyes() {
    
    const src = cv.imread(this.canvas.nativeElement.id);
    
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    const faces = new cv.RectVector();
    const eyes = new cv.RectVector();
    
    const faceCascade = new cv.CascadeClassifier();
    const eyeCascade = new cv.CascadeClassifier();
    // load pre-trained classifiers, they should be in memory now
    faceCascade.load('haarcascade_frontalface_default.xml');
    eyeCascade.load('haarcascade_eye.xml');
    // detect faces
    const msize = new cv.Size(0, 0);
    faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
    console.log(faces.size());
    if(faces.size()>0){
     this.faceStatus=true;
     setTimeout(()=>{
      clearInterval(this.clearInterval);
      this.getInitFunction();
      this.faceContainerStatus=false;
     },2000);
    }
    for (let i = 0; i < faces.size(); ++i) {
      const roiGray = gray.roi(faces.get(i));
      const roiSrc = src.roi(faces.get(i));
      const point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
      const point2 = new cv.Point(faces.get(i).x + faces.get(i).width, faces.get(i).y + faces.get(i).height);
      cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
      console.log(point1);
      console.log(point2);
      // detect eyes in face ROI
      eyeCascade.detectMultiScale(roiGray, eyes);
      for (let j = 0; j < eyes.size(); ++j) {
        const point3 = new cv.Point(eyes.get(j).x, eyes.get(j).y);
        const point4 = new cv.Point(eyes.get(j).x + eyes.get(j).width, eyes.get(j).y + eyes.get(j).height);
        cv.rectangle(roiSrc, point3, point4, [0, 0, 255, 255]);
        console.log(point3);
        console.log(point4);
      }
      roiGray.delete();
      roiSrc.delete();
    }
    cv.imshow(this.canvas.nativeElement.id, src);
    src.delete();
    gray.delete();
    faceCascade.delete();
    eyeCascade.delete();
    faces.delete();
    eyes.delete();
  }
 
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  active(){

    this.statusactive=setInterval(()=>{
    if(!document.hasFocus()){
     swal.fire({
        title: "Do not switch a Tab",
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false,
      })
      this.coutSwitchTab++;
    }
    if(this.coutSwitchTab>5){
      document.exitFullscreen();
      setTimeout(()=>{
        this.router.navigate(['exam-portal/student/test']);
      },1000);
    }
    },1000);
    
  }

    offline(){
      window.addEventListener('offline', (event) => {
        swal.fire({
          title: "Your are offline check your network connection",
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false,
        })
       });
    }
  

  show_network(){
    this.speedTestService.getMbps().subscribe(
      (speed) => {
        if(Math.round(speed)<2){
          swal.fire({
            title: "Your network speed is too slow check your network connection",
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false,
          })      
        }
        else{
          console.log('Your speed is ' +Math.floor(speed));
        }
      }
    );
  }

   getpop(){
    swal.fire({
      title: "Start Test",
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false,
    }).then((result)=>{
      if(result){
        this.full();
        this.testStatus=true;
        if(this.timestatus){
          setTimeout(()=>{
           this.show_network();
          },10000);
          this.countdown.config.leftTime=parseInt(sessionStorage.getItem('time'))*60;
          if(parseInt(sessionStorage.getItem('time'))>60){
            this.countdown.config.format='HH:mm:ss';
          }
          else{
            this.countdown.config.format='mm:ss';
          }
          this.countdown.restart();
          setTimeout(()=>{
            this.show_network();
           },((this.countdown.config.leftTime*1000)-5000));
         }
      }
    });
   }


  full(){
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
   
  }

gettestquestion(){
  this.student.getTest().subscribe((res:any)=>{
    if(res){
      console.log(res.response);
      res.response.map((v)=>{
      v.show=false;
      v.rollNo=sessionStorage.getItem("roll");
      v.answer=null;
      v.visit=false;
      return v;
      });
      console.log(res.response);
      this.mcq=arrayShuffle(res.response);
      this.mcq[0].show=true;
      this.cdr.detectChanges();
    }
  },
  error =>{
    console.log(error);
    this.toaster.error('',error.error.response, {
      positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
    });
  })
}
  prev(j){
    //console.log(j);
    this.mcq[j].show=false;
    this.mcq[j-1].show=true;
  }
  next(j){
    this.mcq[j].show=false;
    this.mcq[j+1].show=true;
  }

  setquestion(j){
    for(let i of this.mcq){
      i.show=false;
    }
    this.mcq[j].show=true;
    }

  submit(){
   console.log(this.mcq);
   const req=[];
   this.mcq.map((x)=>{
    req.push({
      answer:x.answer,
      rollNo:x.rollNo,
      testId:x.testId,
      questionId:x.questionId
    });
   });
   console.log(req);
   this.student.sendTestAnswer(req).subscribe((res:any)=>{
     if(res){
      this.status="finish";
      document.exitFullscreen();
      this.toastr.success('',"Test submitted ", {
        positionClass: 'toast-bottom-center', closeButton: true , "easeTime": 500
       });
       sessionStorage.removeItem('testId');
       this.router.navigate(['exam-portal/student/test']);
     }
   },
   error =>{
     console.log(error);
     this.toastr.show('','Test Invalid', {
      positionClass: 'toast-bottom-center', closeButton: true , "easeTime": 500
    });
   })

  }

  setAnswer(v,j){
    this.mcq[j].visit=true;
    this.mcq[j].answer=v.target.value;
    this.cdr.detectChanges();
  }

  clearOption(j){
    this.mcq[j].answer=null;
    $('.form-check-input'+j).prop('checked', false);
    this.cdr.detectChanges();
  }

  fullscreen(){
    document.addEventListener('fullscreenchange', (event) => {
      if (document.fullscreenElement==null && this.status=="runing") {
        this.timestatus=false;
        this.getpop();
      }
    });
  }
  
  ngOnDestroy(){
    document.exitFullscreen();
   clearInterval(this.statusactive);
    sessionStorage.removeItem('testId');
    sessionStorage.removeItem('time');
  
  }
  
  handleEvent(event){
  
    console.log(event);
    if(event.action=='done' && this.testStatus){
      swal.fire({
        title: "Test Was Submitted",
        timer:3000,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false,
      }
      );
      this.submit();
     
    }
}
}
