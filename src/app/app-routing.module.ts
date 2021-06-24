import { ConsultCertificateComponent } from './modules/consult-certificate/consult-certificate.component';
import { FailureComponent } from './modules/layout-top-navigator/redirect-pages/failure/failure.component';
import { PendingComponent } from './modules/layout-top-navigator/redirect-pages/pending/pending.component';
import { SuccessComponent } from './modules/layout-top-navigator/redirect-pages/success/success.component';
import { LayoutTopNavigatorComponent } from './modules/layout-top-navigator/layout-top-navigator.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '@modules/main/main.component';
import { LoginComponent } from '@modules/login/login.component';
import { RegisterComponent } from '@modules/register/register.component';
import { NonAuthGuard } from '@guards/non-auth.guard';
import { ForgotPasswordComponent } from '@modules/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from '@modules/recover-password/recover-password.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutTopNavigatorComponent,
  },
  {
    path: 'certificados',
    component: ConsultCertificateComponent,
  },
  {
    path: "painel",
    component: MainComponent,
    loadChildren: () =>
      import("./pages/administration/administration.module").then(
        (mod) => mod.AdministrationModule
      ),
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: 'pending',
    component: PendingComponent,
  },
  {
    path: 'failure',
    component: FailureComponent,
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
