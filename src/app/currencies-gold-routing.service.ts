import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesGoldRoutingService {
  isCurrenciesActiveSubject = new BehaviorSubject<boolean>(true);

  constructor(private router: Router) {}

  onClickCurrencies() {
    this.isCurrenciesActiveSubject.next(true);
    this.router.navigate(['/dashboard/currency-list']);
  }

  onClickGold() {
    this.isCurrenciesActiveSubject.next(false);
    this.router.navigate(['/dashboard/gold-prices']);
  }
}
