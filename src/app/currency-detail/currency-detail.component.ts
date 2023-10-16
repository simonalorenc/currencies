import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrenciesService } from '../currencies/currencies.service';
import { DetailRate, Rate } from '../currency';
import { FlagsService } from '../flags.service';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss']
})
export class CurrencyDetailComponent implements OnInit{
  currency!: Rate
  currencyArray: DetailRate[] = []
  flagUrl!: string

  constructor(private route: ActivatedRoute, private currenciesService: CurrenciesService, private flagsService: FlagsService) {}

  ngOnInit(): void {
    this.getCurrencyDetails()
    this.getCurrencyName()
  }

  getCurrencyName(): void {
    const code = this.route.snapshot.paramMap.get('code')
    if (code !== null) {
      this.currenciesService.getCurrencyDetails(code).subscribe(
        (currency) => {
          this.currency = currency
          const countryCode = code.slice(0, -1).toLowerCase()
          this.flagsService.getFlagUrl(countryCode).subscribe(flagUrl => {
            this.flagUrl = flagUrl
          })
        } 
      )
    }
  }

  getCurrencyDetails(): void {
    const code = this.route.snapshot.paramMap.get('code')
    if (code !== null) {
      this.currenciesService.getCurrencyFromLastDays(code).subscribe(
        (currencies) => this.currencyArray = currencies.rates
      )
    }
  }

  getCountryFlag(code: string) {
    return this.flagsService.getFlagUrl(code)
  }

}


// getApi() {
//   this.currenciesService.getCurrenciesRatesObservable().subscribe(
//     (rates) => {
//       rates.forEach((rate, i) => {
//         const code = rate.code.slice(0, -1).toLowerCase()
//         this.getCountryFlag(code).subscribe(flagUrl => {
//           this.flagUrls[i] = flagUrl
//         })
//       })
//       this.currenciesArray = rates;
//       this.exampleArray = this.currenciesArray
//     },
//     (error) => console.error('GetCurrencies error' + error)
//   );
// }