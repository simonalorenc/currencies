import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrenciesRepository } from '../data/currencies-repository';
import { RateWithFlag } from '../data/rate-with-flag';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent implements OnInit {
  private ratesWithFlag: RateWithFlag[] = [];
  filteredRatesWithFlag: RateWithFlag[] = [];
  filterForm: FormGroup;
  isSortAlphabeticallyActive: boolean = false

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
    console.log("getRatesWithFlags subscribe current " + this.filteredRatesWithFlag.length)

    this.currenciesRepository
      .getRatesWithFlags()
      .subscribe((rates) => {
        console.log("getRatesWithFlags result " + rates)
        this.ratesWithFlag = rates;
        this.filteredRatesWithFlag = this.ratesWithFlag;
      });
  }

  private filterCurrencies(filterText: string): void {
    console.log(this.ratesWithFlag)
    this.filteredRatesWithFlag = this.ratesWithFlag.filter((rateWithFlag) => {
      return (
        rateWithFlag.rate.code.toLowerCase().includes(filterText) ||
        rateWithFlag.rate.currency.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      );
    });
  }

  sortAlphabetically() {
    this.isSortAlphabeticallyActive = true
    this.filteredRatesWithFlag = this.ratesWithFlag.concat().sort((a, b) => {
      return a.rate.currency.localeCompare(b.rate.currency)
    })
  }

  sortPopularity() {
    this.isSortAlphabeticallyActive = false
    this.filteredRatesWithFlag = this.ratesWithFlag
  }
}
