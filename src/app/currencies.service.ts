import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rate, Root } from './currency';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  API: string = 'http://api.nbp.pl/api/exchangerates'
  currenciesArray!: Rate[]
  currencyArraySubject: BehaviorSubject<Rate[]> = new BehaviorSubject<Rate[]>([])


  constructor(private http: HttpClient) { }

  getApi(): Observable<Root> {
    const API_CURRENCIES = `${this.API}/tables/A`
    return this.http.get<Root>(API_CURRENCIES)
  }

  getAllCurrencies(): void {
    this.getApi().subscribe(
      (result: Root) => {
        const currency = result[0].rates
        this.currenciesArray = currency
        this.currencyArraySubject.next(currency)
      }
    )
  }

  getAllCurrenciesArray(): Observable<Rate[]> {
    return this.currencyArraySubject.asObservable()
  }

}
