import { Injectable } from '@angular/core';
import { RateWithFlag } from './currency/data/rate-with-flag';

@Injectable({
  providedIn: 'root',
})
export class FavouritesRatesService {

  takeArrayFromLocaleStorage(): string[] {
    let storedRates: string[] | null = JSON.parse(localStorage.getItem('codes') || 'null');
      if (storedRates === null) {
        storedRates = [];
      }
    return storedRates
  }

  addToFavourites(code: string): void {
    const storedRates = this.takeArrayFromLocaleStorage()
    storedRates.push(code);
    localStorage.setItem('codes', JSON.stringify(storedRates))
  }

  removeFromFavourites(code: string): void {
    let storedRates = this.takeArrayFromLocaleStorage()
    storedRates = storedRates!.filter((el) => el !== code);
    localStorage.setItem('codes', JSON.stringify(storedRates));
  }

  checkFavourites(ratesWithFlag: RateWithFlag[]) {
    const favouriteRatesJson = localStorage['codes'];
    if (favouriteRatesJson) {
      const favouriteRates: string[] = JSON.parse(favouriteRatesJson)
      ratesWithFlag.forEach(rateWithFlag => {
        rateWithFlag.isAddedToFavourite = favouriteRates.includes(rateWithFlag.rate.code)
      })
    }
  }

  checkIfRateIsInFavourites(code: string): boolean {
    const favouriteRates = this.takeArrayFromLocaleStorage()
    return favouriteRates.includes(code)
  }
}