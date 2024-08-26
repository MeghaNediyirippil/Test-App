import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables, ChartConfiguration, ChartData } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-progressive-doughnut-chart',
  standalone: true,
  imports: [],
  templateUrl: './progressive-doughnut-chart.component.html',
  styleUrls: ['./progressive-doughnut-chart.component.css']
})
export class ProgressiveDoughnutChartComponent implements OnInit {
  @ViewChild('doughnutChart1', { static: true }) doughnutChart1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChart2', { static: true }) doughnutChart2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChart3', { static: true }) doughnutChart3!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChart4', { static: true }) doughnutChart4!: ElementRef<HTMLCanvasElement>;

  chart1!: Chart<'doughnut'>;
  chart2!: Chart<'doughnut'>;
  chart3!: Chart<'doughnut'>;
  chart4!: Chart<'doughnut'>;

  dataValues1 = [50, 50];
  dataValues2 = [60, 40];
  dataValues3 = [70, 30];
  dataValues4 = [80, 20];

  private isDragging = false;
  private startX = 0;
  private startY = 0;

  ngOnInit(): void {
    this.createCharts();
    this.setupEvents();
  }

  createCharts(): void {
    this.chart1 = this.createDoughnutChart(this.doughnutChart1.nativeElement, this.dataValues1, ['rgb(255, 99, 132)', 'rgb(54, 162, 235)']);
    this.chart2 = this.createDoughnutChart(this.doughnutChart2.nativeElement, this.dataValues2, ['rgb(75, 192, 192)', 'rgb(153, 102, 255)']);
    this.chart3 = this.createDoughnutChart(this.doughnutChart3.nativeElement, this.dataValues3, ['rgb(255, 159, 64)', 'rgb(255, 205, 86)']);
    this.chart4 = this.createDoughnutChart(this.doughnutChart4.nativeElement, this.dataValues4, ['rgb(255, 99, 132)', 'rgb(235, 89, 152)']);
  }

  createDoughnutChart(canvas: HTMLCanvasElement, dataValues: number[], colors: string[]): Chart<'doughnut'> {
    const data: ChartData<'doughnut'> = {
      labels: ['Segment 1', 'Segment 2'],
      datasets: [{
        label: 'Dataset',
        data: dataValues,
        backgroundColor: colors,
        hoverOffset: 4
      }]
    };

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
        }
      }
    };

    return new Chart(canvas, config);
  }

  setupEvents(): void {
    const canvasElements = [
      this.doughnutChart1.nativeElement,
      this.doughnutChart2.nativeElement,
      this.doughnutChart3.nativeElement,
      this.doughnutChart4.nativeElement
    ];

    canvasElements.forEach(canvas => {
      canvas.addEventListener('wheel', this.handleScroll.bind(this, canvas));
      canvas.addEventListener('mousedown', this.handleMouseDown.bind(this, canvas));
      canvas.addEventListener('mousemove', this.handleMouseMove.bind(this, canvas));
      canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    });
  }

  handleScroll(canvas: HTMLCanvasElement, event: WheelEvent): void {
    event.preventDefault();
    const delta = Math.sign(event.deltaY) * 10;

    if (canvas === this.doughnutChart1.nativeElement) {
      this.dataValues1 = this.dataValues1.map(value => Math.max(0, value + delta));
      this.chart1.data.datasets[0].data = [...this.dataValues1];
      this.chart1.update();
    }
    if (canvas === this.doughnutChart2.nativeElement) {
      this.dataValues2 = this.dataValues2.map(value => Math.max(0, value + delta));
      this.chart2.data.datasets[0].data = [...this.dataValues2];
      this.chart2.update();
    }
    if (canvas === this.doughnutChart3.nativeElement) {
      this.dataValues3 = this.dataValues3.map(value => Math.max(0, value + delta));
      this.chart3.data.datasets[0].data = [...this.dataValues3];
      this.chart3.update();
    }
    if (canvas === this.doughnutChart4.nativeElement) {
      this.dataValues4 = this.dataValues4.map(value => Math.max(0, value + delta));
      this.chart4.data.datasets[0].data = [...this.dataValues4];
      this.chart4.update();
    }
  }

  handleMouseDown(canvas: HTMLCanvasElement, event: MouseEvent): void {
    // Left mouse button
    if (event.button === 0) { 
      this.isDragging = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
    }
  }

  handleMouseMove(canvas: HTMLCanvasElement, event: MouseEvent): void {
    if (this.isDragging) {
      const deltaY = event.clientY - this.startY;

      if (canvas === this.doughnutChart1.nativeElement) {
        this.dataValues1 = this.dataValues1.map(value => Math.max(0, value + deltaY));
        this.chart1.data.datasets[0].data = [...this.dataValues1];
        this.chart1.update();
      }
      if (canvas === this.doughnutChart2.nativeElement) {
        this.dataValues2 = this.dataValues2.map(value => Math.max(0, value + deltaY));
        this.chart2.data.datasets[0].data = [...this.dataValues2];
        this.chart2.update();
      }
      if (canvas === this.doughnutChart3.nativeElement) {
        this.dataValues3 = this.dataValues3.map(value => Math.max(0, value + deltaY));
        this.chart3.data.datasets[0].data = [...this.dataValues3];
        this.chart3.update();
      }
      if (canvas === this.doughnutChart4.nativeElement) {
        this.dataValues4 = this.dataValues4.map(value => Math.max(0, value + deltaY));
        this.chart4.data.datasets[0].data = [...this.dataValues4];
        this.chart4.update();
      }

      this.startX = event.clientX;
      this.startY = event.clientY;
    }
  }

  handleMouseUp(event: MouseEvent): void {
    // Left mouse button
    if (event.button === 0) { 
      this.isDragging = false;
    }
  }
}
