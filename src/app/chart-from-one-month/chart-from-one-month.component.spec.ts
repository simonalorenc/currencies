import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFromOneMonthComponent } from './chart-from-one-month.component';

describe('ChartFromOneMonthComponent', () => {
  let component: ChartFromOneMonthComponent;
  let fixture: ComponentFixture<ChartFromOneMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartFromOneMonthComponent]
    });
    fixture = TestBed.createComponent(ChartFromOneMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
