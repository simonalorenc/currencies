import { TestBed } from '@angular/core/testing';

import { GoldPriceService } from './gold-price.service';

describe('GoldPricesService', () => {
  let service: GoldPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoldPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
