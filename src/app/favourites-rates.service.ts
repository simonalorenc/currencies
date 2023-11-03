import { Injectable } from '@angular/core';
import { RateWithFlag } from './currency/data/rate-with-flag';

@Injectable({
  providedIn: 'root',
})
export class FavouritesRatesService {

  addToFavourite(code: string, ratesWithFlag: RateWithFlag[],event: any): void {
    event?.stopPropagation();
    const foundRate = ratesWithFlag.find(
      (element) => element.rate.code === code
    );
    if (foundRate) {
      foundRate.isAddedToFavourite = true;
      let storedRates: string[] | null = JSON.parse(localStorage.getItem('codes') || 'null');
      if (storedRates === null) {
        storedRates = [];
      }
      storedRates.push(code);
      localStorage.setItem('codes', JSON.stringify(storedRates))
    }
  }

  removeFromFavourite(code: string, ratesWithFlag: RateWithFlag[], event: any): void {
    event?.stopPropagation();
    let storedRates: string[] = JSON.parse(localStorage['codes']);
    storedRates = storedRates!.filter((el) => el !== code);
    ratesWithFlag.some((el) => {
      if (el.rate.code === code) {
        el.isAddedToFavourite = !el.isAddedToFavourite;
      }
    });
    localStorage.setItem('codes', JSON.stringify(storedRates));
  }

  checkFavourites(ratesWithFlag: RateWithFlag[]) {
    const favouriteRatesJson = localStorage['codes'];
    if (favouriteRatesJson) {
      const favouriteRates: string[] = JSON.parse(favouriteRatesJson)
      ratesWithFlag.some((el) => {
        for (let i = 0; i < favouriteRates.length; i++) {
          if (el.rate.code === favouriteRates[i]) {
            el.isAddedToFavourite = !el.isAddedToFavourite;
          }
        }
      });
    }
  }

  addToFavouriteInDetail(code: string) {
    let storedRates: string[] = JSON.parse(localStorage['codes']);
    storedRates.push(code);
    localStorage.setItem('codes', JSON.stringify(storedRates));
  }

  removeToFavouritesInDetail(code: string) {
    let storedRates: string[] = JSON.parse(localStorage['codes']);
    storedRates = storedRates!.filter((el) => el !== code);
    localStorage.setItem('codes', JSON.stringify(storedRates));
  }

  checkIfDetailIsInFavourites(code: string): boolean {
    const favouriteRates: string[] = JSON.parse(localStorage['codes']);
    return favouriteRates.includes(code)
  }
}
