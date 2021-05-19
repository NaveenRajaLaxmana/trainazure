import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginsignupService } from '../services/login/loginsignup.service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth:LoginsignupService,private route:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.isadmin() && this.auth.isLoggedin()){
      return true
    }else{
    //  alert('only for admin')
      return this.route.navigate(['/login'])
    }
  }
  
}
