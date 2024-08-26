import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyLineChartComponent } from './monthly-line-chart.component';

describe('MonthlyLineChartComponent', () => {
  let component: MonthlyLineChartComponent;
  let fixture: ComponentFixture<MonthlyLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyLineChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
