import { Component } from '@angular/core';
import { ChartService } from '../chart.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyRateDto } from 'src/app/currency/data/currency-exchange-table-dto';
import { ExchangeRateService } from 'src/app/currency/data/exchange-rate.service';

@Component({
  selector: 'app-chart-from-last-months',
  templateUrl: './chart-from-last-months.component.html',
  styleUrls: ['./chart-from-last-months.component.scss']
})
export class ChartFromLastMonthsComponent {
  code!: string
  currencyForMonthsChart: number[] = [];
  currencyDatesForMonthsChart: string[] = [];
  averageRateArray: number[] = []
  monthArray: string[] = []

  constructor(private chartService: ChartService, private currenciesService: ExchangeRateService ,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.code = params.get('code') || ''
    })
    this.createChartFromLastMonths()
  }

  createChartFromLastMonths() {
    const datesArray = this.getStartAndEndDate()
    const firstMonthCurrencyArray: CurrencyRateDto[] = []
    const secondMonthCurrencyArray: CurrencyRateDto[] = []
    const thirdMonthCurrencyArray: CurrencyRateDto[] = []
    const data = new Date((datesArray[0].slice(0, -3)) + "-01")
    data.setMonth(data.getMonth() + 1)
    const middleMonth = data.toISOString().slice(0, 7)
    this.currenciesService.getCurrencyExchangeTableDtoForDateRange(this.code, datesArray[0], datesArray[1]).subscribe(
      currency => {
        const allArray = currency.rates
        allArray.forEach((element) => {
          if(element.effectiveDate.includes(datesArray[0].slice(0,-3))) {
            firstMonthCurrencyArray.push(element)
          } else if(element.effectiveDate.includes(middleMonth)) {
            secondMonthCurrencyArray.push(element)
          } else if(element.effectiveDate.includes(datesArray[1].slice(0,-3))) {
            thirdMonthCurrencyArray.push(element)
          }
        })
        const firstSum = firstMonthCurrencyArray.reduce((accumulator, currentValue) => accumulator + currentValue.mid, 0)
        const secondSum = secondMonthCurrencyArray.reduce((accumulator, currentValue) => accumulator + currentValue.mid, 0)
        const thirdSum = thirdMonthCurrencyArray.reduce((accumulator, currentValue) => accumulator + currentValue.mid, 0)
        this.averageRateArray = [firstSum / firstMonthCurrencyArray.length, secondSum / secondMonthCurrencyArray.length, thirdSum / thirdMonthCurrencyArray.length]
        const firstMonth = firstMonthCurrencyArray[0].effectiveDate.split('-')
        const secondMonth = secondMonthCurrencyArray[0].effectiveDate.split('-')
        const thirdMonth = thirdMonthCurrencyArray[0].effectiveDate.split('-')
        this.monthArray = [firstMonth[1], secondMonth[1], thirdMonth[1]]
        this.chartService.createChart(this.monthArray, this.averageRateArray, 'chartFormLastMonths')
      } 
    )
  }

  private getStartAndEndDate(): string[] {
    const todayDate = new Date()
    const endDateString = this.getFormattedDate(todayDate)
    const startDate = todayDate
    startDate.setMonth(todayDate.getMonth() - 2)
    startDate.setDate(1)
    const startDateString = this.getFormattedDate(startDate)
    // return new DateRange(startDateString, endDateString)
    return [startDateString, endDateString]
  }

  private getFormattedDate(date: Date): string {
    const yearString = date.getFullYear().toString()
    const monthString = (date.getMonth() + 1).toString().padStart(2, '0')
    const dayString = date.getDate().toString().padStart(2, '0')
    return yearString + "-" + monthString + "-" + dayString
  }
}
