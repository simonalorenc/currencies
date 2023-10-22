import { Injectable } from '@angular/core';
import { CurrenciesService } from './currencies/currencies.service';
import { FlagsService } from './flags.service';
import { Observable, map, of } from 'rxjs';
import { RateDto } from './exchange-table-dto';
import { RateWithFlag } from './rate-with-flag';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesRepository {
  constructor(
    private currenciesService: CurrenciesService,
    private flagsService: FlagsService
  ) {}

  getRatesWithFlagsObservable(): Observable<RateWithFlag[]> {
    return this.currenciesService.getCurrenciesRatesObservable().pipe(
      map((rates: RateDto[]) => {
        return rates.map((rate: RateDto) => {
          const countryCode = this.getCountryCode(rate.code);
          const flagUrl = this.flagsService.getFlagUrl(countryCode);
          return new RateWithFlag(rate, flagUrl);
        });
      })
    );
  }

  getCountryCode(currencyCode: string): string {
    return currencyCode.slice(0, -1).toLowerCase();
  }
}
