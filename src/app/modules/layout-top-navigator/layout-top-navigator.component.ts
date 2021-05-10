import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MercadoPagoProvider } from './../../providers/mercadopago.provider';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

import { environment } from 'environments/environment';

@Component({
  selector: 'app-layout-top-navigator',
  templateUrl: './layout-top-navigator.component.html',
  styleUrls: ['./layout-top-navigator.component.scss']
})
export class LayoutTopNavigatorComponent implements OnInit {
  payments = new BehaviorSubject<any>([])
  reference_cpf = ""
  cpf$ = new BehaviorSubject<string>("")

  nomeCompleto = ""
  cpf = ""
  display: boolean = false;

  CPFVerificado = new BehaviorSubject<boolean>(false)

  buttomPayment = false
  nome_participant = new BehaviorSubject<string>("")

  certificadoPDF: ArrayBuffer | SharedArrayBuffer;
  pdfSrc = new BehaviorSubject<any>("")
  constructor(
    private mercadopago: MercadoPagoProvider,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.verificadorDeCPF()
    this.loadPDFEndClick()
  }

  createPreferencia() {
    if (this.nomeCompleto && this.cpf) {
      console.log("DADOS: ", this.nomeCompleto, " cpf: ", this.cpf)
      this.mercadopago.criarPreferencia(this.nomeCompleto, this.cpf)
      this.display = false
    }
  }

  getPagamentosPorCPF(event: Event) {
    event.preventDefault()
    const headers = { 'Authorization': `Bearer ${environment.ACCESS_TOKEN_MERCADOPAGO}` };

    // Reference_1234
    this.http.get(`https://api.mercadopago.com/v1/payments/search?external_reference=${this.reference_cpf}`, { headers })
      .subscribe((res: any) => {
        console.log("result => ", res)
        this.payments.next(res.results)
      })
  }

  verificadorDeCPF() {
    this.cpf$.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(async cpf => {
      const verificado = this.validadoCPF(cpf)
      if (verificado) {
        console.log("CPF VERIFICADO => ", cpf)
        this.verificarParticipante(cpf)

      }
    })
  }

  validadoCPF(cpf) {
    if (cpf.length == 11) {
      let Soma;
      let Resto;
      Soma = 0;

      if (cpf == "00000000000" || cpf == '') return (false);

      for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(cpf.substring(9, 10))) return (false);

      Soma = 0;
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(cpf.substring(10, 11))) return (false);

      this.CPFVerificado.next(true)
      return true
    } else {
      this.CPFVerificado.next(false)
    }
  }

  verificarParticipante(cpf) {
    this.http.get(`${environment.API_NODE_URL}/participants/filter?cpf=${cpf}`)
      .subscribe((res: any) => {
        const nomeCompleto = res ? res.nome_completo : ''
        this.nome_participant.next(nomeCompleto)
        this.nomeCompleto = nomeCompleto
      })
  }

  async gerarCertificado(full_name, cpf, id_mercadopago, valor) {
    if (!full_name) {
      full_name = "Certificado criado como teste"
    }

    this.http.post(`${environment.API_NODE_URL}/certificados/gerar`, { full_name, cpf, id_mercadopago, valor })
      .subscribe((hash: any) => {
        this.pdfSrc.next(hash.url)
      })
  }

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json'
    })
  }

  loadPDFEndClick() {
    this.pdfSrc.subscribe(hash => {
      if (hash) {

        this.download(`${environment.API_NODE_URL}/pdf_download?hash=${hash}`)
          .subscribe((res: any) => {
            console.log(res)
            const file = new Blob([res], {
              type: res.type
            })

            const blob = window.URL.createObjectURL(file)
            const link = document.createElement('a')
            link.href = blob
            link.download = hash
            link.click()

            window.URL.revokeObjectURL(blob)
            link.remove()
          })
      }
    })
  }

  showDialog() {
    this.display = true;
  }
}
