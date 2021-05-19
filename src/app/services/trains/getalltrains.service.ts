import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class GetalltrainsService {

  // trainsUrl:string = "http://localhost:8682/getalltrainlist";

  constructor(private http:HttpClient) { }

  getalltrains():Observable<any>{
    return this.http.get<any>(`${environment.apibaseUrl}/getalltrainlist`);
  }

  getallusers():Observable<any>{
    return this.http.get<any>(`${environment.apibaseUrl}/admin/getallusers`);
  }

  addtrain(body:any):Observable<any>{
    return this.http.post<any>(`${environment.apibaseUrl}/admin/addtrain`,body,httpOptions);
  }

  adduser(body:any){
    return this.http.post<any>(`${environment.apibaseUrl}/subs`,body,httpOptions);
  }

  deletetrain(id:any):Observable<any>{
    console.log(id)
    return this.http.delete<any>(`${environment.apibaseUrl}/deletetrain/${id}`);
  }

  deleteuser(id:any):Observable<any>{
    console.log(id)
    return this.http.delete<any>(`${environment.apibaseUrl}/deleteuser/${id}`);
  }

  gettraininfo(trainId):Observable<any>{
    return this.http.get<any>(`${environment.apibaseUrl}/traininfo/${trainId}`);
  }

  updatetrain(body:any):Observable<any>{
    console.log(body)
    return this.http.put<any>(`${environment.apibaseUrl}/updatetrain`,body,httpOptions);
  }

  getuserbyId(userid):Observable<any>{
    return this.http.get<any>(`${environment.apibaseUrl}/getuser/${userid}`)
  }

  updateuser(body:any):Observable<any>{
    return this.http.put<any>(`${environment.apibaseUrl}/updateuser`,body,httpOptions)
  }

  getfakedata():Observable<any>{
    return this.http.get<any>('http://jsonplaceholder.typicode.com/users')
  }

}
