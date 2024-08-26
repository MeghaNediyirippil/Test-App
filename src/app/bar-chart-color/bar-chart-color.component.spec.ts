import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartColorComponent } from './bar-chart-color.component';

describe('BarChartColorComponent', () => {
  let component: BarChartColorComponent;
  let fixture: ComponentFixture<BarChartColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartColorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
