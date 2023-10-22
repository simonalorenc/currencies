export interface CurrencyExchangeTableDto {
    table: string
    currency: string
    code: string
    rates: CurrencyRateDto[]
  }
  
  export interface CurrencyRateDto {
    no: string
    effectiveDate: string
    mid: number
  }