import { Component, OnInit } from '@angular/core';
import { GoldPriceService } from './data/gold-price.service';
import { GoldPrice } from './data/gold-price';

@Component({
  selector: 'app-gold-prices',
  templateUrl: './gold-prices.component.html',
  styleUrls: ['./gold-prices.component.scss'],
})
export class GoldPricesComponent implements OnInit {
  goldPrices: GoldPrice[] = [];
  currentPage: number = 1
  newDates: string[] = []

  constructor(private goldPriceService: GoldPriceService) {
  }

  ngOnInit(): void {
    this.getGoldPricesFromLastDays()
  }

  getGoldPricesFromLastDays(): void {
    this.newDates = this.getStartAndEndDate()
    this.goldPriceService.getGoldPricesDtoFromRangeTime(this.newDates[0], this.newDates[1]).subscribe(
      result => {
        this.goldPrices = result.reverse().map(dto => new GoldPrice(dto))
      }
    )
  }

  onPageChangeNext() {
    let x = 14
    this.currentPage = this.currentPage + 1
    const endDate = new Date()
    endDate.setDate(endDate.getDate() - ((this.currentPage - 1) * x))
    const endDateString = this.getFormattedDate(endDate)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - (this.currentPage * x))
    const startDateString = this.getFormattedDate(startDate)
    this.newDates = [startDateString, endDateString]

    this.displayNextGoldPrices()
  }

  onPageChangePrevious() {
    let x = 14
    this.currentPage = this.currentPage - 1
    if(this.currentPage < 1) {
      this.currentPage = 1
    }
    const endDate = new Date()
    endDate.setDate(endDate.getDate() - ((this.currentPage - 1) * x))
    const endDateString = this.getFormattedDate(endDate)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - (this.currentPage * x))
    const startDateString = this.getFormattedDate(startDate)
    this.newDates = [startDateString, endDateString]

    this.displayNextGoldPrices()
  }

  displayNextGoldPrices() {
    this.goldPriceService.getGoldPricesDtoFromRangeTime(this.newDates[0], this.newDates[1]).subscribe(
      result => {
        this.goldPrices = result.reverse().map(dto => new GoldPrice(dto))
      }
    )
  }

  private getStartAndEndDate(): string[] {
    const todayDate = new Date()
    const endDateString = this.getFormattedDate(todayDate)
    const startDate = todayDate
    startDate.setDate(todayDate.getDate() - 14)
    const startDateString = this.getFormattedDate(startDate)
    return [startDateString, endDateString]
  }

  private getFormattedDate(date: Date): string {
    const yearString = date.getFullYear().toString()
    const monthString = (date.getMonth() + 1).toString().padStart(2, '0')
    const dayString = date.getDate().toString().padStart(2, '0')
    return yearString + "-" + monthString + "-" + dayString
  }
}
