import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from '@modules/main/main.component';
import { LoginComponent } from '@modules/login/login.component';
import { HeaderComponent } from '@modules/main/header/header.component';
import { FooterComponent } from '@modules/main/footer/footer.component';
import { MenuSidebarComponent } from '@modules/main/menu-sidebar/menu-sidebar.component';
import { BlankComponent } from '@pages/blank/blank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '@pages/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from '@modules/register/register.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { MessagesDropdownMenuComponent } from '@modules/main/header/messages-dropdown-menu/messages-dropdown-menu.component';
import { NotificationsDropdownMenuComponent } from '@modules/main/header/notifications-dropdown-menu/notifications-dropdown-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppButtonComponent } from './components/app-button/app-button.component';

import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { UserDropdownMenuComponent } from '@modules/main/header/user-dropdown-menu/user-dropdown-menu.component';
import { ForgotPasswordComponent } from '@modules/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from '@modules/recover-password/recover-password.component';
import { LanguageDropdownComponent } from '@modules/main/header/language-dropdown/language-dropdown.component';
import { LayoutTopNavigatorComponent } from './modules/layout-top-navigator/layout-top-navigator.component';
import { LayoutTopNavigatorFooterComponent } from './modules/layout-top-navigator/layout-top-navigator-footer/layout-top-navigator-footer.component';
import { LayoutTopNavigatorHeaderComponent } from './modules/layout-top-navigator/layout-top-navigator-header/layout-top-navigator-header.component';
import { MercadoPagoProvider } from './providers/mercadopago.provider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
registerLocaleData(localeEn, 'en-EN');
import { DialogModule } from 'primeng/dialog';
import { CORSInterceptor } from './interceptor/CORS.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuSidebarComponent,
    BlankComponent,
    ProfileComponent,
    RegisterComponent,
    DashboardComponent,
    MessagesDropdownMenuComponent,
    NotificationsDropdownMenuComponent,
    AppButtonComponent,
    UserDropdownMenuComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    LanguageDropdownComponent,
    LayoutTopNavigatorComponent,
    LayoutTopNavigatorFooterComponent,
    LayoutTopNavigatorHeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    NgbModule,
    FontAwesomeModule,
    DialogModule,
  ],
  providers: [MercadoPagoProvider,
    { provide: HTTP_INTERCEPTORS, useClass: CORSInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
