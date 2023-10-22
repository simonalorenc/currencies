import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFromLast30DaysComponent } from './chart-from-last-30-days.component';

describe('ChartFromLast30DaysComponent', () => {
  let component: ChartFromLast30DaysComponent;
  let fixture: ComponentFixture<ChartFromLast30DaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartFromLast30DaysComponent]
    });
    fixture = TestBed.createComponent(ChartFromLast30DaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
