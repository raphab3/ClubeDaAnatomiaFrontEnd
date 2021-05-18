import { DashboardComponent } from '@pages/administration/dashboard/dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    // canActivateChild: [ServidorGuard],
  },
  {
    path: "eventos",
    component: EventsComponent,
    // canActivateChild: [ServidorGuard],
  }
];

@NgModule({
  declarations: [DashboardComponent, ProfileComponent, EventsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdministrationModule { }
