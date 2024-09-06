import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressiveDoughnutChartComponent } from './progressive-doughnut-chart.component';

describe('ProgressiveDoughnutChartComponent', () => {
  let component: ProgressiveDoughnutChartComponent;
  let fixture: ComponentFixture<ProgressiveDoughnutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressiveDoughnutChartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgressiveDoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
