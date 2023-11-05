import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ExchangeRateService } from './exchange-rate.service';
import { RateWithFlag } from './rate-with-flag';
import { RateDto } from './exchange-table-dto';
import { FlagsService } from './flags.service';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesRepository {
  constructor(
    private exchangeRateService: ExchangeRateService,
    private flagsService: FlagsService
  ) {}

  getRatesWithFlags(): Observable<RateWithFlag[]> {
    return this.exchangeRateService.getAllRateDtos().pipe(
      map((rates: RateDto[]) => {
        return rates.map((rate: RateDto) => {
          const countryCode = this.getCountryCode(rate.code);
          const flagUrl = this.flagsService.getFlagUrl(countryCode);
          return new RateWithFlag(rate, flagUrl, false);
        });
      })
    );
  }

  getCountryCode(currencyCode: string): string {
    return currencyCode.slice(0, -1).toLowerCase();
  }
}
