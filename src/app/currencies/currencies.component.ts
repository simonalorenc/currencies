import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from './currencies.service';
import { Rate } from '../currency';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {
  //TODO: analogicznie jak w serisie imo nie powinno być force (!)
  currenciesArray: Rate[] = [];
  numbers: number = 1;

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.currenciesService.getCurrenciesRatesObservable().subscribe
    //rates dlatego ze w api jest rates: Rate[]?
    ((rates) => {
      this.currenciesArray = rates;
    },
      (error) => console.error('GetCurrencies error' + error)
    );
  }
}
