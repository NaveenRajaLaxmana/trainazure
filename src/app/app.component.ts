import { Component, OnInit } from '@angular/core';
import { GetDetailsService } from './services/get-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private getdetailservice:GetDetailsService){
    // this.exportpdf()
  }
  

  exportpdf(){
    this.getdetailservice.exportpdfdetails().subscribe(x => {
        
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
