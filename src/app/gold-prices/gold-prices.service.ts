import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoldPrice, GoldResult } from '../gold-prices';

@Injectable({
  providedIn: 'root'
})
export class GoldPricesService {
  private API: string = 'http://api.nbp.pl/api/cenyzlota'

  constructor(private http: HttpClient) { }

  getGoldPricesInfo(): Observable<GoldPrice[]> {
    const API_GOLD_PRICES = `${this.API}/last/14`
    return this.http.get<GoldPrice[]>(API_GOLD_PRICES)
  }

  getGoldPricesObservable(): Observable<GoldPrice[]> {
    return this.getGoldPricesInfo()
  }
}
