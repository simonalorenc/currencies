import { Component } from '@angular/core';
import { CurrenciesService } from '../currencies/currencies.service';
import { ChartService } from '../chart.service';
import { ActivatedRoute } from '@angular/router';
import { DetailRate } from '../currency';

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

  constructor(private chartService: ChartService, private currenciesService: CurrenciesService ,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.code = params.get('code') || ''
    })
    this.createChartFromLastMonths()
  }

  createChartFromLastMonths() {
    const datesArray = this.currenciesService.getStartAndEndDate()
    const firstMonthCurrencyArray: DetailRate[] = []
    const secondMonthCurrencyArray: DetailRate[] = []
    const thirdMonthCurrencyArray: DetailRate[] = []
    const data = new Date((datesArray[0].slice(0, -3)) + "-01")
    data.setMonth(data.getMonth() + 1)
    const middleMonth = data.toISOString().slice(0, 7)
    this.currenciesService.getCurrencyFromDateRange(this.code, datesArray[0], datesArray[1]).subscribe(
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

}
