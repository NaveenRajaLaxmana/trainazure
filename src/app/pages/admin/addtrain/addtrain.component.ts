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
      // new FormGroup({
      //   classtype: new FormControl(''),
      //   amount: new FormControl('')
      // })
    ]),
    from: new FormControl(''),
    to: new FormControl(''),
    midstations : new FormArray([
      // new FormGroup({
      //   stationname: new FormControl(''),
      //   amountforadult: new FormControl(''),
      //   amountforchild: new FormControl(''),
      //   journeytime: new FormControl('')
      // })
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
      console.log(params['trainId'])
     
 this.trainId= params['trainId']
 if(params['trainId']){

   this.updatetrain = true
 }
      
    })
    this.trainservice.gettraininfo(this.trainId).subscribe(train => {
     console.log(train)
      
   let trainclass=  train[0].classType;


     this.callupdatefunctions(train[0])
  


   
  
 
      console.log(train[0])
 
  
     
      // console.log(this.addtrainform.value)
      // this.classtypelist;
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
    console.log('update function')
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
    // console.log(classtypes.length)
   return  classtypes.forEach(element => {
       this.classtypelist.push(new FormGroup({ classtype : new FormControl(element.classtype),amount: new FormControl(element.amount)}))
     });
    
  }

  updatemidstation(midstations){
    // console.log(midstations.length)
   return midstations.forEach(element => {
       this.stationlist.push(new FormGroup({ stationname : new FormControl(element.stationname),amountforadult: new FormControl(element.amountforadult), amountforchild: new FormControl(element.amountforchild),journeytime : new FormControl(element.journeytime) }))
     });
    
  }

  updateavailabledays(availabledays){
    // console.log(availabledays)
  return  availabledays.forEach(element => {
    console.log(element)
    let totaldays = document.querySelectorAll('.days');
    // console.log(totaldays)
    totaldays.forEach(days => {
      
      let value = days.classList.contains(element)
     
          if(value){
            console.log(value+" "+element)
            days.classList.add('mat-chip-selected')
            
          }
    })
      // this.availabledays.push(new FormControl(element))
      // if(this.availabledays.value.includes(element)){
      //   let totaldays = document.querySelectorAll('.days');
      //   console.log(totaldays)
      //   for(let i=0;i<totaldays.length-1;i++){
      //     let value = totaldays[i].classList.contains(element)
      //     if(value){
      //       totaldays[i].classList.add('mat-chip-selected')
      //     }
      //   }
      // }
    })
    
  }

  removeclassType(){
    return this.classtypelist.removeAt(-1);
  }

  adddays(event){
   
    event.target.classList.toggle('mat-chip-selected')
  
    
    if(this.availabledays.value.includes(event.target.innerText)){
      console.log('its there')
      let index=this.availabledays.controls.indexOf(event.target.innerText)
     return this.availabledays.removeAt(index)
    }else{
      this.availabledays.push(new FormControl(event.target.innerText))
    }

    console.log(this.availabledays.value)
  }

  addtrain(){
    console.log(this.addtrainform.value)
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
