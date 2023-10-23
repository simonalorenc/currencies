import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isCurrenciesActive: boolean = true

  constructor(private router: Router) {}

  onClickCurrencies() {
    this.isCurrenciesActive = true
    this.router.navigate(['/dashboard/app-currency-list'])
    
  }

  onClickGold() {
    this.isCurrenciesActive = false
    this.router.navigate(['/dashboard/gold-prices'])
  }
}
