import { Router } from '@angular/router';
import { Component } from '@angular/core';

interface LINK {
  id: number
  navigationTrigger: string
  restoredState: null
  url: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) {
    // router.events.subscribe((link: LINK) => {
    //   console.log(link.url)
    //   if (link.url && link.url.includes('/files/')) {
    //     router.parseUrl('https://bot2.rj2.app/api/v1/certs/03613b65531621438774232.pdf')
    //     // let link = document.createElement('a')
    //     // link.href = 'https://bot2.rj2.app/api/v1/certs/03613b65531621438774232.pdf'
    //     // link.click()
    //     // window.URL.revokeObjectURL(link.href)
    //     // link.remove()
    //   }
    // })
  }
}

