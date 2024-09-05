import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TablesComponent } from "./tables/tables.component";
import { FormsComponent } from "./forms/forms.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LineChartComponent } from "./line-chart/line-chart.component";
import { MonthlyLineChartComponent } from "./monthly-line-chart/monthly-line-chart.component";
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { DoughnutChartComponent } from "./doughnut-chart/doughnut-chart.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, HeaderComponent, SidebarComponent, TablesComponent,
    FormsComponent, DashboardComponent, LineChartComponent, MonthlyLineChartComponent,
    BarChartComponent, DoughnutChartComponent, RouterLink,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-app';
}
