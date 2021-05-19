import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LoginsignupService {

  admin=false;

  constructor(private http:HttpClient,private route:Router) { }

  login(body:any):Observable<any>{
    return this.http.post(`${environment.apibaseUrl}/auth`,body,httpOptions);
  }

  signup(body:any):Observable<any>{
    return this.http.post(`${environment.apibaseUrl}/subs`,body,httpOptions)
  }

  getname():Observable<any>{
    
    return this.http.get(`${environment.apibaseUrl}/name`)
  }

  isLoggedin(){
    return !!localStorage.getItem('token');
  }

  gettoken(){
    return localStorage.getItem('token');
  }

  getcredentials(){
    this.http.get(`${environment.apibaseUrl}/credentials`).subscribe((res:any) => {
      if(res.response.substring(1,6) == 'ADMIN'){
        
        localStorage.setItem('admin','true')
         this.admin = true;
      }else{
         this.admin=false;
      }
    })
  }


 isadmin(){
  
  return !!localStorage.getItem('admin')
    
    
  }


  logout(){
    localStorage.removeItem('token')
    if(localStorage.getItem('admin')){
      localStorage.removeItem('admin')
    }
    this.route.navigate(['/'])
  }

}
