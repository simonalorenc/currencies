import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
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
  currenciesDatesArray: string[] = []
  currencyOneMonthDatesArray: string[] = []

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
    const API_EXCHANGE_RATES_A = `${this.API}/rates/a/${code}/last/7/`
    const API_EXCHANGE_RATES_B = `${this.API}/rates/b/${code}/last/7/`
    return this.http.get<ResultOneCurrency>(API_EXCHANGE_RATES_A).pipe(
      catchError((error) => {
        console.error('Error for table A: ' + error)
        return this.http.get<ResultOneCurrency>(API_EXCHANGE_RATES_B)
      })
    )
  }

  getCurrencyFromLastMonths(code: string, date: string): Observable<ResultOneCurrency> {
    const API_EXCHANGE_RATES_A = `${this.API}/rates/a/${code}/${date}/`
    const API_EXCHANGE_RATES_B = `${this.API}/rates/b/${code}/${date}/`
    return this.http.get<ResultOneCurrency>(API_EXCHANGE_RATES_A).pipe(
      catchError((error) => {
        console.error('Error for table A: ' + error)
        return this.http.get<ResultOneCurrency>(API_EXCHANGE_RATES_B)
      })
    )
  }

  getDates() {
    this.currenciesDatesArray = []
    for(let i = 0; i < 3; i++) {
      const date = new Date
      date.setMonth(date.getMonth() - i)
      date.setDate(date.getDate() - 1)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      this.currenciesDatesArray.push(`${year}-${month}-${day}`)
      console.log(`${year}-${month}-${day}`)
    }
    console.log('console: ' + this.currenciesDatesArray)
    return this.currenciesDatesArray
  }

  getDatesToMonthExchangeRate() {
    this.currencyOneMonthDatesArray = []
    const startDate = new Date
    startDate.setDate(startDate.getDate() - 30)
    startDate.setDate(startDate.getDate() - 1)
    const startYear = startDate.getFullYear()
    const startMonth = String(startDate.getMonth() + 1).padStart(2, '0')
    const startDay = String(startDate.getDate()).padStart(2, '0')

    const endDate = new Date
    endDate.setDate(endDate.getDate() - 1)
    const endYear = endDate.getFullYear()
    const endMonth = String(endDate.getMonth() + 1).padStart(2, '0')
    const endDay = String(endDate.getDate()).padStart(2, '0')

    this.currencyOneMonthDatesArray.push(`${startYear}-${startMonth}-${startDay}`)
    this.currencyOneMonthDatesArray.push(`${endYear}-${endMonth}-${endDay}`)
    console.log(this.currencyOneMonthDatesArray)
    return this.currencyOneMonthDatesArray
  }

  getCurrencyOneMonth(code: string, startDate: string, endDate: string): Observable<ResultOneCurrency> {
    const API_EXCHANGE_RATES_A = `${this.API}/rates/a/${code}/${startDate}/${endDate}`
    const API_EXCHANGE_RATES_B = `${this.API}/rates/b/${code}/${startDate}/${endDate}`
    return this.http.get<ResultOneCurrency>(API_EXCHANGE_RATES_A).pipe(
      catchError((error) => {
        console.error('Error for table A: ' + error)
        return this.http.get<ResultOneCurrency>(API_EXCHANGE_RATES_B)
      })
    )
  }
}


