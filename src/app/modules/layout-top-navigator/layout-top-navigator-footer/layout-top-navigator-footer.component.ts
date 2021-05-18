import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { version } from './../../../../../package.json';
import { Router } from '@angular/router';


declare const Instafeed: any;
@Component({
  selector: 'app-layout-top-navigator-footer',
  templateUrl: './layout-top-navigator-footer.component.html',
  styleUrls: ['./layout-top-navigator-footer.component.scss']
})
export class LayoutTopNavigatorFooterComponent implements OnInit {
  public appVersion = version;
  itensInsta = new BehaviorSubject<any>([])
  anoAtual = new Date().getFullYear()
  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.insta()
  }


  goAdminRoot(event: Event) {
    event.preventDefault()
    this.router.navigate(['/painel']).then(res => console.log(res))
  }

}
