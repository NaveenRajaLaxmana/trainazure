import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,FormArray} from '@angular/forms';
import { TicketbookingService } from '../../services/ticketbook/ticketbooking.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute,Router } from '@angular/router'
import { LoginsignupService } from '../../services/login/loginsignup.service'

@Component({
  selector: 'app-ticketbooking',
  templateUrl: './ticketbooking.component.html',
  styleUrls: ['./ticketbooking.component.css']
})
export class TicketbookingComponent implements OnInit{

  
  classtype:any=[
    { value: 'AC_CHAIR',viewValue:'AC CHAIR'},
    { value: 'EXEC_CHAIR',viewValue:'EXEC CHAIR'},
    { value: 'ANBHUTI',viewValue:'ANBHUTI'},

  ]

  isLinear = false;
  trainId;
  gottrain=false;

  username=''

  // ticketbookform;


  ticketbookform=new FormGroup({
      trainName: new FormControl(''),
      trainId: new FormControl(''),
      username: new FormControl(''),
      classType: new FormControl(''),
      totalpassengers: new FormControl(''),
      amount: new FormControl(''),
      departuredatetime: new FormControl(''),
      arrivaldatetime: new FormControl(''),
      passengersinfo: new FormArray([
        
          new FormGroup({
            name : new FormControl(''),
            age: new FormControl(''),
            gender: new FormControl('')
      }),
        
      ])
     ,
      from: new FormControl(''),
      to: new FormControl(''),
      adultscounts: new FormControl(''),
      childrencounts: new FormControl('')
    })

  

  paymentdetails = new FormGroup({
    upiid:new FormControl(''),
    totalamount: new FormControl('')
  })

  constructor(private ticketbookservice:TicketbookingService,private _snackBar: MatSnackBar,private activatedroute:ActivatedRoute,private loginservice:LoginsignupService,private route:Router) {
    
   }

   get passengerslist(){
     return this.ticketbookform.get('passengersinfo') as FormArray;
   }

   get amountdetails(){
     return this.ticketbookform.get('amount') as FormControl;
   }

   get adultscount(){
     return this.ticketbookform.get('adultscounts') as FormControl;
   }

   get childrencount(){
    return this.ticketbookform.get('childrencounts') as FormControl;
  }

  get totalamount(){
    return (this.amountdetails.value * this.adultscount.value) + ((this.amountdetails.value * 0.75)  * this.childrencount.value) 
  }

  totalamounts;
  
  ngOnInit(): void {

  
    if(!this.loginservice.isLoggedin()){
      this.openSnackBar("Please Login in","Close");
       this.route.navigate(['/login'])
   }

   this.loginservice.getname().subscribe(res => {
    console.log(`user is ${res.response}`)
    if(res.response){
    this.username = res.response
    
    }
    
  });


    // this.numbers = Array(3).fill(0).map((x,i)=>1);
    this.activatedroute.queryParams.subscribe(params => {
      console.log(params['trainId'])
     
 this.trainId= params['trainId']
      
    })
    console.log(this.trainId)
    
    this.ticketbookservice.gettraininfo(this.trainId).subscribe(train => {
      
      console.log(train[0])
      this.ticketbookform.patchValue({
        trainName: train[0].trainName,
        trainId:train[0].trainId,
        amount:train[0].costperperson,
        departuredatetime:train[0].departuretime,
        arrivaldatetime:train[0].arrivaltime,
        from:train[0].from,
        to:train[0].to,
        classType:train[0].classType,
        username: this.username
      })
      console.log(this.ticketbookform.value)
    
      if(train) {
        this.gottrain=true;
      }

    })
  }

  addpassengerslist(){
    this.passengerslist.push(new FormGroup({
      name : new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl('')
  }))
  }

  removepassengerslist(){
    this.passengerslist.removeAt(-1);
  }

  // submit(){
  //   console.log(this.ticketbookform.value)
  // }

  

  ticketbook(){
    // this.ticketbookform.removeControl('amount')
    if(!this.loginservice.isLoggedin()){
       this.openSnackBar("Please Login in","Close");
       return this.route.navigate(['/login'])
    }
    document.querySelector('mat-progress-bar').classList.add('show')
    console.log(this.totalamount)
    this.ticketbookform.addControl('totalamount', new FormControl(this.totalamount.toString()))
    this.ticketbookform.removeControl('amount')
    console.log(this.ticketbookform.value)
    this.ticketbookservice.bookticket(this.ticketbookform.value).subscribe(result => {
      if(result.response == "ticket booked"){
        this.openSnackBar("Ticket Booked","Done");
        return this.route.navigate([`/user/${this.username}`])
      }else{
        this.openSnackBar("Something Went Wrong","Close");
      }
    })
    document.querySelector('mat-progress-bar').classList.remove('show')
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
