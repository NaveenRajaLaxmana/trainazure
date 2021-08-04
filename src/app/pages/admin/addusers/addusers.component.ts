import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormArray} from '@angular/forms';
import { GetalltrainsService } from '../../../services/trains/getalltrains.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute,Router } from '@angular/router'

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.css']
})
export class AddusersComponent implements OnInit {

  roletype = ['ADMIN','USER'];

  adduserform = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('')
  })


  constructor(private trainservice:GetalltrainsService,private _snackBar: MatSnackBar,private activatedroute:ActivatedRoute,private route:Router) { }
  updateUser = false
  userId
  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
      
     
 this.userId= params['userId']
 if(params['userId']){

   this.updateUser = true
 }
      
    })
    this.trainservice.getuserbyId(this.userId).subscribe(user => {
      
      this.adduserform.patchValue({
        username: user.username,
        role: user.role
      })
      this.adduserform.get('username').disable()
    })
  }

  adduser(){
    this.trainservice.adduser(this.adduserform.value).subscribe(res => {
      if(res.response == "Success"){
        this.openSnackBar("User added","Done");
        this.adduserform.reset()
      }else{
        this.openSnackBar("Something went wrong","Done");
        this.adduserform.reset()
      }
    })
  }

  updateuser(){
    this.trainservice.updateuser(this.adduserform.value).subscribe(res => {
      if(res.response == "Success"){
        this.openSnackBar("User Updated","Done");
        this.adduserform.reset()
        this.route.navigate(['/admin/users'])
      }else{
        this.openSnackBar("Something went wrong","Done");
        this.adduserform.reset()
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
