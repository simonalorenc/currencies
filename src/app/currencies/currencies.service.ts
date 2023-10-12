import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, concatMap, map } from 'rxjs';
import { Rate, Result } from '../currency';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private API: string = 'http://api.nbp.pl/api/exchangerates';

  constructor(private http: HttpClient) {}

  //jak połączyć 2 streamy rx w jeden, concat, zip
  private getCurrenciesInfo(tableName: string): Observable<Result> {
    const API_CURRENCIES = `${this.API}/tables/${tableName}`;
    return this.http.get<Result>(API_CURRENCIES);
  }

  getCurrenciesRatesObservable(): Observable<Rate[]> {
    const tableA = this.getCurrenciesInfo('A');
    const tableB = this.getCurrenciesInfo('B');
    return tableA.pipe(
      concatMap(() => tableB),
      map(result => result[0].rates)
    )
  }
}
