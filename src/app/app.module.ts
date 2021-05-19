import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import { SearchComponent } from './pages/search/search.component';
import { TicketbookingComponent } from './pages/ticketbooking/ticketbooking.component';
import { LoginandsignupComponent } from './pages/loginandsignup/loginandsignup.component';
import { AddtrainComponent } from './pages/admin/addtrain/addtrain.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { AddusersComponent } from './pages/admin/addusers/addusers.component';
import { TrainsComponent } from './pages/admin/trains/trains.component';
import { UsersdashboardComponent } from './pages/usersdashboard/usersdashboard.component';
import { AuthguardGuard } from './guards/authguard.guard';
import { TokeninterceptorService } from './services/tokeninterceptors/tokeninterceptor.service'
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    SearchComponent,
    TicketbookingComponent,
    LoginandsignupComponent,
    AddtrainComponent,
    UsersComponent,
    AddusersComponent,
    TrainsComponent,
    UsersdashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDatepickerModule,        
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatStepperModule,
    MatCardModule,
    MatTabsModule,
    MatRadioModule,
    MatChipsModule,
    MatSidenavModule,
    MatTableModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule      
  ],
  exports: [
    MatDatepickerModule, 
    MatNativeDateModule 
],
  providers: [AuthguardGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokeninterceptorService,
    multi:true
  },
  {provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
