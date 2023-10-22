import { Injectable } from '@angular/core';
import { ExchangeRateService } from './currencies/exchange-rate.service';
import { FlagsService } from './flags.service';
import { Observable, map } from 'rxjs';
import { RateDto } from './exchange-table-dto';
import { RateWithFlag } from './rate-with-flag';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesRepository {
  constructor(
    private currenciesService: ExchangeRateService,
    private flagsService: FlagsService
  ) {}

  getRatesWithFlags(): Observable<RateWithFlag[]> {
    return this.currenciesService.getAllRateDtos().pipe(
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
