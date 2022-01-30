import { Injectable } from "@angular/core";
import {environment} from '../../../environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})

export class StudentService{
 constructor(private http: HttpClient){

 }

 getStudentList():Observable<any>{
    return this.http.get(environment.API_URL+'admin/all/students');
}
addStudent(data):Observable<any>{
    return this.http.post(environment.API_URL+'admin/add/student',data);
}
getStudentTest(id){
    return this.http.get(environment.API_URL+'student/'+id+'/tests');
}
StudentLogin(data){
    return this.http.post(environment.API_URL+'student/login',data);
}
Testauth(data){
    return this.http.post(environment.API_URL+'test/authenticate',data);
}
getTest(){
    return this.http.get(environment.API_URL+'test/'+sessionStorage.getItem('testId'));
}
sendTestAnswer(data){
    return this.http.post(environment.API_URL+'test/submit/mcq',data);
}
sendSubjectiveTestAnswer(data){
    return this.http.post(environment.API_URL+'test/submit/subjective',data);
}
getStudentPastTest(){
    return this.http.get(environment.API_URL+'student/'+sessionStorage.getItem('roll')+'/past_tests');
}
deletestudent(email){
    let param=new HttpParams()
    .set('email',email)
    return this.http.delete(environment.API_URL+'admin/delete/student',{params:param});
   }
getPastTestView(v){
    return this.http.get(environment.API_URL+'student/'+sessionStorage.getItem('roll')+'/test/'+v+'/result');
   }
addStudentCsv(data){
    return this.http.post(environment.API_URL+'admin/add/students',data);
   }
getStudentbysearch(v){
    return this.http.get(environment.API_URL+'student/'+v+'/past_tests');
   }
   getPastTestViewbyroll(id,roll){
    return this.http.get(environment.API_URL+`student/${roll}/test/${id}/result`);
   }
checkPastReasult(id){
    return this.http.get(environment.API_URL+'test/'+id+'/result_available');
}
getStaticsticData(data){
    let param=new HttpParams();
    for(let i in data){
        param=param.append(i,data[i]);
    }
    return this.http.get(environment.API_URL+'test/stats',{params:param});
}
getSubjectByRollNumber(rollNumber){
    return this.http.get(environment.API_URL+'student/subjects?rollNo='+rollNumber); 
}
getPost(){
    return this.http.get(environment.API_URL+'student/'+sessionStorage.getItem('roll')+'/posts');
}
 getAssignmentsOngoing(){
    return this.http.get(environment.API_URL+'student/'+sessionStorage.getItem('roll')+'/assignments/ongoing');
 }
 getAssignmentsMissed(){
    return this.http.get(environment.API_URL+'student/'+sessionStorage.getItem('roll')+'/assignments/missed');
 }
 getAssignmentsComplete(){
    return this.http.get(environment.API_URL+'student/'+sessionStorage.getItem('roll')+'/assignments/completed');
 }
 submitAssignment(data){
    return this.http.post(environment.API_URL+'student/'+sessionStorage.getItem('roll')+'/assignment/submission',data);
 }
}