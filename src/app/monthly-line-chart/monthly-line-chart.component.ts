import { Component } from '@angular/core';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-monthly-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './monthly-line-chart.component.html',
  styleUrl: './monthly-line-chart.component.css'
})
export class MonthlyLineChartComponent {

  chart: Chart | undefined;

  ngOnInit(): void {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: [250, 340, 550, 560, 770, 890, 900, 1210, 1200, 1400, 1580, 1300],
          fill: false,
          borderColor: '#0B62A4',
          tension: 0.3
        },
        {
          label: 'Dataset 2',
          data: [50, 80, 190, 330, 440, 350, 200, 350, 800, 850, 790, 680],
          fill: false,
          borderColor: '#7A92A3',
          tension: 0.3
        }
      ]
    };

    const config: any = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 1700,
            ticks: {
              stepSize: 200,
              maxTicksLimit: 8
            }
          }
        }
      }
    };

    this.chart = new Chart('lineChart', config);
  }
}
