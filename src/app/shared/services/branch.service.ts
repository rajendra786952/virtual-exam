import { Injectable } from "@angular/core";
import {environment} from '../../../environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class BranchService{
 constructor(private http:HttpClient){

 }
 createBranch(data){
     return this.http.post(environment.API_URL+'admin/add/branch_subjects',data);
 }
 getAllBranch(){
    return this.http.get(environment.API_URL+'admin/all/branch_subjects');
 }
 updateBranch(data){
    return this.http.put(environment.API_URL+'admin/update/branch_subjects',data);
    
 }
 deletebranch(id){
     let param=new HttpParams()
     .set('branchId',id)
    return this.http.delete(environment.API_URL+'admin/delete/branch_subjects',{params:param});
 }

}



