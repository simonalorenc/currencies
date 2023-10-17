import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from './currencies.service';
import { Rate, RateWithFlag } from '../currency';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlagsService } from '../flags.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {
  currenciesArray: Rate[] = [];
  filteredCurrenciesArray: RateWithFlag[] = [];
  filterForm: FormGroup;
  flagUrl: string | null = null;
  flagUrls: string[] = [];

  constructor(
    private currenciesService: CurrenciesService,
    private formBuilder: FormBuilder,
    private flagsService: FlagsService
  ) {
    this.filterForm = this.formBuilder.group({
      filterInputValue: [''],
    });
  }

  ngOnInit(): void {
    this.getCurrenciesApi();

    this.filterForm.get('filterInputValue')?.valueChanges.subscribe((value) => {
      this.filterCurrencies(value);
    });
  }

  getCurrenciesApi() {
    this.currenciesService.getCurrenciesRatesObservable().subscribe(
      (rates) => {
        rates.forEach((rate) => {
          const code = rate.code.slice(0, -1).toLowerCase();
          this.getCountryFlag(code).subscribe((flagUrl) => {
            const rateWithFlag: RateWithFlag = {
              currency: rate.currency,
              code: rate.code,
              mid: rate.mid,
              flag: flagUrl
            }
            this.currenciesArray.push(rateWithFlag)
          });
        });
        console.log(this.currenciesArray)
        this.filteredCurrenciesArray = this.currenciesArray
        console.log(this.filteredCurrenciesArray)
      },
      (error) => console.error('GetCurrencies error' + error)
    );
  }

  getCountryFlag(code: string) {
    return this.flagsService.getFlagUrl(code);
  }

  //flagi nie zmieniają się przy filtrowaniu
  filterCurrencies(filterText: string): void {
      this.filteredCurrenciesArray = this.currenciesArray.filter((currency) => {
        return (
          currency.code.toLowerCase().includes(filterText) ||
          currency.currency.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
        );
      });
  }
}
