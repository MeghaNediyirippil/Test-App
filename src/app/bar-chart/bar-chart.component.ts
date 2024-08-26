import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DoughnutChartComponent } from "../doughnut-chart/doughnut-chart.component";

Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [DoughnutChartComponent],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {

  chart: Chart | undefined;

  ngOnInit(): void {

    const labels = ['1', '50', '2', '30', '3G', '45', '10'];
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          '#3D88BA'
        ],
        borderColor: [
          '#3D88BA'
        ],
        borderWidth: 2
      }]
    };

    const config: any = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };

    this.chart = new Chart('barChart', config);
  }
}


