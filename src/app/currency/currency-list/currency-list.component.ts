import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrenciesRepository } from '../data/currencies-repository';
import { RateWithFlag } from '../data/rate-with-flag';
import { Router } from '@angular/router';
import { IconDefinition, faArrowUpAZ, faSort, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { CurrencyTranslationService } from '../data/currency.translation.service';

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
  emptyHeartIcon: IconDefinition = farHeart;
  fullHeartIcon: IconDefinition = fasHeart;
  codes: string[] = [];

  constructor(
    private currenciesRepository: CurrenciesRepository,
    private formBuilder: FormBuilder,
    private router: Router,
    private currencyTranslationService: CurrencyTranslationService,
    @Inject(LOCALE_ID) public locale: string
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

  getRatesWithFlags(): void {
    this.currenciesRepository.getRatesWithFlags().subscribe((rates) => {
      this.ratesWithFlag = this.currencyTranslationService.getRateWithFlagForLocale(this.locale, rates)
      this.filteredRatesWithFlag = this.ratesWithFlag;
      this.checkFavourites();
    });
  }

  private filterCurrencies(filterText: string): void {
    this.filteredRatesWithFlag = this.ratesWithFlag.filter((rateWithFlag) => {
      return (
        rateWithFlag.rate.code.toLowerCase().includes(filterText) ||
        rateWithFlag.rate.currency
          .toLowerCase()
          .includes(filterText.toLowerCase())
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

  addToFavourite(code: string, event: any): void {
    event?.stopPropagation()
    const foundRate = this.ratesWithFlag.find(
      (element) => element.rate.code === code
    );
    if (foundRate) {
      this.codes.push(code);
      foundRate.isAddedToFavourite = true;
      let storedRates: string[] = JSON.parse(localStorage['codes']);
      storedRates.push(code);
      localStorage.setItem('codes', JSON.stringify(storedRates));
    }
  }

  removeFromFavourite(code: string, event: any): void {
    event?.stopPropagation()
    let storedRates: string[]= JSON.parse(localStorage['codes']);
    storedRates = storedRates!.filter((el) => el !== code)
    this.ratesWithFlag.some((el) => {
      if(el.rate.code === code) {
        el.isAddedToFavourite = !el.isAddedToFavourite
      }
    })
    localStorage.setItem('codes', JSON.stringify(storedRates));
  }

  checkFavourites() {
    const favouriteRates: string[] = JSON.parse(localStorage['codes'])
    if (favouriteRates) {
      this.ratesWithFlag.some((el) => {
        for (let i = 0; i < favouriteRates.length; i++) {
          if (el.rate.code === favouriteRates[i]) {
            el.isAddedToFavourite = !el.isAddedToFavourite;
          }
        }
      });
    }
  }
}
