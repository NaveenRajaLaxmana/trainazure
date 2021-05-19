import { Injectable,Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';
import { LoginsignupService } from '../login/loginsignup.service'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService  implements HttpInterceptor{

  constructor(private injector:Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(req.url == `${environment.apibaseUrl}/auth` || req.url == `${environment.apibaseUrl}/subs` || req.url == `${environment.apibaseUrl}/getalltrainlist` || req.url == `${environment.apibaseUrl}/traininfo/:id`){
      console.log('in if block')
      return next.handle(req);
    }
    console.log('token intercept')
    
    let authservice = this.injector.get(LoginsignupService)
    let tokenizedRequest = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': authservice.gettoken()
      }
    })
    return next.handle(tokenizedRequest);
  }
}
