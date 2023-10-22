import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'node_modules/chart.js';
import { CurrencyExchangeTableDto, CurrencyRate } from '../data/currency-exchange-table-dto';
import { ExchangeRateService } from '../data/exchange-rate.service';
import { FlagsService } from '../data/flags.service';
import { CurrenciesRepository } from '../data/currencies-repository';
Chart.register(...registerables);

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss'],
})
export class CurrencyDetailComponent implements OnInit {
  private NUMBER_OF_LAST_DAYS: number = 7

  detailCurrency!: CurrencyExchangeTableDto
  code!: string;
  currencyRates: CurrencyRate[] = [];
  flagUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private exchangeRateService: ExchangeRateService,
    private flagsService: FlagsService,
    private currenciesRepository: CurrenciesRepository
  ) {
    this.code = this.route.snapshot.paramMap.get('code')!.toLowerCase();
  }

  ngOnInit(): void {
    this.getCurrencyDetailsAndFlagUrl();
  }

  private getCurrencyDetailsAndFlagUrl(): void {
    const countryCode = this.currenciesRepository.getCountryCode(this.code);
    this.getCurrencyDetails(this.code);
    this.flagUrl = this.flagsService.getFlagUrl(countryCode);
  }

  private getCurrencyDetails(code: string): void {
    this.exchangeRateService
      .getCurrencyExchangeTableDtoFromLastDays(code, this.NUMBER_OF_LAST_DAYS)
      .subscribe((currency) => {
        this.detailCurrency = currency
        const currencyRatesDto = currency.rates.reverse();
        this.currencyRates = currencyRatesDto.map(rate => new CurrencyRate(rate))
      });
  }
}