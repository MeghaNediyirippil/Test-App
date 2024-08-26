import { Routes } from '@angular/router';
import { TablesComponent } from './tables/tables.component';
import { FormsComponent } from './forms/forms.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalenderComponent } from './calender/calender.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'calender', component: CalenderComponent },
    { path: 'table', component: TablesComponent },
    { path: 'forms', component: FormsComponent },
];
