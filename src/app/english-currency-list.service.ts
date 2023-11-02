import { Injectable } from '@angular/core';
import * as jsonData from '../assets/en.json';
import { RateWithFlag } from './currency/data/rate-with-flag';
import { CurrencyExchangeTableDto } from './currency/data/currency-exchange-table-dto';

@Injectable({
  providedIn: 'root'
})
export class EnglishCurrencyListService {
  data: any = jsonData

  constructor() { }

  updateCurrencyIfNeeded(locale: string, ratesWithFlag: RateWithFlag[]): RateWithFlag[] {
    if(locale === 'en-US') {
      ratesWithFlag.forEach((rateWithFlag) => {
        rateWithFlag.rate.currency = this.data[rateWithFlag.rate.code];
      });
    }
    return ratesWithFlag
  }

  updateDetailCurrency(locale: string, rate: CurrencyExchangeTableDto) {
    if(locale === 'en-US') {
      rate.currency = this.data[rate.code]
    }
    return rate
  }
}
