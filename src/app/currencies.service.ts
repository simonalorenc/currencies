import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rate, Root } from './currency';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  API: string = 'http://api.nbp.pl/api/exchangerates'
  currenciesArray!: Rate[]

  constructor(private http: HttpClient) { }

  getApi(): Observable<Root> {
    const API_CURRENCIES = `${this.API}/tables/A`
    return this.http.get<Root>(API_CURRENCIES)
  }

  getAllCurrencies(): void {
    this.getApi().subscribe(
      (data: Root) => {
        console.log(data[0].rates)
        
        
      }
    )
  }

}
