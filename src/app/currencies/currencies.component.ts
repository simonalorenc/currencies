import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from './currencies.service';
import { Rate } from '../currency';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {
  //TODO: analogicznie jak w serisie imo nie powinno być force (!)
  currenciesArray: Rate[] = [];
  filteredCurrenciesArray: Rate[] = [];
  numbers: number = 1;
  filterInputValue: string = '';
  filterForm: FormGroup
  exampleArray: Rate[] =[]

  constructor(private currenciesService: CurrenciesService, private formBuilder: FormBuilder) {
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

  getApi() {
    this.currenciesService.getCurrenciesRatesObservable().subscribe(
      (rates) => {
        this.currenciesArray = rates;
        this.exampleArray = this.currenciesArray
      },
      (error) => console.error('GetCurrencies error' + error)
    );
  }

  filterCurrencies(): void {
    const filterText = this.filterForm.get('filterInputValue')?.value
    if(filterText !== 0) {
      this.filteredCurrenciesArray = this.currenciesArray.filter((currency) => {
        return currency.code.toLowerCase().includes(filterText) || currency.currency.toLocaleLowerCase().includes(filterText);
      });
    }
      
  }
}
