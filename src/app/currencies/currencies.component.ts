import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from './currencies.service';
import { Rate, RateWithFlag } from '../currency';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlagsService } from '../flags.service';
import { CurrenciesRepository } from '../currencies-repository';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {
  //TODO: zaktualizować tutaj te piękne tablice do nowego modelu RatesWithFlags i eloo

  currenciesArray: RateWithFlag[] = [];
  filteredCurrenciesArray: RateWithFlag[] = [];
  filterForm: FormGroup;
  flagUrl: string | null = null;
  flagUrls: string[] = [];

  constructor(
    private currenciesService: CurrenciesService,
    private formBuilder: FormBuilder,
    private flagsService: FlagsService,
    private currenciesRepository: CurrenciesRepository
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
    this.currenciesRepository
      .getRatesWithFlagsObservable()
      .subscribe((rates) => {
        this.currenciesArray = rates;
        this.filteredCurrenciesArray = this.currenciesArray;
      });
    // (error) => console.error('GetCurrencies error' + error)
  }

  getCountryFlag(code: string) {
    return this.flagsService.getFlagUrl(code);
  }

  filterCurrencies(filterText: string): void {
    console.log(this.currenciesArray);
    this.filteredCurrenciesArray = this.currenciesArray.filter((currency) => {
      return (
        currency.rate.code.toLowerCase().includes(filterText) ||
        currency.rate.currency
          .toLocaleLowerCase()
          .includes(filterText.toLocaleLowerCase())
      );
    });
  }

  sortByAlphabetically() {
    this.filteredCurrenciesArray = this.currenciesArray.sort((a, b) => {
      const nameA = a.rate.currency.toUpperCase();
      const nameB = b.rate.currency.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    console.log(this.currenciesArray);
    // const nameA = this.currenciesArray.
    // this.filteredCurrenciesArray = this.currenciesArray.
  }
}
