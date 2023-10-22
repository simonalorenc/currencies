import { TestBed } from "@angular/core/testing";
import { CurrenciesRepository } from "./currencies-repository";

describe('CurrenciesRepository', () => {
  let repository: CurrenciesRepository

  beforeEach(() => {
    TestBed.configureTestingModule({});
    repository = TestBed.inject(CurrenciesRepository);
  });
  
  it('should create an instance', () => {
    expect(repository).toBeTruthy();
  });
});