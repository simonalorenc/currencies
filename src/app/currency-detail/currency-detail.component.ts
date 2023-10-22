import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExchangeRateService } from '../currencies/exchange-rate.service';
import { CurrencyRateDto } from '../currency-exchange-table-dto';
import { FlagsService } from '../flags.service';
import { CurrenciesRepository } from '../currencies-repository';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss'],
})
export class CurrencyDetailComponent implements OnInit {
  private NUMBER_OF_LAST_DAYS: number = 7

  code!: string;
  currencyArray: CurrencyRateDto[] = [];
  flagUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private currenciesService: ExchangeRateService,
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
    this.currenciesService
      .getCurrencyExchangeTableDtoFromLastDays(code, this.NUMBER_OF_LAST_DAYS)
      .subscribe((currencies) => {
        this.currencyArray = currencies.rates.reverse();
      });
  }
}
