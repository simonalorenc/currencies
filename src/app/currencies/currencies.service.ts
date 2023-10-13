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
import { Rate, Result } from '../currency';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private API: string = 'http://api.nbp.pl/api/exchangerates';
  currenciesArray: Rate[] = []

  constructor(private http: HttpClient) {}

  //jak połączyć 2 streamy rx w jeden, concat, zip
  private getCurrenciesInfo(tableName: string): Observable<Result> {
    const API_CURRENCIES = `${this.API}/tables/${tableName}`;
    return this.http.get<Result>(API_CURRENCIES);
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

  getCurrencyDetails(code: string): Observable<Rate> {
    const currency = this.currenciesArray.find((c:any) => c.code === code)!
    return of(currency)
  }

  // getCurrencyFromLastDays(): Observable<Rate> {

  // }
}
