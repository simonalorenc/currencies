import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlagsService {
  constructor() {}

  getFlagUrl(countryCode: string): string {
    return `https://flagcdn.com/w160/${countryCode}.webp`;
  }
}
