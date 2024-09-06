import { Routes } from '@angular/router';
import { TablesComponent } from './tables/tables.component';
import { FormsComponent } from './forms/forms.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalenderComponent } from './calender/calender.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'calender', component: CalenderComponent },
    { path: 'table', component: TablesComponent },
    { path: 'forms', component: FormsComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent }

];
