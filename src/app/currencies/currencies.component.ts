import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../currencies.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.currenciesService.getAllCurrencies()
  }
}
