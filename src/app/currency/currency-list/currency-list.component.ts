import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrenciesRepository } from '../data/currencies-repository';
import { RateWithFlag } from '../data/rate-with-flag';
import { Router } from '@angular/router';
import { IconDefinition, faArrowUpAZ } from '@fortawesome/free-solid-svg-icons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent implements OnInit {
  private ratesWithFlag: RateWithFlag[] = [];
  filteredRatesWithFlag: RateWithFlag[] = [];
  filterForm: FormGroup;
  isSortAlphabeticallyActive: boolean = false;
  sortAlphabeticallyIcon: IconDefinition = faArrowUpAZ;
  sortPopulrityIcon: IconDefinition = faSort;

  constructor(
    private currenciesRepository: CurrenciesRepository,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    @Inject(LOCALE_ID) public locale: string
  ) {
    this.filterForm = this.formBuilder.group({
      filterInputValue: [''],
    });
  }

  ngOnInit(): void {
    console.log('Current locale: ' + this.locale);

    this.getRatesWithFlags();

    this.filterForm.get('filterInputValue')?.valueChanges.subscribe((value) => {
      this.filterCurrencies(value);
    });
  }

  getRatesWithFlags(): void {
    this.currenciesRepository.getRatesWithFlags().subscribe((rates) => {
      this.ratesWithFlag = rates;
      this.filteredRatesWithFlag = this.ratesWithFlag;
      this.checkLocale();
    });
  }

  private filterCurrencies(filterText: string): void {
    this.filteredRatesWithFlag = this.ratesWithFlag.filter((rateWithFlag) => {
      return (
        rateWithFlag.rate.code.toLowerCase().includes(filterText) ||
        rateWithFlag.rate.currency
          .toLocaleLowerCase()
          .includes(filterText.toLocaleLowerCase())
      );
    });
  }

  sortAlphabetically(): void {
    this.isSortAlphabeticallyActive = true;
    this.filteredRatesWithFlag = this.ratesWithFlag.concat().sort((a, b) => {
      return a.rate.currency.localeCompare(b.rate.currency);
    });
  }

  sortPopularity(): void {
    this.isSortAlphabeticallyActive = false;
    this.filteredRatesWithFlag = this.ratesWithFlag;
  }

  navigateToDetail(code: string): void {
    this.router.navigate([`/detail/${code}`]);
  }

  checkLocale() {
    if (this.locale === 'en-US') {
      console.log(this.locale)
      let jsonData: any;
      this.http.get('assets/en.json').subscribe((data: any) => {
        jsonData = data;
        this.ratesWithFlag.forEach((rate) => {
          for (const key in jsonData) {
            if (rate.rate.code === key) {
              rate.rate.currency = jsonData[rate.rate.code];
            }
          }
        });
      });
    }
  }
}
