import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReembolsoComponent } from './reembolso/reembolso.component';
import { TermoDeUsoComponent } from './termo-de-uso/termo-de-uso.component';
import { TermoDeServicoComponent } from './termo-de-servico/termo-de-servico.component';



@NgModule({
  declarations: [
    ReembolsoComponent,
    TermoDeUsoComponent,
    TermoDeServicoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PoliciesModule { }
