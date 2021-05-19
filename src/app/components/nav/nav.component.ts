import { Component, OnInit } from '@angular/core';
import { LoginsignupService } from '../../services/login/loginsignup.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private loginservice:LoginsignupService) { }

  username=''
  isadmin:boolean
  ngOnInit(): void {
    if(this.loginservice.isLoggedin()){
      this.show=true
      
    }
    this.isadmin= localStorage.getItem('admin') ? true : false
    this.loginservice.getname().subscribe(res => {
      
      if(res.response){
      this.username = res.response
      
      }
      
    });
    
  }
show=false

}
