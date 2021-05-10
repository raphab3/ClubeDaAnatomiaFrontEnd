import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class MercadoPagoProvider {

  preference = {
    "items": [
      {
        "id": "item-ID-1235",
        "title": "Certificado Anatomia",
        "currency_id": "BRL",
        "picture_url": "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
        "description": "Curso de Anatomia Grátis no Youtube",
        "category_id": "certificado",
        "quantity": 1,
        "unit_price": 1.15
      }
    ],
    "payer": {
      "name": "",
      "surname": "",
      "email": "",
      "phone": {
        "area_code": "",
        "number": ""
      },
      "identification": {
        "type": "CPF",
        "number": ""
      },
      "address": {
        "street_name": null,
        "street_number": null,
        "zip_code": null
      }
    },
    "back_urls": {
      "success": "https://clubedaanatomia-581a7.web.app",
      "failure": "https://clubedaanatomia-581a7.web.app",
      "pending": "https://clubedaanatomia-581a7.web.app"
    },
    "auto_return": "approved",
    "notification_url": "https://bot2.rj2.app/api/v1/mercadopago/notification",
    "statement_descriptor": "Clube da Anatomia",
    "external_reference": "",
    "expires": true,
    // "expiration_date_from": "2021-05-01T12:00:00.000-04:00",
    // "expiration_date_to": "2021-07-28T12:00:00.000-04:00"
  }

  constructor(private router: Router, private toastr: ToastrService, private http: HttpClient) {
    console.log("MERCADOPAGO ON")
  }


  async criarPreferencia(nomeCompleto, cpf) {
    const headers = { 'Authorization': `Bearer ${environment.ACCESS_TOKEN_MERCADOPAGO}` };

    this.preference.payer.name = nomeCompleto
    this.preference.payer.identification.number = cpf
    this.preference.external_reference = cpf

    this.http.post("https://api.mercadopago.com/checkout/preferences", this.preference, { headers }).subscribe((res: any) => {
      console.log("RES => ", res)

      window.open(res.init_point, '')
    })
  }


}
