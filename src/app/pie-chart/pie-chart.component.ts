import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  chart1: Chart| undefined;
  chart2: Chart| undefined;

  ngOnInit(): void {
    const Utils = {
      numbers: (cfg: { count: number; min: number; max: number }): number[] =>
        Array.from({ length: cfg.count }, () => Math.floor(Math.random() * (cfg.max - cfg.min + 1)) + cfg.min),
      CHART_COLORS: {
        blue1: 'rgb(204, 224, 240)',
        blue2: 'rgb(109, 180, 237)',
        blue3: 'rgb(5, 94, 166)',
        blue4: 'rgb(3, 38, 66)',
        Blue: 'rgb(54, 162, 235)',
        Purple: 'rgb(153, 102, 255)',
        Brown: 'rgb(139, 69, 19)',
        Grey: 'rgb(201, 203, 207)',
        Teal: 'rgb(0, 128, 128)'
      }
    };

    const data1 = {
      datasets: [
        {
          label: 'Dataset 1',
          data: Utils.numbers({ count: 4, min: 10, max: 100 }),
          backgroundColor: Object.values(Utils.CHART_COLORS),        }
      ]
    };

    const data2 = {
      datasets: [
        {
          label: 'Dataset 2',
          data: Utils.numbers({ count: 6, min: 20, max: 60 }),
          backgroundColor: Object.values(Utils.CHART_COLORS)
        }
      ]
    };

    // Configuration for the first pie chart
    const config1: any = {
      type: 'pie',
      data: data1,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          }
        }
      }
    };

    // Configuration for the second pie chart
    const config2: any= {
      type: 'pie',
      data: data2,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          }
        }
      }
    };

    // Initialize the charts
    this.chart1 = new Chart('pieChart1', config1);
    this.chart2 = new Chart('pieChart2', config2);
  }
}
