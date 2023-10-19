import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartService } from '../chart.service';
import { ActivatedRoute, Route } from '@angular/router';
import { DetailRate, Rate } from '../currency';
import { CurrenciesService } from '../currencies/currencies.service';
import { EMPTY, catchError, combineLatest, map } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit{
  @Input() currencyArray!: DetailRate[]
  currencyMonthArray: number[] = []
  currencyForChart: number[] = [];
  currencyDatesForChart: string[] = [];
  currencyForMonthsChart: number[] = [];
  currencyDatesForMonthsChart: string[] = [];

  constructor(private chartService: ChartService, private currenciesService: CurrenciesService ,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.completeCurrencyArraysForChart()
    this.completeCurrencyArraysForMonthsChart()
    this.completeCurrencyArrayForMonthsChart().subscribe(result => {
      this.currencyForMonthsChart = result
      console.log(this.currencyForMonthsChart)
      this.chartService.renderChart(this.currencyDatesForMonthsChart, this.currencyForMonthsChart, 'chartFormLastMonths')
    })
  }

  getCountryCode(): string {
    return this.route.snapshot.paramMap.get('code')!;
  }

  completeCurrencyArraysForChart(): void {
    this.currencyForChart = this.currencyArray.map(
      (rate) => rate.mid
    )
    this.currencyDatesForChart = this.currencyArray.map(
      (rate) => rate.effectiveDate
    )
    this.chartService.renderChart(this.currencyDatesForChart, this.currencyForChart, 'chartFromSevenDays')
  }

  completeCurrencyArraysForMonthsChart() {
    this.currencyDatesForMonthsChart = this.currenciesService.getDates()
  }

  completeCurrencyArrayForMonthsChart() {
    const countryCode = this.route.snapshot.paramMap.get('code')?.toLowerCase()!
    const firstMonth = this.currenciesService.getCurrencyFromLastMonths(countryCode, this.currencyDatesForMonthsChart[0])
    const secondMonth = this.currenciesService.getCurrencyFromLastMonths(countryCode, this.currencyDatesForMonthsChart[1])
    const thirdMonth = this.currenciesService.getCurrencyFromLastMonths(countryCode, this.currencyDatesForMonthsChart[2])
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