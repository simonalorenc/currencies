import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../currencies.service';
import { Rate } from '../currency';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {
  currencyArray!: Rate[]
  numbers: number = 1

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.currenciesService.getAllCurrencies()
    this.currenciesService.getAllCurrenciesArray().subscribe(
      (currencies: Rate[]) => {
        this.currencyArray = currencies
        console.log(currencies)
      }
    )
  }
}
