import { GoldPriceDto } from "./gold-price-dto"

export class GoldPrice {
  date: string
  price: number

  constructor(dto: GoldPriceDto) {
    this.date = dto.data
    this.price = dto.cena 
  }
}