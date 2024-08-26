import { Component } from '@angular/core';
import { LineChartComponent } from "../line-chart/line-chart.component";
import { MonthlyLineChartComponent } from "../monthly-line-chart/monthly-line-chart.component";
import { BarChartComponent } from "../bar-chart/bar-chart.component";
import { DoughnutChartComponent } from "../doughnut-chart/doughnut-chart.component";
import { PieChartComponent } from "../pie-chart/pie-chart.component";
import { BarChartColorComponent } from "../bar-chart-color/bar-chart-color.component";
import { ProgressiveLineChartComponent } from "../progressive-line-chart/progressive-line-chart.component";
import { ProgressiveDoughnutChartComponent } from "../progressive-doughnut-chart/progressive-doughnut-chart.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LineChartComponent, MonthlyLineChartComponent, BarChartComponent, DoughnutChartComponent, PieChartComponent, BarChartColorComponent, ProgressiveLineChartComponent, ProgressiveDoughnutChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}


