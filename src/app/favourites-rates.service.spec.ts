import { TestBed } from '@angular/core/testing';

import { FavouritesRatesService } from './favourites-rates.service';

describe('FavouritesRatesService', () => {
  let service: FavouritesRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritesRatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
