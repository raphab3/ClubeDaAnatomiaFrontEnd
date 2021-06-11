import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.scss']
})
export class FailureComponent implements OnInit {

  constructor(private route: Router) { }


  ngOnInit(): void {
  }

  toHome(event: Event) {
    event.preventDefault()
    this.route.navigate(['']).then()
  }


}
