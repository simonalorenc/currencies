import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from './currencies.service';
import { Rate } from '../currency';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlagsService } from '../flags.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {
  currenciesArray: Rate[] = [];
  filteredCurrenciesArray: Rate[] = [];
  filterInputValue: string = '';
  filterForm: FormGroup
  exampleArray: Rate[] = []
  flagUrl: string | null = null
  flagUrls: string[] = []

  constructor(private currenciesService: CurrenciesService, private formBuilder: FormBuilder, private flagsService: FlagsService) {
    this.filterForm = this.formBuilder.group({
      filterInputValue: ['']
    })
  }

  ngOnInit(): void {
    this.getApi()
    
    this.filterForm.get('filterInputValue')?.valueChanges.subscribe((value) => {
      console.log(value)
      if(value === '') {
        this.getApi()
      } else {
        //przed kolejnym fitrowaniem podczas usuwania liter trzeba znowu dodac do currenciesArray wszystkie elementy, edit: dodałam, ale pewnie da się to ładniej zrobić
        this.currenciesArray = this.exampleArray
        this.filterCurrencies()
        this.currenciesArray = this.filteredCurrenciesArray
      }
    })
  }

  //subscribe w subscribe??
  getApi() {
    this.currenciesService.getCurrenciesRatesObservable().subscribe(
      (rates) => {
        rates.forEach((rate, i) => {
          const code = rate.code.slice(0, -1).toLowerCase()
          this.getCountryFlag(code).subscribe(flagUrl => {
            this.flagUrls[i] = flagUrl
          })
        })
        this.currenciesArray = rates;
        this.exampleArray = this.currenciesArray
      },
      (error) => console.error('GetCurrencies error' + error)
    );
  }

  getCountryFlag(code: string) {
    return this.flagsService.getFlagUrl(code)
  }

  //flagi nie zmieniają się przy filtrowaniu
  filterCurrencies(): void {
    const filterText = this.filterForm.get('filterInputValue')?.value
    if(filterText !== 0) {
      this.filteredCurrenciesArray = this.currenciesArray.filter((currency) => {
        return currency.code.toLowerCase().includes(filterText) || currency.currency.toLocaleLowerCase().includes(filterText);
      });
    }
      
  }
}
