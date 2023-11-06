import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlagsService {
  constructor() {}

  getFlagUrl(countryCode: string): string {
    console.log('check')
    return `https://flagcdn.com/w160/${countryCode}.webp`;
  }
}
