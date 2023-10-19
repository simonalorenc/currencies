import { Component, getDebugNode } from '@angular/core';
import { CurrenciesService } from '../currencies/currencies.service';
import { ChartService } from '../chart.service';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, catchError, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-chart-from-last-months',
  templateUrl: './chart-from-last-months.component.html',
  styleUrls: ['./chart-from-last-months.component.scss']
})
export class ChartFromLastMonthsComponent {
  code!: string
  currencyForMonthsChart: number[] = [];
  currencyDatesForMonthsChart: string[] = [];

  constructor(private chartService: ChartService, private currenciesService: CurrenciesService ,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.code = params.get('code') || ''
    })
    this.completeCurrencyDatesArraysForMonthsChart()
    this.completeCurrencyArrayForMonthsChart().subscribe(result => {
      this.currencyForMonthsChart = result
      this.chartService.renderChart(this.currencyDatesForMonthsChart, this.currencyForMonthsChart, 'chartFormLastMonths')
    })
  }

  completeCurrencyDatesArraysForMonthsChart() {
      this.currencyDatesForMonthsChart = this.currenciesService.getDates();
  }

  //Exchange rates
  completeCurrencyArrayForMonthsChart() {
    const firstMonth = this.currenciesService.getCurrencyFromLastMonths(this.code, this.currencyDatesForMonthsChart[0])
    const secondMonth = this.currenciesService.getCurrencyFromLastMonths(this.code, this.currencyDatesForMonthsChart[1])
    const thirdMonth = this.currenciesService.getCurrencyFromLastMonths(this.code, this.currencyDatesForMonthsChart[2])
    return combineLatest([firstMonth, secondMonth, thirdMonth]).pipe(
      map(([currencyResult1, currencyResult2, currencyResult3]) => {
        const currencyRate1 = currencyResult1.rates.map(rate => rate.mid)
        const currencyRate2 = currencyResult2.rates.map(rate => rate.mid)
        const currencyRate3 = currencyResult3.rates.map(rate => rate.mid)
        return [...currencyRate1, ...currencyRate2, ...currencyRate3]
      }),
      catchError(error => {
        console.error('Błąd w combineLatest ' + error)
        return EMPTY
      })
    )
  }
}
