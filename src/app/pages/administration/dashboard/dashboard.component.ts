import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  certificadosGerados = new BehaviorSubject<number>(0)
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllCertificates()
  }

  getAllCertificates() {
    this.http.get(`${environment.API_NODE_URL}/certificados/findAll?skip=0&take=10`).subscribe((res: any) => {
      console.log(res)
      this.certificadosGerados.next(res.data[1])
    })
  }
}
