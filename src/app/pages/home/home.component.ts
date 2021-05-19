import { Component, OnInit } from '@angular/core';
import {MatDatepicker} from '@angular/material/datepicker'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

from;
to;
date;
general;
classType;


gotosearchpage(){
  this.route.navigate([`/search`],{queryParams: {from: this.from,to:this.to,date:this.date,general:this.general,classType:this.classType}})
}

}
