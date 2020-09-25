import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { IndexComponent } from './pages/index/index.component';
import { UsersComponent } from './pages/users/users.component';
import { EventsComponent } from './pages/events/events.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { CertificatesComponent } from './pages/certificates/certificates.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { TicketanalyticsComponent } from './pages/ticketanalytics/ticketanalytics.component';
import { PayoutsComponent } from './pages/payouts/payouts.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { AddTypeComponent } from './pages/add-type/add-type.component';


const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [{
    path: '',
    component: IndexComponent
  }, {
    path: 'users',
    component: UsersComponent
  }, {
    path: 'events',
    component: EventsComponent
  }, {
    path: 'events/add',
    component: AddEventComponent
  }, {
    path: 'events/add-category',
    component: AddTypeComponent
  }, {
    path: 'events/add-category/:id',
    component: AddTypeComponent,
    pathMatch: 'full'
  }, {
    path: 'tickets',
    component: TicketsComponent
  }, {
    path: 'discounts',
    component: DiscountsComponent
  }, {
    path: 'locations',
    component: LocationsComponent
  }, {
    path: 'certificates',
    component: CertificatesComponent
  }, {
    path: 'analytics',
    component: AnalyticsComponent
  }, {
    path: 'analytics/tickets',
    pathMatch: 'full',
    component: TicketanalyticsComponent
  }, {
    path: 'payouts',
    component: PayoutsComponent
  }, {
    path: 'settings',
    component: SettingsComponent
  }]
}, {
  path: '404', 
  component: NotFoundComponent
}, {
  path: '**', 
  redirectTo: '404'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
