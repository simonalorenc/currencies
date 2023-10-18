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
  currency!: Rate
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
    this.example().subscribe(result => {
      this.currencyForMonthsChart = result
      console.log(this.currencyMonthArray)
      this.chartService.renderChart(this.currencyDatesForMonthsChart, this.currencyForMonthsChart, 'chart')
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
    this.chartService.renderChart(this.currencyDatesForChart, this.currencyForChart, 'piechart')
  }

  completeCurrencyArraysForMonthsChart() {
    const firstDate = this.currenciesService.getFirstDate()
    const secondDate = this.currenciesService.getSecondDate()
    const thirdDate = this.currenciesService.getThirdDate()
    
    this.currencyDatesForMonthsChart.push(firstDate)
    this.currencyDatesForMonthsChart.push(secondDate)
    this.currencyDatesForMonthsChart.push(thirdDate)
  }

  example() {
    const countryCode = this.route.snapshot.paramMap.get('code')!
    const firstMonth = this.currenciesService.getCurrencyFromLastMonths(countryCode, this.currencyDatesForMonthsChart[0])
    const secondMonth = this.currenciesService.getCurrencyFromLastMonths(countryCode, this.currencyDatesForMonthsChart[1])
    const thirdMonth = this.currenciesService.getCurrencyFromLastMonths(countryCode, this.currencyDatesForMonthsChart[2])
    return combineLatest([firstMonth, secondMonth, thirdMonth]).pipe(
      map(([a, b, c]) => {
        const currencyA = a.rates.map(rate => rate.mid)
        const currencyB = b.rates.map(rate => rate.mid)
        const currencyC = c.rates.map(rate => rate.mid)
        return [...currencyA, ...currencyB, ...currencyC]
      }),
      catchError(error => {
        console.error('Błąd w combineLatest ' + error)
        return EMPTY
      })
    )
  }

  // getCurrencyDetails(code: string): void {
  //   this.currenciesService.getCurrencyFromLastDays(code).subscribe(
  //     (currencies) => {
  //       this.currencyArray = currencies.rates
  //       this.currencyArrayReady = true
  //     } 
  //   )
  // }


  // getCurrenciesRatesObservable(): Observable<Rate[]> {
  //   const tableA = this.getCurrenciesInfo('A');
  //   const tableB = this.getCurrenciesInfo('B');
  //   return combineLatest([tableA, tableB]).pipe(
  //     map(([resultA, resultB]) => {
  //       const ratesA = resultA[0].rates;
  //       const ratesB = resultB[0].rates;
  //       this.currenciesArray = [...ratesA, ...ratesB]
  //       return this.currenciesArray;
  //     })
  //   );
  // }

}

// getCurrencyDetails(code: string): void {
//   this.currenciesService.getCurrencyFromLastDays(code).subscribe(
//     (currencies) => {
//       this.currencyArray = currencies.rates
//       this.currencyArrayReady = true
//     } 
//   )
// }
