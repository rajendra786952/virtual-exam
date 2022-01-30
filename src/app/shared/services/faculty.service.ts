import { Injectable } from "@angular/core";
import {environment} from '../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})

export class FacultyService{
 constructor(private http: HttpClient){

 }
   getFacultyList():Observable<any>{
       return this.http.get(environment.API_URL+'admin/all/faculties');
   }
   addFaculty(data):Observable<any>{
       return this.http.post(environment.API_URL+'admin/add/faculty',data);
   }
   createTestDetails(data){
    return this.http.post(environment.API_URL+'test/create',data);
   }
   login(data){
       return this.http.post(environment.API_URL+'faculty/login',data);
   }
   subjective(data){
    return this.http.post(environment.API_URL+'test/create/subjective',data);
   }
   mcq(data){
       return this.http.post(environment.API_URL+'test/create/mcq',data);
   }
   getTest(){
    return this.http.get(environment.API_URL+'faculty/'+sessionStorage.getItem('username')+'/tests');
   }
   deletefaculty(email){
    return this.http.delete(environment.API_URL+'remove/faculty/'+email);
   }
   getFacultyPastTest(){
    return this.http.get(environment.API_URL+'faculty/'+sessionStorage.getItem('username')+'/past_tests');
   }
   facultystatuschange(data){
    return this.http.post(environment.API_URL+'admin/change_faculty_access',data);
   }
   pastTestResult(data){
    return this.http.get(environment.API_URL+`test/${data}/attendance`);
   }
   getPastTestCheck(id,roll){
       return this.http.get(environment.API_URL+`student/${roll}/past_tests/${id}/answer`);
   }
   setPastTestScore(id,roll, data){
    return this.http.post(environment.API_URL+`student/${roll}/past_tests/${id}/check`, data);
   }
   addFacultyCsv(data){
    return this.http.post(environment.API_URL+'admin/add/faculties',data);
   }
   getAssignment(){
    return this.http.get(environment.API_URL+'faculty/'+sessionStorage.getItem('username')+'/assignments');
   }
   getAssignmentFile(id){  
  
    return this.http.get(environment.API_URL+'assignment/attachment/'+id);
   }
   getPastAssignment(){
    return this.http.get(environment.API_URL+'faculty/'+sessionStorage.getItem('username')+'/past_assignments');
   }
   createAssignment(data){
    return this.http.post(environment.API_URL+'assignment/create',data);
   }
   createPost(data){
    return this.http.post(environment.API_URL+'post/create',data);
   }
   getPost(){
    return this.http.get(environment.API_URL+'faculty/'+sessionStorage.getItem('username')+'/posts');
   }
   
}