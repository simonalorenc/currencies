import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  catchError,
  combineLatest,
  map,
  merge,
  onErrorResumeNext,
} from 'rxjs';
import { Rate, ResultCurrencies, ResultOneCurrency } from '../currency';
import { DatePipe, formatDate, getLocaleId } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private API: string = 'http://api.nbp.pl/api/exchangerates';

  private currenciesArray: Rate[] = [];

  constructor(private http: HttpClient) {
    this.getStartAndEndDate()
  }

  private getCurrencies(tableName: string): Observable<ResultCurrencies> {
    const currenciesUrl = `${this.API}/tables/${tableName}`;
    return this.http.get<ResultCurrencies>(currenciesUrl);
  }

  getCurrenciesRatesObservable(): Observable<Rate[]> {
    const tableA = this.getCurrencies('A');
    const tableB = this.getCurrencies('B');
    return combineLatest([tableA, tableB]).pipe(
      map(([resultA, resultB]) => {
        const ratesA = resultA[0].rates;
        const ratesB = resultB[0].rates;
        this.currenciesArray = [...ratesA, ...ratesB];
        return this.currenciesArray;
      })
    );
  }

  getCurrencyDetails(code: string): Rate {
    return this.currenciesArray.find((currency: any) => currency.code === code)!;
  }

  getCurrencyFromLastDays(code: string): Observable<ResultOneCurrency> {
    const tableAUrl = `${this.API}/rates/a/${code}/last/7/`;
    const tableBUrl = `${this.API}/rates/b/${code}/last/7/`;
    return this.http.get<ResultOneCurrency>(tableAUrl).pipe(
      catchError((error) => {
        console.error('Error for table A: ' + error);
        return this.http.get<ResultOneCurrency>(tableBUrl);
      })
    );
  }

  getCurrencyFromLastMonths(
    code: string,
    date: string
  ): Observable<ResultOneCurrency> {
    const tableAUrl = `${this.API}/rates/a/${code}/${date}/`;
    const tableBUrl = `${this.API}/rates/b/${code}/${date}/`;
    return this.http.get<ResultOneCurrency>(tableAUrl).pipe(
      catchError((error) => {
        console.error('Error for table A: ' + error);
        return this.http.get<ResultOneCurrency>(tableBUrl);
      })
    );
  }

  getDates() {
    const currenciesDatesArray = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      date.setDate(date.getDate() - 1);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      currenciesDatesArray.push(`${year}-${month}-${day}`);
    }
    return currenciesDatesArray;
  }

  // Stworzyc nowa klase dla przechowywania start i end data, w tabicy jest nieczytelnie co jest czym
  getDatesToMonthExchangeRate() {
    const currencyOneMonthDatesArray = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const startYear = startDate.getFullYear();
    const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
    const startDay = String(startDate.getDate()).padStart(2, '0');

    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1);
    const endYear = endDate.getFullYear();
    const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
    const endDay = String(endDate.getDate()).padStart(2, '0');

    currencyOneMonthDatesArray.push(
      `${startYear}-${startMonth}-${startDay}`
    );
    currencyOneMonthDatesArray.push(`${endYear}-${endMonth}-${endDay}`);
    return currencyOneMonthDatesArray;
  }

  getCurrencyFromDateRange(
    code: string,
    startDate: string,
    endDate: string
  ): Observable<ResultOneCurrency> {
    const tableAUrl = `${this.API}/rates/a/${code}/${startDate}/${endDate}`;
    const tableBUrl = `${this.API}/rates/b/${code}/${startDate}/${endDate}`;
    return this.http.get<ResultOneCurrency>(tableAUrl).pipe(
      catchError((error) => {
        console.error('Error for table A: ' + error);
        return this.http.get<ResultOneCurrency>(tableBUrl);
      })
    );
  }

  getStartAndEndDate(): string[] {
    const todayDate = new Date()
    const endDateString = this.getFormattedDate(todayDate)
    const startDate = todayDate
    startDate.setMonth(todayDate.getMonth() - 2)
    startDate.setDate(1)
    const startDateString = this.getFormattedDate(startDate)
    // return new DateRange(startDateString, endDateString)
    return [startDateString, endDateString]
  }

  private getFormattedDate(date: Date): string {
    const yearString = date.getFullYear().toString()
    const monthString = (date.getMonth() + 1).toString().padStart(2, '0')
    const dayString = date.getDate().toString().padStart(2, '0')
    return yearString + "-" + monthString + "-" + dayString
  }
}


class DateRange {
  startDate: string
  endDate: string

  constructor(startDate: string, endDate: string) {
    this.startDate = startDate
    this.endDate = endDate
  }
}