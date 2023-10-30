import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarRoutingService } from '../routing/navbar-routing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isCurrenciesActive!: boolean

  constructor(private navbarRoutingService: NavbarRoutingService) {}

  ngOnInit(): void {
    this.navbarRoutingService.getCurrenciesActiveObservable().subscribe(
      (isActive) => {
        this.isCurrenciesActive = isActive
      }
    )
  }

  onClickCurrencies() {
    this.navbarRoutingService.onClickCurrencies()
  }

  onClickGold() {
    this.navbarRoutingService.onClickGold()
  }
}
