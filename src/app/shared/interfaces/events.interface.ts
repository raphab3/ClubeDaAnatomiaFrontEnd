export enum EventStatus {
  ATIVO = "ativo",
  INATIVO = "inativo",
}

export default interface IEVENTDTO {
  id: string
  title: string
  description: string
  unit_price: number
  periodo: string
  status: EventStatus
  destaque: boolean
  ordem_slider: number
  img_banner: string
  picture_url: string
  carga_horaria: string
  img_cert_p1: string
  img_cert_p2: string
}
