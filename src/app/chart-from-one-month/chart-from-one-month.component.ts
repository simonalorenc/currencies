import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';
import { CurrenciesService } from '../currencies/currencies.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyRateDto } from '../currency-exchange-table-dto';

@Component({
  selector: 'app-chart-from-one-month',
  templateUrl: './chart-from-one-month.component.html',
  styleUrls: ['./chart-from-one-month.component.scss']
})
export class ChartFromOneMonthComponent implements OnInit{
  code!: string
  datesToApi: string[] =[]
  currencyArray!: CurrencyRateDto[]
  currencyForOneMonthChart: number[] = [];
  currencyDatesForOneMonthChart: string[] = [];

  constructor(private chartService: ChartService, private currenciesService: CurrenciesService ,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.code = params.get('code') || ''
    })
    this.completeDatesArrayToApi()
    this.completeArrays()
  }

  completeDatesArrayToApi() {
    this.datesToApi = this.currenciesService.getDatesToMonthExchangeRate()
  }

  completeArrays() {
    this.currenciesService.getCurrencyFromDateRange(this.code, this.datesToApi[0], this.datesToApi[1]).subscribe(
      (currency) => {
        this.currencyArray = currency.rates
        this.currencyForOneMonthChart = this.currencyArray.map(
          rate => rate.mid
        )
        this.currencyDatesForOneMonthChart = this.currencyArray.map(
          rate => rate.effectiveDate
        )
        this.chartService.createChart(this.currencyDatesForOneMonthChart, this.currencyForOneMonthChart, 'chartFormOneMonth')
      }
    )
  }
}
