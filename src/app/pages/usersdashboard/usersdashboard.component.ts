import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {LoginsignupService} from '../../services/login/loginsignup.service'
import { TicketbookingService } from '../../services/ticketbook/ticketbooking.service'

@Component({
  selector: 'app-usersdashboard',
  templateUrl: './usersdashboard.component.html',
  styleUrls: ['./usersdashboard.component.css']
})
export class UsersdashboardComponent implements OnInit {

  Tickets;
  dataSource;

  constructor(private auth:LoginsignupService,private ticketbookingservice:TicketbookingService) { }

  ngOnInit(): void {
  
    this.ticketbookingservice.useralltickets(window.location.pathname.substring(6)).subscribe(tickets => {
      this.Tickets = tickets;
      

      this.Tickets.forEach(ticket => {
        let maindivchild = document.createElement('div');
        maindivchild.classList.add('value')
        maindivchild.style.display='flex'
        maindivchild.style.flexDirection='column'
        maindivchild.style.justifyContent='space-around'
       
        maindivchild.style.alignItems='center'
       

        let trainName = document.createElement('div')
        trainName.classList.add('trainName')
        trainName.textContent=ticket.trainName
        trainName.style.textAlign='center'

        let trainId = document.createElement('div')
        trainId.classList.add('trainId')
        trainId.textContent=ticket.trainId

        let from = document.createElement('div')
        from.classList.add('from')
        from.textContent=ticket.from

        let to = document.createElement('div')
        to.classList.add('to')
        to.textContent=ticket.to

        let passengerscount = document.createElement('div')
        passengerscount.classList.add('passengerscount')
        passengerscount.textContent=ticket.totalpassengers

        let totalamount = document.createElement('div')
        totalamount.classList.add('totalamount')
        totalamount.textContent=ticket.totalamount

        let downloadButton = document.createElement('button')
        downloadButton.classList.add('downloadButton')
        downloadButton.textContent="Details"
        downloadButton.style.background='Orange'
        downloadButton.style.outline='none'
        downloadButton.style.border='none'
        downloadButton.style.borderRadius='10px'
        downloadButton.style.padding='10px 10px'
        downloadButton.style.cursor='pointer'
        downloadButton.onclick= () => this.getticketpdf(ticket.id)
        

        
        maindivchild.appendChild(trainName)
        maindivchild.appendChild(trainId)
        maindivchild.appendChild(from)
        maindivchild.appendChild(to)
        maindivchild.appendChild(passengerscount)
        maindivchild.appendChild(totalamount)
        maindivchild.appendChild(downloadButton)


        
        document.getElementById('values').appendChild(maindivchild)

      })


      this.dataSource = new MatTableDataSource(this.Tickets);
    })
  }

  displayedColumns: string[] = ['TrainName', 'TrainID', 'From', 'To','No of Passengers','Total Amount','Details'];
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logout(){
    this.auth.logout();
  }

  getticketpdf(id){
    this.ticketbookingservice.getpdfticket(id).subscribe(x => {
        
      const blob = new Blob([x],{type: 'application/pdf'});

      if(window.navigator && window.navigator.msSaveOrOpenBlob){
          window.navigator.msSaveOrOpenBlob(blob);
          return;
      }
      
          const data = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href=data;
          link.download='tickets.pdf';
          link.dispatchEvent(new MouseEvent('click',{bubbles: true,cancelable:true,view:window}));
          setTimeout(()=>{
              window.URL.revokeObjectURL(data);
              link.remove();
          },100);
    });
  }

}



