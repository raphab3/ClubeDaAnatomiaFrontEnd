import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import IEVENTDTO from '@/shared/interfaces/events.interface';
@Injectable({
  providedIn: 'root'
})
export class MercadoPagoProvider {

  preference = {
    "additional_info": {
      "payer": {
        "first_name": "",
        "information": "",
        "cpf": ""
      }
    },
    "metadata": {
      "first_name": "",
      "cpf": "",
    },
    "payment_methods": {
      "excluded_payment_methods": [
        {
          "id": "paypal"
        }
      ],
      "excluded_payment_types": [
        {
          "id": "pec"
        }
      ],
      "installments": 1
    },
    "items": [
      {
        "id": "",
        "title": "",
        "currency_id": "BRL",
        "picture_url": "",
        "description": "",
        "category_id": "certificado",
        "quantity": 1,
        "unit_price": 20
      }
    ],
    "payer": {
      "name": "",
      "first_name": "",
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
      "success": "https://clubedaanatomia.com.br",
      "failure": "https://clubedaanatomia.com.br",
      "pending": "https://clubedaanatomia.com.br"
    },
    tracks: [
      {
        type: "facebook_ad",
        values: {
          "pixel_id": '979606739475091'
        }
      },
      // {
      //   type: "google_ad",
      //   values: {
      //     conversion_id: "CONVERSION_ID",
      //     conversion_label: "CONVERSION_LABEL"
      //   }
      // }
    ],

    "binary_mode": false,
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


  async criarPreferencia(nomeCompleto: string, cpf: string, items: IEVENTDTO) {
    const headers = { 'Authorization': `Bearer ${environment.ACCESS_TOKEN_MERCADOPAGO}` };

    console.log("items PRICE=> ", parseFloat(items.unit_price.toString()))
    this.preference.metadata.first_name = nomeCompleto
    this.preference.metadata.cpf = cpf

    this.preference.items[0].id = items.id
    this.preference.items[0].title = items.title
    this.preference.items[0].description = items.description
    this.preference.items[0].picture_url = items.img_banner
    this.preference.items[0].unit_price = parseFloat(items.unit_price.toString())

    this.preference.payer.name = nomeCompleto
    this.preference.payer.first_name = nomeCompleto
    this.preference.payer.identification.number = cpf
    this.preference.external_reference = cpf

    this.http.post("https://api.mercadopago.com/checkout/preferences", this.preference, { headers }).subscribe((res: any) => {
      console.log("RES => ", res)

      let link = document.createElement('a')
      link.href = res.init_point
      link.click()
      window.URL.revokeObjectURL(res.init_point)
      link.remove()
    })
  }


}
