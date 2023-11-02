import { TestBed } from '@angular/core/testing';

import { EnglishCurrencyListService } from './english-currency-list.service';

describe('EnglishCurrencyListService', () => {
  let service: EnglishCurrencyListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnglishCurrencyListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
