import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { DashComponent } from './layouts/dash/dash.component';
import { IndexComponent } from './modules/index/index.component';
import { RegisterComponent } from './modules/register/register.component';
import { ForgetPassComponent } from './modules/forget-pass/forget-pass.component';
import { ResetPassComponent } from './modules/reset-pass/reset-pass.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { AccountComponent } from './modules/account/account.component';
import { EventsComponent } from './modules/events/events.component';
import { EventComponent } from './modules/event/event.component';
import { PurchaseComponent } from './modules/purchase/purchase.component';
import { TokenForgotComponent } from './modules/token-forgot/token-forgot.component';
import { TicketComponent } from './modules/ticket/ticket.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { UploadproofComponent } from './modules/uploadproof/uploadproof.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [{
    path: '',
    component: IndexComponent
  }, { path: 'home',
  component: IndexComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'forget-password',
    component: ForgetPassComponent
  }, {
    path: 'reset-password',
    component: ResetPassComponent
  }, {
    path: 'set-password/:id',
    component: TokenForgotComponent
  }, {
    path: 'upload-proof',
    component: UploadproofComponent
  }, {
    path: 'account',
    component: AccountComponent
  }, {
    path: 'events',
    component: EventsComponent
  }, {
    path: 'event', 
    redirectTo: 'events', 
    pathMatch: 'full'
  }, {
    path: 'event/:id',
    component: EventComponent
  }, {
    path: 'purchase',
    component: PurchaseComponent
  }, {
    path: 'ticket/:id',
    component: TicketComponent
  }]
}, {
  path: 'dashboard',
  component: DashComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }]
}, {
  path: '404', 
  component: NotFoundComponent
}, {
  path: '**', 
  redirectTo: '404'
}];
// Change the Dashboard

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
