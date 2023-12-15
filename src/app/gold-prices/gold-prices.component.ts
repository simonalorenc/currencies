import { Component, OnInit } from '@angular/core';
import { GoldPriceService } from './data/gold-price.service';
import { GoldPrice } from './data/gold-price';
import { DatesService } from '../dates.service';

@Component({
  selector: 'app-gold-prices',
  templateUrl: './gold-prices.component.html',
  styleUrls: ['./gold-prices.component.scss'],
})
export class GoldPricesComponent implements OnInit {
  goldPrices: GoldPrice[] = [];
  currentPage: number = 1
  newDates: string[] = []

  constructor(private goldPriceService: GoldPriceService, private datesService: DatesService) {
  }

  ngOnInit(): void {
    this.getGoldPricesFromLastDays()
  }

  getGoldPricesFromLastDays(): void {
    this.newDates = this.datesService.getStartAndEndDate(13)
    this.displayGoldPrices()
  }

  onPageChangeNext(): void {
    this.currentPage = this.currentPage + 1
    this.getDates(this.currentPage)
  }

  onPageChangePrevious(): void {
    if(this.currentPage > 1) {
      this.currentPage = this.currentPage - 1
      this.getDates(this.currentPage)
    } 
    this.checkIfCurrentPageIsEqualToOne()
  }

  checkIfCurrentPageIsEqualToOne() {
    if (this.currentPage === 1){
      this.currentPage = 1
      this.newDates = this.datesService.getStartAndEndDate(13)
      this.displayGoldPrices()
    }
  }

  getDates(pageNumber: number): void {
    let x = 14
    const endDate = new Date()
    endDate.setDate(endDate.getDate() - ((pageNumber - 1) * x + 1))
    const endDateString = this.datesService.getFormattedDate(endDate)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - (pageNumber * x))
    const startDateString = this.datesService.getFormattedDate(startDate)

    this.newDates = [startDateString, endDateString]
    this.displayGoldPrices()
  }

  onPageChangeToFirst(): void {
    this.currentPage = 1
    this.newDates = this.datesService.getStartAndEndDate(13)
    this.getGoldPricesFromLastDays()
  }

  displayGoldPrices(): void {
    this.goldPriceService.getGoldPricesDtoFromRangeTime(this.newDates[0], this.newDates[1]).subscribe(
      result => {
        const allDates = this.getAllDatesInRange();
        const pricesMap = new Map<string, number>();
        result.reverse().forEach(dto => {
          const goldPrice = new GoldPrice(dto);
          pricesMap.set(goldPrice.date, goldPrice.price);
        });

        this.goldPrices = allDates.reverse().map(date => ({
          date: date,
          price: pricesMap.get(date) !== undefined ? pricesMap.get(date)! : -1
        }));
      }
    );
  }
  
  getAllDatesInRange(): string[] {
    const allDates: string[] = []
    let currentDate = new Date(this.newDates[0]);
    const endDateObj = new Date(this.newDates[1]);
    while (currentDate <= endDateObj) {
      allDates.push(this.datesService.getFormattedDate(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    // console.log(this.newDates)
    // console.log(allDates)
    return allDates
  }
}
