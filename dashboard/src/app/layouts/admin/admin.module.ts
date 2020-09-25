import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';
import { Daterangepicker } from 'ng2-daterangepicker';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {DpDatePickerModule} from 'ng2-date-picker';
import { NgxMaskModule } from 'ngx-mask'
import { MobxAngularModule } from 'mobx-angular';


import { IndexComponent } from 'src/app/pages/index/index.component';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { EventsComponent } from 'src/app/pages/events/events.component';
import { TicketsComponent } from 'src/app/pages/tickets/tickets.component';
import { DiscountsComponent } from 'src/app/pages/discounts/discounts.component';
import { LocationsComponent } from 'src/app/pages/locations/locations.component';
import { CertificatesComponent } from 'src/app/pages/certificates/certificates.component';
import { AnalyticsComponent } from 'src/app/pages/analytics/analytics.component';
import { TicketanalyticsComponent } from 'src/app/pages/ticketanalytics/ticketanalytics.component';
import { PayoutsComponent } from 'src/app/pages/payouts/payouts.component';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { AddEventComponent } from 'src/app/pages/add-event/add-event.component';
import { AddTypeComponent } from 'src/app/pages/add-type/add-type.component';


@NgModule({
  declarations: [
    AdminComponent,
    IndexComponent,
    UsersComponent,
    EventsComponent,
    TicketsComponent,
    DiscountsComponent,
    LocationsComponent,
    CertificatesComponent,
    AnalyticsComponent,
    TicketanalyticsComponent,
    PayoutsComponent,
    SettingsComponent,
    AddEventComponent,
    AddTypeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    DataTablesModule,
    NgSelect2Module,
    FormsModule,
    BrowserModule,
    Daterangepicker,
    AmazingTimePickerModule,
    DpDatePickerModule,
    NgxMaskModule.forRoot(),
    MobxAngularModule
  ]
})
export class AdminModule { }
