export interface GoldPriceDto {
  data: string
  cena: number
}

export class GoldPrice {
  date: string
  price: number

  constructor(dto: GoldPriceDto) {
    this.date = dto.data
    this.price = dto.cena 
  }
}