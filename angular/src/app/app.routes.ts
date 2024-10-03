import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: DashboardComponent },
  { path: '**', redirectTo: '/' } // This will redirect any unknown paths to the dashboard
];

