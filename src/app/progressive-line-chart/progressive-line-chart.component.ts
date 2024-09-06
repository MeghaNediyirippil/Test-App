import { Component, OnInit } from '@angular/core';
import { Chart, registerables, ChartConfiguration, ChartDataset } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-progressive-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './progressive-line-chart.component.html',
  styleUrls: ['./progressive-line-chart.component.css']
})
export class ProgressiveLineChartComponent implements OnInit {

  chart: Chart<'line'> | undefined;

  ngOnInit(): void {
    const data: { x: number, y: number }[] = [];
    const data2: { x: number, y: number }[] = [];
    let prev = 100;
    let prev2 = 80;

    for (let i = 0; i < 1000; i++) {
      prev += 5 - Math.random() * 10;
      data.push({ x: i, y: prev });
      prev2 += 5 - Math.random() * 10;
      data2.push({ x: i, y: prev2 });
    }

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Dataset 1',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            pointRadius: 0,
            data: data,
          },
          {
            label: 'Dataset 2',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            pointRadius: 0,
            data: data2,
          }
        ]
      },
      options: {
        interaction: {
          intersect: false
        },
        plugins: {
          legend: {
            display: true
          },
          title: {
            display: true,
            text: 'Progressive Line Chart without Points'
          }
        },
        scales: {
          x: {
            type: 'linear'
          },
          y: {
            beginAtZero: true
          }
        }
      }
    };

    this.chart = new Chart('prograssiveLineChart', config);
  }
}
