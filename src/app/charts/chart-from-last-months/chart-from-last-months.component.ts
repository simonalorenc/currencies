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

  constructor(private chartService: ChartService, private exchangeRateService: ExchangeRateService ,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const code = params.get('code') || ''
      this.createChartFromLastMonths(code)
    })
  }

  createChartFromLastMonths(code: string) {
    const datesArray = this.getStartAndEndDate()

    const firstMonthExchangeRates: CurrencyRateDto[] = []
    const secondMonthExchangeRates: CurrencyRateDto[] = []
    const thirdMonthExchangeRates: CurrencyRateDto[] = []

    const data = new Date((datesArray[0].slice(0, -3)) + "-01")
    data.setMonth(data.getMonth() + 1)
    const middleMonth = data.toISOString().slice(0, 7)
    
    this.exchangeRateService.getCurrencyExchangeTableDtoForDateRange(code, datesArray[0], datesArray[1]).subscribe(
      currency => {
        const allMonthsExchangeRates = currency.rates
        allMonthsExchangeRates.forEach((element) => {
          if(element.effectiveDate.includes(datesArray[0].slice(0,-3))) {
            firstMonthExchangeRates.push(element)
          } else if(element.effectiveDate.includes(middleMonth)) {
            secondMonthExchangeRates.push(element)
          } else if(element.effectiveDate.includes(datesArray[1].slice(0,-3))) {
            thirdMonthExchangeRates.push(element)
          }
        })

        const firstSum = firstMonthExchangeRates.reduce((accumulator, currentValue) => accumulator + currentValue.mid, 0)
        const secondSum = secondMonthExchangeRates.reduce((accumulator, currentValue) => accumulator + currentValue.mid, 0)
        const thirdSum = thirdMonthExchangeRates.reduce((accumulator, currentValue) => accumulator + currentValue.mid, 0)

        const averageRateArray = [firstSum / firstMonthExchangeRates.length, secondSum / secondMonthExchangeRates.length, thirdSum / thirdMonthExchangeRates.length]
        
        const firstMonth = firstMonthExchangeRates[0].effectiveDate.split('-')
        const secondMonth = secondMonthExchangeRates[0].effectiveDate.split('-')
        const thirdMonth = thirdMonthExchangeRates[0].effectiveDate.split('-')

        const monthArray = [firstMonth[1], secondMonth[1], thirdMonth[1]]

        this.chartService.createChart(monthArray, averageRateArray, 'chartFormLastMonths')
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
    return [startDateString, endDateString]
  }

  private getFormattedDate(date: Date): string {
    const yearString = date.getFullYear().toString()
    const monthString = (date.getMonth() + 1).toString().padStart(2, '0')
    const dayString = date.getDate().toString().padStart(2, '0')
    return yearString + "-" + monthString + "-" + dayString
  }
}
