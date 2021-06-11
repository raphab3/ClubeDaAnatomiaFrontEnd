import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MercadoPagoProvider } from './../../providers/mercadopago.provider';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { environment } from 'environments/environment';
import IEVENTDTO from '@/shared/interfaces/events.interface';
import { DeviceDetectorService } from 'ngx-device-detector';
export interface Download {
  state: 'PENDING' | 'IN_PROGRESS' | 'DONE'
  progress: number
  content: Blob | null
}
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
  progressPDF = 1
  events = new BehaviorSubject<any>([])
  eventSelected: IEVENTDTO;
  // confirmDados: boolean = false

  deviceInfo = new BehaviorSubject<any>(this.deviceService.getDeviceInfo())
  optionsToaster: any;
  constructor(
    private mercadopago: MercadoPagoProvider,
    private http: HttpClient,
    private router: Router,
    private renderer: Renderer2,
    private deviceService: DeviceDetectorService,
    private toast: ToastrService
  ) {
    this.optionsToaster = this.toast.toastrConfig;
    this.optionsToaster.timeOut = 10000;
    this.optionsToaster.autoDismiss = true;
    this.optionsToaster.positionClass = 'toast-bottom-left';
  }

  ngOnInit(): void {
    this.ajustDisplay()
    this.verificadorDeCPF()
    this.loadPDFEndClick()
    this.getEvents()
  }

  getEvents() {
    this.http.get(`${environment.API_NODE_URL}/events`).subscribe((res: any) => {
      let events = []
      res.forEach((e: IEVENTDTO) => {
        e.img_banner = `${environment.API_NODE_URL}/img_events/${e.img_banner}`
        events.push(e)
      });
      this.events.next(events)
    })
  }

  createPreferencia() {
    console.log("eventSelected => ", this.eventSelected)
    if (this.nomeCompleto && this.cpf) {
      console.log("DADOS: ", this.nomeCompleto.toUpperCase(), " cpf: ", this.cpf)

      this.mercadopago.criarPreferencia(this.nomeCompleto.toUpperCase(), this.cpf, this.eventSelected)
      this.display = false
      this.eventSelected = null
    }
  }

  getPagamentosPorCPF(event: Event) {
    event.preventDefault()
    this.http.get(`${environment.API_NODE_URL}/payments/external_reference?external_reference=${this.reference_cpf}`)
      .subscribe((res: any) => {
        console.log("result => ", res)
        this.payments.next(res)
      })

    // const headers = { 'Authorization': `Bearer ${environment.ACCESS_TOKEN_MERCADOPAGO}` };

    // // Reference_1234
    // this.http.get(`https://api.mercadopago.com/v1/payments/search?external_reference=${this.reference_cpf}`, { headers })
    //   .subscribe((res: any) => {
    //     console.log("result => ", res)
    //     this.payments.next(res.results)
    //   })
  }

  verificadorDeCPF() {
    this.cpf$.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(async cpf => {

      let mycpf = cpf
      mycpf = mycpf.replace(/\D/g, "")
      mycpf = mycpf.replace(/(\d{3})(\d)/, "$1.$2")
      mycpf = mycpf.replace(/(\d{3})(\d)/, "$1.$2")
      mycpf = mycpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

      const verificado = this.validadoCPF(cpf, mycpf)
      if (verificado) {
        this.verificarParticipante(cpf)
      }
    })
  }

  validadoCPF(cpf: string, cpfPontuado: string) {
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

      let cpfValue: any = document.getElementById('cpf')
      cpfValue.value = cpfPontuado
      this.CPFVerificado.next(true)
      return true
    } else {
      this.CPFVerificado.next(false)
    }
  }

  verificarParticipante(cpf: string) {
    this.http.get(`${environment.API_NODE_URL}/participants/filter?cpf=${cpf}`)
      .subscribe((res: any) => {
        const nomeCompleto = res ? res.nome_completo : ''
        this.nome_participant.next(nomeCompleto)
        this.nomeCompleto = nomeCompleto
      })
  }

  async gerarCertificado(payment_mercadopago_id) {

    let versionNumber = 999
    if (this.deviceService.getDeviceInfo().device === "iPhone") {
      this.deviceInfo.next(this.deviceService.getDeviceInfo());
      let v = this.deviceInfo.value.userAgent.split(';')[1].split(" ")[4].split("_")[0]
      versionNumber = parseInt(v)
      console.log("VERSION => ", versionNumber)

      const isMobile = this.deviceService.isMobile();
      if (isMobile && this.deviceService.getDeviceInfo().device === "iPhone" && versionNumber <= 6) {
        this.toast.warning(`Caro usuário, esse dispositivo é incompatível com nossa plataforma, favor tentar em outro dispositivo.
      Ou entrar em contato com o suporte caso não consiga.`)
        return
      }
    }
    this.progressPDF = 2
    this.http.post(`${environment.API_NODE_URL}/certificados/gerar`, { payment_mercadopago_id })
      .subscribe((hash: any) => {
        this.pdfSrc.next(hash.url)
      }, error => {
        setTimeout(() => {
          this.progressPDF = 1
        }, 2000);
      })
  }

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json',
    })
  }

  loadPDFEndClick() {
    this.pdfSrc.subscribe(hash => {
      if (hash) {

        console.log("HASH:", hash)
        let link = document.createElement('a')
        let blob = window.URL.createObjectURL(new Blob)
        this.download(`${environment.API_NODE_URL}/pdf_download?hash=${hash}`)
          .subscribe((event: any) => {
            console.log(event)

            const file = new Blob([event], {
              type: 'application/pdf'
            })

            blob = window.URL.createObjectURL(file)
            link.href = blob
            link.download = hash
          }, error => {
            console.log("error => ", error)
            setTimeout(() => {
              this.progressPDF = 1
            }, 2000);
          }, () => {
            link.click()

            setTimeout(() => {
              window.URL.revokeObjectURL(blob)
              link.remove()
              this.progressPDF = 1
            }, 2000);
          })
      }
    })
  }

  showDialog(event: IEVENTDTO) {
    this.eventSelected = event
    this.display = true;
  }

  ajustDisplay() {
    const listRemove = ['sidebar-mini', 'layout-fixed', 'control-sidebar-slide-open', 'dark-mode', 'layout-navbar-fixed', 'sidebar-mini-md', 'sidebar-mini-xs', 'layout-footer-fixed', 'text-sm']

    for (let index = 0; index <= listRemove.length; index++) {
      const element = listRemove[index];
      this.renderer.removeClass(
        document.querySelector('body'),
        element
      );
    }

    this.renderer.addClass(
      document.querySelector('body'),
      'sidebar-collapse'
    );

    this.renderer.addClass(
      document.querySelector('body'),
      'layout-top-nav'
    );
  }
}
