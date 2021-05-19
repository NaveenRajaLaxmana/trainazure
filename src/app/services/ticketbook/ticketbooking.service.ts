import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class TicketbookingService {

  constructor(private http:HttpClient) { }

  bookticket(body:any):Observable<any>{
    return this.http.post(`${environment.apibaseUrl}/ticbook`,body,httpOptions);
  }

  useralltickets(username:any):Observable<any>{
    return this.http.get(`${environment.apibaseUrl}/gettic/${username}`);
  }

  getpdfticket(id){
    return this.http.get(`${environment.apibaseUrl}/ticket/${id}`,{ responseType: 'blob' });
  }

  gettraininfo(trainid:any):Observable<any>{
    return this.http.get(`${environment.apibaseUrl}/traininfo/${trainid}`);
  }
}
