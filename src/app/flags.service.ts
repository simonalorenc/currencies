import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlagsService {
  constructor(private http: HttpClient) {}

  getFlagUrl(countryCode: string): string {
    return `https://flagcdn.com/64x48/${countryCode}.webp`;
  }
}
