import { Component, OnInit } from '@angular/core';
import {version} from './../../../../../package.json';


@Component({
  selector: 'app-layout-top-navigator-footer',
  templateUrl: './layout-top-navigator-footer.component.html',
  styleUrls: ['./layout-top-navigator-footer.component.scss']
})
export class LayoutTopNavigatorFooterComponent implements OnInit {
  public appVersion = version;

  constructor() { }

  ngOnInit(): void {
  }

}
