import { Component } from '@angular/core';

import {Chart,registerables} from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {

  chart: Chart | undefined;

  ngOnInit(): void {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];    
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: [100,340,450,560,670,790,800,910,1200,1400,1580,1300],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(200, 230, 231, 0.2)',
          fill:true,
          tension: 0.3
        },
        {
          label: 'Dataset 2',
          data: [110,235,345,455,565,675,695,800,910,1200,1000,980,870],
          borderColor: 'rgb(73, 292, 192)',
          backgroundColor: 'rgba(218, 237, 206,0.2)',
          fill:true,
          tension: 0.3
        },
        {
          label: 'Dataset 3',
          data: [50,120,190,330,440,550,600,580,800,850,790,680],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor:'rgba(200, 230, 231,0.2)',
          fill:true,
          tension: 0.3
        }
      ]
    };

    const config:any={
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
    
    this.chart = new Chart('myChart', config);
  }
}
