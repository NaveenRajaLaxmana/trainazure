import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { SearchComponent } from './pages/search/search.component'
import {TicketbookingComponent } from './pages/ticketbooking/ticketbooking.component'
import { LoginandsignupComponent } from './pages/loginandsignup/loginandsignup.component'
import { AddtrainComponent } from './pages/admin/addtrain/addtrain.component'
import { UsersComponent } from './pages/admin/users/users.component'
import { AddusersComponent } from './pages/admin/addusers/addusers.component'
import { TrainsComponent } from './pages/admin/trains/trains.component'
import { UsersdashboardComponent } from './pages/usersdashboard/usersdashboard.component'
import { AuthguardGuard } from './guards/authguard.guard'
import { AdminGuard } from './guards/admin.guard'

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'ticketbook',
    component: TicketbookingComponent,
  },
  {
    path: 'login',
    component: LoginandsignupComponent
  },
  {
    path: 'admin/addtrain',
    component: AddtrainComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/adduser',
    component: AddusersComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/trains',
    component: TrainsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'user/:name',
    component: UsersdashboardComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: "**",
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
