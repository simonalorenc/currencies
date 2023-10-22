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

  export class CurrencyRate {
    date: string
    mid: number

    constructor(dto: CurrencyRateDto) {
      this.date = dto.effectiveDate
      this.mid = dto.mid
    }
  }