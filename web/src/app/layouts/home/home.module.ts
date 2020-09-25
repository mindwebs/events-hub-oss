import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { IndexComponent } from 'src/app/modules/index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';
import { ForgetPassComponent } from 'src/app/modules/forget-pass/forget-pass.component';
import { ResetPassComponent } from 'src/app/modules/reset-pass/reset-pass.component';
import { AccountComponent } from 'src/app/modules/account/account.component';
import { EventsComponent } from 'src/app/modules/events/events.component';

import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { EventComponent } from 'src/app/modules/event/event.component';
import { PurchaseComponent } from 'src/app/modules/purchase/purchase.component';
import { TokenForgotComponent } from 'src/app/modules/token-forgot/token-forgot.component';
import { TicketComponent } from 'src/app/modules/ticket/ticket.component';


@NgModule({
  declarations: [
    HomeComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPassComponent,
    ResetPassComponent,
    AccountComponent,
    EventsComponent,
    EventComponent,
    PurchaseComponent,
    TokenForgotComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module
  ]
})
export class HomeModule { }
