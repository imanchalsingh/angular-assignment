import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './features/dashboard/dashboard-home/dashboard-home';
import { JobFormComponent } from './features/jobs/job-form/job-form';
import { JobListComponent } from './features/jobs/job-list/job-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardHomeComponent
  },
  {
    path: 'add-job',
    component: JobFormComponent
  },
  {
    path: 'edit-job/:id',
    component: JobFormComponent
  },
  {
    path: 'jobs',
    component: JobListComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];