import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  catchError,
  combineLatest,
  map 
} from 'rxjs';
import { ExchangeTableDto, RateDto } from './exchange-table-dto';
import { CurrencyExchangeTableDto } from './currency-exchange-table-dto';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private BASE_URL: string = 'http://api.nbp.pl/api/exchangerates';

  constructor(private http: HttpClient) {
  }

  private getExchangeTableDtos(tableName: string): Observable<ExchangeTableDto[]> {
    const exchangeTableUrl = `${this.BASE_URL}/tables/${tableName}`;
    return this.http.get<ExchangeTableDto[]>(exchangeTableUrl);
  }

  getAllRateDtos(): Observable<RateDto[]> {
    const tableA = this.getExchangeTableDtos('A');
    const tableB = this.getExchangeTableDtos('B');
    return combineLatest([tableA, tableB]).pipe(
      map(([resultA, resultB]) => {
        const ratesA = resultA[0].rates;
        const ratesB = resultB[0].rates;
        return [...ratesA, ...ratesB];
      })
    );
  }

  getCurrencyExchangeTableDtoFromLastDays(code: string, days: number): Observable<CurrencyExchangeTableDto> {
    const tableAUrl = `${this.BASE_URL}/rates/a/${code}/last/${days}/`;
    const tableBUrl = `${this.BASE_URL}/rates/b/${code}/last/${days}/`;
    return this.http.get<CurrencyExchangeTableDto>(tableAUrl).pipe(
      catchError(() => this.http.get<CurrencyExchangeTableDto>(tableBUrl))
    );
  }

  getCurrencyExchangeTableDtoForDateRange(
    code: string,
    startDate: string,
    endDate: string
  ): Observable<CurrencyExchangeTableDto> {
    const tableAUrl = `${this.BASE_URL}/rates/a/${code}/${startDate}/${endDate}`;
    const tableBUrl = `${this.BASE_URL}/rates/b/${code}/${startDate}/${endDate}`;
    return this.http.get<CurrencyExchangeTableDto>(tableAUrl).pipe(
      catchError(() => this.http.get<CurrencyExchangeTableDto>(tableBUrl))
    );
  }
}