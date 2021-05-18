import { LayoutTopNavigatorComponent } from './modules/layout-top-navigator/layout-top-navigator.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '@modules/main/main.component';
import { LoginComponent } from '@modules/login/login.component';
import { RegisterComponent } from '@modules/register/register.component';
import { AuthGuard } from '@guards/auth.guard';
import { NonAuthGuard } from '@guards/non-auth.guard';
import { ForgotPasswordComponent } from '@modules/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from '@modules/recover-password/recover-password.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutTopNavigatorComponent,
  },
  {
    path: "painel",
    component: MainComponent,
    // canActivate: [AuthGuard],
    // canActivateChild: [ServidorGuard],
    loadChildren: () =>
      import("./pages/administration/administration.module").then(
        (mod) => mod.AdministrationModule
      ),
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent,
    canActivate: [NonAuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
