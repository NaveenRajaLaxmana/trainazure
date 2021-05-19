import { Component, OnInit } from '@angular/core';
import {GetalltrainsService } from '../../services/trains/getalltrains.service';
import { ActivatedRoute,Router } from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  trains=[];

  from;
  to;
  date;
  general;
  classType;

  constructor(private gettrains:GetalltrainsService,private route:ActivatedRoute,private navigaterouter:Router) { }

  ngOnInit(): void {
    this.gettrains.getalltrains().subscribe(train => {
      this.trains = train
      console.log(this.trains);
    })

    this.getparams()
    this.gettrains.getfakedata().subscribe(data => console.log(data))
  }
  getparams(){
    this.route.queryParams.subscribe(params => {
      console.log(params['from'])
      console.log(params['to'])
      console.log(params['date'])

      this.from = params['from']
      this.to = params['to']
      this.date = params['date']
      this.general = params['general']
      this.classType = params['classType']
    })

    this.trains= this.trains.filter(train => {
      if(train.from == this.from && train.to == this.to ){
        // && train.availabledays.includes(this.date.substring(0,3))
        return train
      }
     })
  }



  onSubmit(){
    
   this.trains= this.trains.filter(train => {
    if(train.from == this.from && train.to == this.to){
      // && train.availabledays.includes(this.date.substring(0,3))
      
      return train
    }
   })
  }

  booktic(trainid){
    this.navigaterouter.navigate(['/ticketbook'],{queryParams: { trainId: trainid}})
  }

}
