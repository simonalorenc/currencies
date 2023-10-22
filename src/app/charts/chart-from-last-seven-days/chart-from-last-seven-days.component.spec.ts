import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFromLastSevenDaysComponent } from './chart-from-last-seven-days.component';

describe('ChartFromLastSevenDaysComponent', () => {
  let component: ChartFromLastSevenDaysComponent;
  let fixture: ComponentFixture<ChartFromLastSevenDaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartFromLastSevenDaysComponent]
    });
    fixture = TestBed.createComponent(ChartFromLastSevenDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
