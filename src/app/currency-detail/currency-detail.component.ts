import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrenciesService } from '../currencies/currencies.service';
import { DetailRate, Rate } from '../currency';
import { FlagsService } from '../flags.service';
import { CurrenciesRepository } from '../currencies-repository';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss']
})
export class CurrencyDetailComponent implements OnInit{
  currency!: Rate
  currencyArray: DetailRate[] = []
  flagUrl!: string

  constructor(private route: ActivatedRoute, private currenciesService: CurrenciesService, private flagsService: FlagsService, private currenciesRepository: CurrenciesRepository) {}

  ngOnInit(): void {
    this.getCurrencyName()
  }

  getCurrencyName(): void {
    const code = this.route.snapshot.paramMap.get('code')!
    this.currency = this.currenciesService.getCurrencyDetails(code)
    const countryCode = this.currenciesRepository.getCountryCode(code)
    console.log(this.currency)
    this.getCurrencyDetails(code)
    this.flagUrl = this.flagsService.getFlagUrl(countryCode)
  }

  getCurrencyDetails(code: string): void {
    this.currenciesService.getCurrencyFromLastDays(code).subscribe(
      (currencies) => this.currencyArray = currencies.rates
    )
  }

  getCountryFlag(code: string) {
    return this.flagsService.getFlagUrl(code)
  }
}

