import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  toHome(event: Event) {
    event.preventDefault()
    this.route.navigate(['']).then()
  }

}
