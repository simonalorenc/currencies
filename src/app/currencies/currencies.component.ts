import { Component, OnInit } from '@angular/core';
import { RateWithFlag } from '../rate-with-flag'
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrenciesRepository } from '../currencies-repository';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {
  private currenciesArray: RateWithFlag[] = [];
  filteredCurrenciesArray: RateWithFlag[] = [];
  filterForm: FormGroup;

  constructor(
    private currenciesRepository: CurrenciesRepository,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      filterInputValue: [''],
    });
  }

  ngOnInit(): void {
    this.getRatesWithFlags();

    this.filterForm.get('filterInputValue')?.valueChanges.subscribe((value) => {
      this.filterCurrencies(value);
    });
  }

  getRatesWithFlags() {
    this.currenciesRepository
      .getRatesWithFlags()
      .subscribe((rates) => {
        this.currenciesArray = rates;
        this.filteredCurrenciesArray = this.currenciesArray;
      });
  }

  private filterCurrencies(filterText: string): void {
    this.filteredCurrenciesArray = this.currenciesArray.filter((currency) => {
      return (
        currency.rate.code.toLowerCase().includes(filterText) ||
        currency.rate.currency.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      );
    });
  }

  sortByAlphabetically() {
    this.filteredCurrenciesArray = this.currenciesArray.sort((a, b) => {
      return a.rate.currency.localeCompare(b.rate.currency)
    })
  }
}
