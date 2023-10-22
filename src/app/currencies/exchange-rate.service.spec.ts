import { TestBed } from '@angular/core/testing';

import { ExchangeRateService } from './exchange-rate.service';

describe('CurrenciesService', () => {
  let service: ExchangeRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
