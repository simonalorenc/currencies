export type Result = Info[]

export interface Info {
  table: string
  no: string
  effectiveDate: string
  rates: Rate[]
}

export interface Rate {
  currency: string
  code: string
  mid: number
}
//exchange rates from last 7 days
export interface Root {
  table: string
  currency: string
  code: string
  rates: DetailRate[]
}

export interface DetailRate {
  no: string
  effectiveDate: string
  mid: number
}