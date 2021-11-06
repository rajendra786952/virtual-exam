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
    return this.http.post(environment.API_URL+'admin/add_student',data);
}
getStudentTest(id){
    return this.http.get(environment.API_URL+'student/'+id+'/tests');
}
StudentLogin(data){
    return this.http.post(environment.API_URL+'student/login',data);
}
Testauth(data){
    return this.http.post(environment.API_URL+'student/authenticate_test',data);
}
getTest(){
    return this.http.get(environment.API_URL+'student/test/'+sessionStorage.getItem('testId'));
}
sendTestAnswer(data){
    return this.http.post(environment.API_URL+'student/test/mcq_answer',data);
}
sendSubjectiveTestAnswer(data){
    return this.http.post(environment.API_URL+'student/test/sub_answer',data);
}
getStudentPastTest(){
    return this.http.get(environment.API_URL+'student/'+sessionStorage.getItem('roll')+'/tests/past');
}
deletestudent(email){
    return this.http.delete(environment.API_URL+'admin/remove/student/'+email);
   }
getPastTestView(v){
    return this.http.get(environment.API_URL+'student/test/'+v+'/rollNo/'+sessionStorage.getItem('roll'));
   }
addStudentCsv(data){
    return this.http.post(environment.API_URL+'admin/add_students',data);
   }
getStudentbysearch(v){
    return this.http.get(environment.API_URL+'student/'+v+'/tests/past');
   }
   getPastTestViewbyroll(id,roll){
    return this.http.get(environment.API_URL+'student/test/'+id+'/rollNo/'+roll);
   }
checkPastReasult(id){
    return this.http.get(environment.API_URL+'student/test/'+id+'/result_available');
}
getStaticsticData(data){
    let param=new HttpParams();
    for(let i in data){
        param=param.append(i,data[i]);
    }
    return this.http.get(environment.API_URL+'student/tests/stats',{params:param});
}

}