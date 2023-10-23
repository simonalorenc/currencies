import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  isCurrenciesActive: boolean = true
  isGoldActive: boolean = false

  ngOnInit(): void {
  
  }

  onClickCurrencies() {
    this.isCurrenciesActive = true
    this.isGoldActive = false
  }

  onClickGold() {
    this.isCurrenciesActive = false
    this.isGoldActive = true
  }

  
}
