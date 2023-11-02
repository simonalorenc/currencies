import { TestBed } from '@angular/core/testing';

import { CurrencyTranslationService } from './currency.translation.service';

describe('CurrencyTranslationService', () => {
  let service: CurrencyTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
