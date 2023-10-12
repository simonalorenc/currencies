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