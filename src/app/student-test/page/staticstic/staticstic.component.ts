import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit,ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'app/shared/services/student.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { ToastrService } from 'ngx-toastr';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  
};
export type ChartOptions1 ={
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-staticstic',
  templateUrl: './staticstic.component.html',
  styleUrls: ['./staticstic.component.scss']
})
export class StaticsticComponent implements OnInit {
  subjective = [{ name: 'MCQ', value: 'mcq' }, { name: 'Theory', value: 'subjective'},{name:'Both',value:'both'}];
  subject=[];
  filter:FormGroup;
  todayDate = new Date();
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions1: Partial<ChartOptions1>;
  staticbool=false;
  constructor(private fb:FormBuilder, private studentService:StudentService,
     private datePipe: DatePipe, public toastr: ToastrService,private cdr:ChangeDetectorRef) {
    this.chartOptions = {
      series: [],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        title:{
         text:'Test'
        },
        categories: [],
      },
      yaxis: {
        title: {
          text: "Percentage"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            console.log(val);
            return  ''+val;
          }
        }
      }
    };


    this.chartOptions1 = {
      series: [],
      chart: {
        height: 400,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Percentage",
        align: "center"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
          title:{
           text:'Test'
          },
        categories: []
      }
    };

   }

  ngOnInit(): void {
   this.initform();
   this.getSubject();
  }
  initform(){
   this.filter=this.fb.group({
    subject:['',Validators.required],
    type:['',Validators.required],
    from:['',Validators.required],
    to:['',Validators.required],
   })
  }
  getSubject(){
    this.studentService.getSubjectByRollNumber(sessionStorage.getItem('roll')).subscribe((res:any)=>{
      if(res){
        //console.log(res);
        let ar=[{name:'ALL'}];
        res.response.map((x:any)=>{
           ar.push({name:x});
        })
      this.subject=ar;
      console.log(this.subject);
      }
    },
    error =>{
      console.log(error);
    })
    
  }
  submit(){
    console.log(this.filter.value);
   if(this.filter.invalid){
     return;
   }
   let obj=Object.assign({},this.filter.value,{rollNo:sessionStorage.getItem('roll')});
   console.log(obj);
   obj.subject=obj.subject.toUpperCase();
   obj.from = this.datePipe.transform(obj.from, 'yyyy-MM-dd') + " 00:00:00";
   obj.to = this.datePipe.transform(obj.to, 'yyyy-MM-dd') + " 23:59:59";
   console.log(obj.from);
   console.log(obj.to);
   this.studentService.getStaticsticData(obj).subscribe((res:any)=>{
     if(res){
      if(res.response.averagePercent.length==0 || res.response.userPercent.length==0){
        this.toastr.show('', 'Data not available', {
          positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
        });
         return ;
       }
       this.staticbool=true;
       console.log(res);
       this.chartOptions.series=[
        {
          name: "Average",
          data: res.response.averagePercent
        },
        {
          name: "You",
          data: res.response.userPercent
        },
      ];
      this.chartOptions.xaxis.categories=res.response.titles;
      this.chartOptions1.series=[
        {
          name: "Average",
          data: res.response.averagePercent
        },
        {
          name: "You",
          data: res.response.userPercent
        },
      ];
      this.chartOptions1.xaxis.categories=res.response.titles;
      this.cdr.detectChanges();
     }
   }, error =>{
     this.staticbool=false
     this.toastr.error('',error.error.response,{
      positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
    });
     console.log(error);
   })
  }
}








