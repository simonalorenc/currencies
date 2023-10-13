import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrenciesService } from '../currencies/currencies.service';
import { Rate } from '../currency';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss']
})
export class CurrencyDetailComponent implements OnInit{
  currency!: Rate

  constructor(private route: ActivatedRoute, private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.getCurrencyDetails()
    console.log(this.currency)
  }

  getCurrencyDetails(): void {
    const code = this.route.snapshot.paramMap.get('code')
    if (code !== null) {
      this.currenciesService.getCurrencyDetails(code).subscribe(
        (currency) => this.currency = currency
      )
    }
  }

}
