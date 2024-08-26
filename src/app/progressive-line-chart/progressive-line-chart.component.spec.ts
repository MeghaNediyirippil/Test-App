import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressiveLineChartComponent } from './progressive-line-chart.component';

describe('ProgressiveLineChartComponent', () => {
  let component: ProgressiveLineChartComponent;
  let fixture: ComponentFixture<ProgressiveLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressiveLineChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressiveLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
