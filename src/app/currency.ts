export type Root = Root2[]

export interface Root2 {
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