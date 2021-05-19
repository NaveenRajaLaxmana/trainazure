import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { LoginsignupService } from '../../../services/login/loginsignup.service'
import { GetalltrainsService } from '../../../services/trains/getalltrains.service'
import { Router } from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.css']
})
export class TrainsComponent implements OnInit {

  Trains = []
  dataSource;
  constructor(private auth:LoginsignupService,private trains:GetalltrainsService,private route:Router,private _snackBar: MatSnackBar) { 
    
  }
  valueelement:HTMLScriptElement =(<HTMLScriptElement> document.getElementById('values')) 

  ngOnInit(): void {
    
    this.trains.getalltrains().subscribe(trains => {
     this.Trains=trains
      console.log(this.Trains)
      this.Trains.forEach(train => {
        let maindivchild = document.createElement('div');
        maindivchild.classList.add('value')
        maindivchild.style.display='flex'
        maindivchild.style.flexDirection='column'
        maindivchild.style.justifyContent='space-around'
       
        maindivchild.style.alignItems='center'
       

        let trainName = document.createElement('div')
        trainName.classList.add('trainName')
        trainName.textContent=train.trainName
        trainName.style.textAlign='center'

        let trainId = document.createElement('div')
        trainId.classList.add('trainId')
        trainId.textContent=train.trainId

        let from = document.createElement('div')
        from.classList.add('from')
        from.textContent=train.from

        let to = document.createElement('div')
        to.classList.add('to')
        to.textContent=train.to

        let updateButton = document.createElement('button')
        updateButton.classList.add('updateButton')
        updateButton.textContent="Update"
        updateButton.style.background='Orange'
        updateButton.style.outline='none'
        updateButton.style.border='none'
        updateButton.style.borderRadius='10px'
        updateButton.style.padding='10px 10px'
        updateButton.style.cursor='pointer'
        updateButton.onclick= () => this.updateTrain(train.trainId)
        

        let removeButton = document.createElement('button')
        removeButton.classList.add('removeButton')
        removeButton.textContent="Remove"
        removeButton.style.background='red'
        removeButton.style.outline='none'
        removeButton.style.border='none'
        removeButton.style.borderRadius='10px'
        removeButton.style.padding='10px 10px'
        removeButton.style.cursor='pointer'
        removeButton.onclick=() => this.deletetrain(train.id)

        maindivchild.appendChild(trainName)
        maindivchild.appendChild(trainId)
        maindivchild.appendChild(from)
        maindivchild.appendChild(to)
        maindivchild.appendChild(updateButton)
        maindivchild.appendChild(removeButton)

        console.log(maindivchild)
        document.getElementById('values').appendChild(maindivchild)

      })
      this.dataSource = new MatTableDataSource(this.Trains);
    })
    
    
  }

  displayedColumns: string[] = ['TrainName', 'TrainID', 'From', 'To','UpdateTrain','RemoveTrain'];
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logout(){
    this.auth.logout();
  }

  deletetrain(id){
    console.log(id)
    this.trains.deletetrain(id).subscribe(res => {
     if(res.response == "Success"){
      this.openSnackBar("Train Deleted","Done");
      this.route.navigate(['/admin/trains'])
     }else{
      this.openSnackBar("Something went wrong","Done");
     }
    });
  }

  updateTrain(trainId){
    this.route.navigate(['/admin/addtrain'],{queryParams: { trainId: trainId }})
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}


