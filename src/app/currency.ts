export type ResultCurrencies = Info[]

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
  flag: string
}

//exchange rates from last 7 days
export interface ResultOneCurrency {
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

export interface DetailRateWithFlag {
  rate: DetailRate
  flagUrl: string
}

export class RateWithFlag {
  rate: Rate
  flagUrl: string

  constructor(rate: Rate, flagUrl: string ) {
    this.rate = rate
    this.flagUrl = flagUrl
  }
}