import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  of,
  zip,
} from 'rxjs';
import { Info, Rate, ResultCurrencies, ResultOneCurrency } from '../currency';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private API: string = 'http://api.nbp.pl/api/exchangerates';
  currenciesArray: Rate[] = []

  constructor(private http: HttpClient) {}

  private getCurrenciesInfo(tableName: string): Observable<ResultCurrencies> {
    const API_CURRENCIES = `${this.API}/tables/${tableName}`;
    return this.http.get<ResultCurrencies>(API_CURRENCIES);
  }

  getCurrenciesRatesObservable(): Observable<Rate[]> {
    const tableA = this.getCurrenciesInfo('A');
    const tableB = this.getCurrenciesInfo('B');
    return combineLatest([tableA, tableB]).pipe(
      map(([resultA, resultB]) => {
        const ratesA = resultA[0].rates;
        const ratesB = resultB[0].rates;
        this.currenciesArray = [...ratesA, ...ratesB]
        return this.currenciesArray;
      })
    );
  }

  getCurrencyDetails(code: string): Rate {
    const rate = this.currenciesArray.find((c:any) => c.code === code)!
    return rate
  }

  getCurrencyFromLastDays(code: string): Observable<ResultOneCurrency> {
    const API_EXCHANGE_RATES = `${this.API}/rates/a/${code}/last/7/`
    return this.http.get<ResultOneCurrency>(API_EXCHANGE_RATES)
  }
}
