import { DashboardComponent } from '@pages/administration/dashboard/dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    // canActivateChild: [ServidorGuard],
  }
];

@NgModule({
  declarations: [DashboardComponent, ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdministrationModule { }
