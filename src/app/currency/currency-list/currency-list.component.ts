import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrenciesRepository } from '../data/currencies-repository';
import { RateWithFlag } from '../data/rate-with-flag';
import { Router } from '@angular/router';
import { IconDefinition, faArrowUpAZ, faSort, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { EnglishCurrencyListService } from 'src/app/english-currency-list.service';

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
  favoriteRates: RateWithFlag[] = [];
  codes: string[] = [];

  constructor(
    private currenciesRepository: CurrenciesRepository,
    private formBuilder: FormBuilder,
    private router: Router,
    private englishCurrencyListService: EnglishCurrencyListService,
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
      this.ratesWithFlag =
        this.englishCurrencyListService.updateCurrencyIfNeeded(this.locale,rates);

      this.checkFavorites();

      this.filteredRatesWithFlag = this.ratesWithFlag;
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
      foundRate.isAddedToFavorite = true;
      let storedRates: string[] | null = JSON.parse(localStorage.getItem('codes') || 'null');
      if (storedRates === null) {
        storedRates = [];
      }
      storedRates.push(code);
      localStorage.setItem('codes', JSON.stringify(storedRates));
    }
  }

  removeFromFavorite(code: string, event: any): void {
    event?.stopPropagation()
    const rateToRemove = code
    let storedRates: string[] | null = JSON.parse(localStorage.getItem('codes') || 'null');
    storedRates = storedRates!.filter((el) => el !== rateToRemove)
    this.ratesWithFlag.some((el) => {
      if(el.rate.code === code) {
        el.isAddedToFavorite = !el.isAddedToFavorite
      }
    })
    localStorage.setItem('codes', JSON.stringify(storedRates));
  }

  checkFavorites() {
    const favoriteRates = localStorage.getItem('codes')?.replace(/[^A-Za-z,]/g, '').split(',');
    if (favoriteRates) {
      this.ratesWithFlag.some((el) => {
        for (let i = 0; i < favoriteRates.length; i++) {
          if (el.rate.code === favoriteRates[i]) {
            el.isAddedToFavorite = !el.isAddedToFavorite;
          }
        }
      });
    }
  }
}
