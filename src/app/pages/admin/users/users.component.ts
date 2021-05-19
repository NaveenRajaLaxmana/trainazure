import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { GetalltrainsService } from '../../../services/trains/getalltrains.service'
import { Router } from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  Users = []
  dataSource;

  constructor(private userservice:GetalltrainsService,private route:Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userservice.getallusers().subscribe(users => {
      
      this.Users = users;
      
      this.dataSource = new MatTableDataSource(this.Users);
    })
  }

  displayedColumns: string[] = ['UserName', 'Role', 'UpdateUser', 'RemoveUser'];
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateUser(userId){
    this.route.navigate(['/admin/adduser'],{queryParams: { userId: userId }})
  }

  deleteUser(userId){
    this.userservice.deleteuser(userId).subscribe(res => {
      if(res.response == "Success"){
        this.openSnackBar("User Deleted","Done");
      }else{
        this.openSnackBar("Something went wrong","Done");
        
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}


