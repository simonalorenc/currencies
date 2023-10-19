import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFromLastMonthsComponent } from './chart-from-last-months.component';

describe('ChartFromLastMonthsComponent', () => {
  let component: ChartFromLastMonthsComponent;
  let fixture: ComponentFixture<ChartFromLastMonthsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartFromLastMonthsComponent]
    });
    fixture = TestBed.createComponent(ChartFromLastMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
