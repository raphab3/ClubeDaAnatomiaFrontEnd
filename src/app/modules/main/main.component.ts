import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public sidebarMenuOpened = false;
  @ViewChild('contentWrapper', { static: false }) contentWrapper;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    console.log("MAIN")

    const addBodyList = ['sidebar-mini', 'layout-fixed', 'control-sidebar-slide-open', 'layout-navbar-fixed', 'sidebar-mini-md', 'sidebar-mini-xs', 'layout-footer-fixed', 'sidebar-collapse']

    for (let index = 0; index <= addBodyList.length; index++) {
      const element = addBodyList[index];
      this.renderer.addClass(
        document.querySelector('body'),
        element
      );
    }

    this.renderer.removeClass(
      document.querySelector('body'),
      'layout-top-nav'
    );
  }

  mainSidebarHeight(height) {
    // this.renderer.setStyle(
    //   this.contentWrapper.nativeElement,
    //   'min-height',
    //   height - 114 + 'px'
    // );
  }

  toggleMenuSidebar() {
    if (this.sidebarMenuOpened) {
      this.renderer.removeClass(
        document.querySelector('body'),
        'sidebar-open'
      );
      this.renderer.addClass(
        document.querySelector('body'),
        'sidebar-collapse'
      );
      this.sidebarMenuOpened = false;
      document.getElementById('myBody')
    } else {
      this.renderer.removeClass(
        document.querySelector('body'),
        'sidebar-collapse'
      );
      this.renderer.addClass(
        document.querySelector('body'),
        'sidebar-open'
      );
      this.sidebarMenuOpened = true;
    }
  }
}
