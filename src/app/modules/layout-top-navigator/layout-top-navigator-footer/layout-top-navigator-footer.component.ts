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

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.insta()
  }


  goAdminRoot() {
    this.router.navigate(['/members']).then(res => console.log(res))
  }









  // insta() {
  //   let arr = []
  //   let feed = new Instafeed({
  //     accessToken: "IGQVJVLWEtTDA4dkx3SlFIU0lvQWxGQ2luRkJkbjJsYVJSZA05XYTBaU1ZAHZAlhWMW83RTZACajE4bjVaT2lsOGVUUUZAsRzk2NUI2VDRRM3JWNGNGSDhrbkR3WVRMUGRmVkRvZA3QwdW5aeEY4QjVOTHFMTgZDZD",
  //     transform: (item: any) => {
  //       let d = new Date(item.timestamp);
  //       item.date = [d.getDate(), d.getMonth(), d.getFullYear()].join('/');

  //       arr.push(item)
  //       this.itensInsta.next(arr[0])
  //       return item;
  //     }
  //   });


  //   feed.run();
  // }
}
