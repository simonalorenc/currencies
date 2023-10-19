import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartService } from '../chart.service';
import { ActivatedRoute } from '@angular/router';
import { DetailRate } from '../currency';
import { CurrenciesService } from '../currencies/currencies.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  private code!: string;

  constructor(
    private chartService: ChartService,
    private currenciesService: CurrenciesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    Chart.register(...registerables);
    //TODO: zmienic na get jak w innych miejscach
    let x = this.route.parent?.snapshot.paramMap.get('code');

    this.route.parent?.paramMap.subscribe((params) => {
      this.code = params.get('code') || '';
      this.getCurrencyDetails(this.code);
    });
  }

  private getCurrencyDetails(code: string): void {
    // TODO: takie samo zapytanie jak w currency-details najlepiej przenieść rezultat do serwisu/cache
    this.currenciesService
      .getCurrencyFromLastDays(code)
      .subscribe((currencies) => {
        this.completeCurrencyArraysForChart(currencies.rates);
      });
  }

  private completeCurrencyArraysForChart(currencyDetails: DetailRate[]): void {
    const currencyForChart = currencyDetails.map((rate) => rate.mid);
    const currencyDatesForChart = currencyDetails.map(
      (rate) => rate.effectiveDate
    );
    this.chartService.renderChart(
      currencyDatesForChart,
      currencyForChart,
      'chartFromSevenDays'
    );
  }
}
