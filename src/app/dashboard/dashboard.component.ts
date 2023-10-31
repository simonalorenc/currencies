import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarRoutingService } from '../routing/navbar-routing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isCurrenciesActive: boolean = false

  constructor(private navbarRoutingService: NavbarRoutingService) {}

  ngOnInit(): void {
    this.navbarRoutingService.getCurrenciesActiveObservable().subscribe(
      (isActive) => {
        this.isCurrenciesActive = isActive
      }
    )
  }

  onClickCurrencies(): void {
    this.navbarRoutingService.onClickCurrencies()
  }

  onClickGold(): void {
    this.navbarRoutingService.onClickGold()
  }
}
