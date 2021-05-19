import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormArray} from '@angular/forms';
import { GetalltrainsService } from '../../../services/trains/getalltrains.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute,Router } from '@angular/router'
import { LoginsignupService } from '../../../services/login/loginsignup.service'



@Component({
  selector: 'app-addtrain',
  templateUrl: './addtrain.component.html',
  styleUrls: ['./addtrain.component.css']
})
export class AddtrainComponent implements OnInit {

  classtype:any=[
    { value: 'AC_CHAIR',viewValue:'AC CHAIR'},
    { value: 'EXEC_CHAIR',viewValue:'EXEC CHAIR'},
    { value: 'ANBHUTI',viewValue:'ANBHUTI'},

  ]
  

  addtrainform= new FormGroup({
    trainName: new FormControl(''),
    trainId: new FormControl(''),
    classType: new FormArray([
      
    ]),
    from: new FormControl(''),
    to: new FormControl(''),
    midstations : new FormArray([
     
    ]),
    costperchildren: new FormControl(''),
    costperperson: new FormControl(''),
    availabledays: new FormArray([]),
    departuretime: new FormControl(''),
    arrivaltime: new FormControl(''),
    departurestationname: new FormControl(''),
    arrivalstationname: new FormControl(''),
    journeytime: new FormControl('')
  })

  constructor(private trainservice:GetalltrainsService,private _snackBar: MatSnackBar,private activatedroute:ActivatedRoute,private loginservice:LoginsignupService,private route:Router) { }
trainId
updatetrain
  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
      
     
 this.trainId= params['trainId']
 if(params['trainId']){

   this.updatetrain = true
 }
      
    })
    this.trainservice.gettraininfo(this.trainId).subscribe(train => {
     
      
 


     this.callupdatefunctions(train[0])
  


   
  
 
      
 
  
     
     
    })
   
   
  
  }

  get classtypelist(){
    return this.addtrainform.get('classType') as FormArray;
  }

  get stationlist(){
    return this.addtrainform.get('midstations') as FormArray;
  }

  get availabledays(){
    return this.addtrainform.get('availabledays') as FormArray;
  }

  callupdatefunctions(train){
    
    this.updatemidstation(train.midstations)
    this.updateformvalue(train)
    this.updateavailabledays(train.availabledays) 
    this.updateclassType(train.classType)
  }

  updateformvalue(train){
   return this.addtrainform.patchValue({
      trainId: train.trainId,
      trainName:train.trainName,
      from:train.from,
      to:train.to,
      costperchildren:train.costperchildren,
      costperperson:train.costperperson,
      availabledays:train.availabledays,
      departuretime:train.departuretime,
      arrivaltime:train.arrivaltime,
      departurestationname:train.departurestationname,
      arrivalstationname:train.arrivalstationname,
      journeytime:train.journeytime
    })
  }

  addstationsinfolist(){
    return this.stationlist.push(
      new FormGroup({
        stationname: new FormControl(''),
        amountforadult: new FormControl(''),
        amountforchild: new FormControl(''),
        journeytime: new FormControl('')
      })
    );
  }

  removestationsinfolist(){
    return this.stationlist.removeAt(-1);
  }

  addclassType(){
    return this.classtypelist.push(
      new FormGroup({
        classtype: new FormControl(''),
        amount: new FormControl('')
      })
    )
  }

  updateclassType(classtypes){
    
   return  classtypes.forEach(element => {
       this.classtypelist.push(new FormGroup({ classtype : new FormControl(element.classtype),amount: new FormControl(element.amount)}))
     });
    
  }

  updatemidstation(midstations){
   
   return midstations.forEach(element => {
       this.stationlist.push(new FormGroup({ stationname : new FormControl(element.stationname),amountforadult: new FormControl(element.amountforadult), amountforchild: new FormControl(element.amountforchild),journeytime : new FormControl(element.journeytime) }))
     });
    
  }

  updateavailabledays(availabledays){
   
  return  availabledays.forEach(element => {
    
    let totaldays = document.querySelectorAll('.days');
    
    totaldays.forEach(days => {
      
      let value = days.classList.contains(element)
     
          if(value){
            
            days.classList.add('mat-chip-selected')
            
          }
    })
     
    })
    
  }

  removeclassType(){
    return this.classtypelist.removeAt(-1);
  }

  adddays(event){
   
    event.target.classList.toggle('mat-chip-selected')
  
    
    if(this.availabledays.value.includes(event.target.innerText)){
      
      let index=this.availabledays.controls.indexOf(event.target.innerText)
     return this.availabledays.removeAt(index)
    }else{
      this.availabledays.push(new FormControl(event.target.innerText))
    }

    
  }

  addtrain(){
    
    this.trainservice.addtrain(this.addtrainform.value).subscribe(res => {
      if(res.response == "Success"){
        this.openSnackBar("Train added","Done");
        this.addtrainform.reset()
      }else{
        
        this.openSnackBar("Something went wrong","Done");
        this.addtrainform.reset()
      }
    })
  }

  updatetrainmethod(){
    this.trainservice.updatetrain(this.addtrainform.value).subscribe(res => {
      if(res.response == "Success"){
        this.openSnackBar("Train Updated","Done");
        this.addtrainform.reset()
      }else{
        
        this.openSnackBar("Something went wrong","Done");
        this.addtrainform.reset()
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
