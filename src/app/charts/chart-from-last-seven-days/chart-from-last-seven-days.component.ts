import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';
import { ActivatedRoute } from '@angular/router';
import { ExchangeRateService } from 'src/app/currency/data/exchange-rate.service';

@Component({
  selector: 'app-chart-from-last-seven-days',
  templateUrl: './chart-from-last-seven-days.component.html',
  styleUrls: ['./chart-from-last-seven-days.component.scss'],
})
export class ChartFromLastSevenDaysComponent implements OnInit {
  private NUMBER_OF_LAST_DAYS: number = 7;
  private CHART_ID = 'chartFromSevenDays';

  constructor(
    private chartService: ChartService,
    private exchangeRateService: ExchangeRateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      const code = params.get('code') || '';
      this.createChartFromLastSevenDays(code);
    });
  }

  private createChartFromLastSevenDays(code: string): void {
    this.exchangeRateService
      .getCurrencyExchangeTableDtoFromLastDays(code, this.NUMBER_OF_LAST_DAYS)
      .subscribe((result) => {
        const chartData = result.rates.map((rate) => rate.mid);
        const chartLabels = result.rates.map((rate) => rate.effectiveDate);
        this.chartService.createChart(chartLabels, chartData, this.CHART_ID);
      });
  }
}
