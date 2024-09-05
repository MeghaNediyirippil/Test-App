import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [],
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent {

  chart1: Chart | undefined;
  chart2: Chart | undefined;

  ngOnInit(): void {
    const data = {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(118, 189, 238)',
          'rgb(48, 161, 236)',
          'rgb(196, 218, 254)'
        ],
        hoverOffset: 4
      }]
    };

    const config: any = {
      type: 'doughnut',
      data: data,
    };

    // Initialize the first doughnut chart
    this.chart1 = new Chart('doughnutChart1', config);

    // Initialize the second doughnut chart
    this.chart2 = new Chart('doughnutChart2', config);
  }

}
