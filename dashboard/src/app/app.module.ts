import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {DpDatePickerModule} from 'ng2-date-picker';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './layouts/admin/admin.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { VarsService } from './services/vars.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    DataTablesModule,
    NgSelect2Module,
    AmazingTimePickerModule,
    DpDatePickerModule,
    NgxMaskModule,
    HttpClientModule
  ],
  providers: [VarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
