import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  catchError,
  combineLatest,
  map 
} from 'rxjs';
import { RateDto, ExchangeTableDto } from '../exchange-table-dto';
import { CurrencyExchangeTableDto } from '../currency-exchange-table-dto'

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private BASE_URL: string = 'http://api.nbp.pl/api/exchangerates';
  private NUMBER_OF_LAST_DAYS: number = 7

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

  getCurrencyExchangeTableDtoFromLastDays(code: string): Observable<CurrencyExchangeTableDto> {
    const tableAUrl = `${this.BASE_URL}/rates/a/${code}/last/${this.NUMBER_OF_LAST_DAYS}/`;
    const tableBUrl = `${this.BASE_URL}/rates/b/${code}/last/${this.NUMBER_OF_LAST_DAYS}/`;
    return this.http.get<CurrencyExchangeTableDto>(tableAUrl).pipe(
      catchError(() => this.http.get<CurrencyExchangeTableDto>(tableBUrl))
    );
  }

  getDatesToMonthExchangeRate(): string[] {
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
  ): Observable<CurrencyExchangeTableDto> {
    const tableAUrl = `${this.BASE_URL}/rates/a/${code}/${startDate}/${endDate}`;
    const tableBUrl = `${this.BASE_URL}/rates/b/${code}/${startDate}/${endDate}`;
    return this.http.get<CurrencyExchangeTableDto>(tableAUrl).pipe(
      catchError((error) => {
        console.error('Error for table A: ' + error);
        return this.http.get<CurrencyExchangeTableDto>(tableBUrl);
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