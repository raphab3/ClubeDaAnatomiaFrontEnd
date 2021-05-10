import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public user: any = null;

  constructor(private router: Router, private toastr: ToastrService) { }

  async login({ email, password }) {
    // try {
    //     const token = await Gatekeeper.loginByAuth(email, password);
    //     localStorage.setItem('token', token);
    //     this.router.navigate(['/']);
    // } catch (error) {
    //     this.toastr.error(error.message);
    // }
  }

  async register({ email, password }) {
    // try {
    //     const token = await Gatekeeper.registerByAuth(email, password);
    //     localStorage.setItem('token', token);
    //     this.router.navigate(['/']);
    // } catch (error) {
    //     this.toastr.error(error.message);
    // }
  }

  async loginByGoogle() {
    // try {
    //     const token = await Gatekeeper.loginByGoogle();
    //     localStorage.setItem('token', token);
    //     this.router.navigate(['/']);
    // } catch (error) {
    //     this.toastr.error(error.message);
    // }
  }

  async registerByGoogle({ email, password }) {
    // try {
    //     const token = await Gatekeeper.registerByGoogle();
    //     localStorage.setItem('token', token);
    //     this.router.navigate(['/']);
    // } catch (error) {
    //     this.toastr.error(error.message);
    // }
  }

  async getProfile() {
    // this.user = await Gatekeeper.getProfile();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('gatekeeper_token');
    this.user = null;
    this.router.navigate(['/login']);
  }
}
