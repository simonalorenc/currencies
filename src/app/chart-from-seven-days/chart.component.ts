import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartService } from '../chart.service';
import { ActivatedRoute } from '@angular/router';
import { DetailRate } from '../currency';
import { CurrenciesService } from '../currencies/currencies.service';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit{
  code: string = ''
  currencyArray!: DetailRate[]
  currencyForChart: number[] = [];
  currencyDatesForChart: string[] = [];

  constructor(private chartService: ChartService, private currenciesService: CurrenciesService ,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.code = params.get('code') || ''
      this.getCurrencyDetails(this.code)
    })
  }

  getCurrencyDetails(code: string): void {
    this.currenciesService.getCurrencyFromLastDays(code).subscribe(
      (currencies) => {
        this.currencyArray = currencies.rates
        this.completeCurrencyArraysForChart()
      } 
    )
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
}