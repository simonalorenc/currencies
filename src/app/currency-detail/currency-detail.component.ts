import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrenciesService } from '../currencies/currencies.service';
import { DetailRate, Rate } from '../currency';
import { FlagsService } from '../flags.service';
import { CurrenciesRepository } from '../currencies-repository';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartService } from '../chart.service';
Chart.register(...registerables);

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss']
})
export class CurrencyDetailComponent implements OnInit{
  code!: string
  rate!: Rate
  currencyArray: DetailRate[] = []
  currencyArrayReady: boolean = false
  flagUrl!: string

  constructor(private route: ActivatedRoute, private currenciesService: CurrenciesService, private flagsService: FlagsService, private currenciesRepository: CurrenciesRepository) {
    this.code = this.route.snapshot.paramMap.get('code')?.toLowerCase()!
  }

  ngOnInit(): void {
    this.getCurrencyName()
  }

  getCurrencyName(): void {
    this.rate = this.currenciesService.getCurrencyDetails(this.code)
    const countryCode = this.currenciesRepository.getCountryCode(this.code)
    this.getCurrencyDetails(this.code)
    this.flagUrl = this.flagsService.getFlagUrl(countryCode)
  }

  getCurrencyDetails(code: string): void {
    this.currenciesService.getCurrencyFromLastDays(code).subscribe(
      (currencies) => {
        this.currencyArray = currencies.rates
        this.currencyArrayReady = true
      } 
    )
  }

  getCountryFlag(code: string) {
    return this.flagsService.getFlagUrl(code)
  }
}

