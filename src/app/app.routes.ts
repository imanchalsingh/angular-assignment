import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { JobFormComponent } from '../components/job-form/job-form.component';
import { JobListComponent } from '../components/job-list/job-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}