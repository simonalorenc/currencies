import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrenciesService } from '../currencies/currencies.service';
import { DetailRate, Rate } from '../currency';
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
  code!: string;
  currencyArray: DetailRate[] = [];
  flagUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private currenciesService: CurrenciesService,
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
      .getCurrencyFromLastDays(code)
      .subscribe((currencies) => {
        this.currencyArray = currencies.rates.reverse();
      });
  }
}
