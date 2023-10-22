import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoldPriceDto } from '../gold-prices-dto';

@Injectable({
  providedIn: 'root'
})
export class GoldPricesService {
  private API: string = 'http://api.nbp.pl/api/cenyzlota'
  private NUMBER_OF_LAST_DAYS: number = 14

  constructor(private http: HttpClient) { }

  getGoldPricesDtoFromLastDays(): Observable<GoldPriceDto[]> {
    const url = `${this.API}/last/${this.NUMBER_OF_LAST_DAYS}`
    return this.http.get<GoldPriceDto[]>(url)
  }
}
