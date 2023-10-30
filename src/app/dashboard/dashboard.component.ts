import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrenciesGoldRoutingService } from '../currencies-gold-routing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isCurrenciesActive!: boolean

  constructor(private currenciesGoldRoutingService: CurrenciesGoldRoutingService) {}

  ngOnInit(): void {
    this.currenciesGoldRoutingService.isCurrenciesActiveSubject.asObservable().subscribe(
      (isActive) => {
        this.isCurrenciesActive = isActive
      }
    )
  }

  onClickCurrencies() {
    this.currenciesGoldRoutingService.onClickCurrencies()
    console.log('dashboard: ' + this.isCurrenciesActive)
  }

  onClickGold() {
    this.currenciesGoldRoutingService.onClickGold()
    console.log('dashboard: ' + this.isCurrenciesActive)
  }
}
