import { Component } from '@angular/core';

import {Chart,registerables} from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-monthly-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './monthly-bar-chart.component.html',
  styleUrl: './monthly-bar-chart.component.css'
})
export class MonthlyBarChartComponent {

  // public config :any= {
  //   type: 'bar',
  //   data: {
  //     labels: ['JAN','FEB','MAR','APR','MAY','JUN','JUL'],
  //     datasets: [{
  //       label: 'My First Dataset',
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //         'rgba(255, 205, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(201, 203, 207, 0.2)'
  //       ],
  //       borderColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(255, 159, 64)',
  //         'rgb(255, 205, 86)',
  //         'rgb(75, 192, 192)',
  //         'rgb(54, 162, 235)',
  //         'rgb(153, 102, 255)',
  //         'rgb(201, 203, 207)'
  //       ],
  //       borderWidth: 1
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true
  //       }
  //     }
  //   },
  // };


  // public configg = {
  //   type: 'line',
  //   data: {
  //     datasets: [{
  //       borderColor: 'rgba(255, 99, 132, 0.2)',
  //       borderWidth: 1,
  //       radius: 0,
  //       data: [],
  //     },
  //     {
  //       borderColor: 'rgba(255, 99, 132, 0.2)',
  //       borderWidth: 1,
  //       radius: 0,
  //       data: [],
  //     }]
  //   },
  //   options: {
  //     animation:{
        
  //     },
  //     interaction: {
  //       intersect: false
  //     },
  //     plugins: {
  //       legend: false
  //     },
  //     scales: {
  //       x: {
  //         type: 'linear'
  //       }
  //     }
  //   }
  // };
   
  // chart:any;
  // ngOnInit():void{
  //   this.chart=new Chart('MyChart',this.config)
  // }

}
