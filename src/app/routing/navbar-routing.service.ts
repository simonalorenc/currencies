import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarRoutingService {
  private isCurrenciesActiveSubject = new BehaviorSubject<boolean>(true);

  constructor(private router: Router) {}

  getCurrenciesActiveObservable(): Observable<boolean> {
    return this.isCurrenciesActiveSubject.asObservable()
  }

  onClickCurrencies(): void {
    this.isCurrenciesActiveSubject.next(true);
    this.router.navigate(['/dashboard/currency-list']);
  }

  onClickGold(): void {
    this.isCurrenciesActiveSubject.next(false);
    this.router.navigate(['/dashboard/gold-prices']);
  }
}
