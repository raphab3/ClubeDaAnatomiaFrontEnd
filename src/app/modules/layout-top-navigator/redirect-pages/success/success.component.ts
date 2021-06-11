import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  toHome(event: Event) {
    event.preventDefault()
    this.route.navigate(['']).then()
  }

}
