import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JobService } from './jobs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private jobService: JobService) {}

  getApplicationStats(): Observable<any> {
    const jobs = this.jobService.getJobs();
    const stats = {
      total: jobs.length,
      applied: jobs.filter(j => j.status === 'Applied').length,
      interview: jobs.filter(j => j.status === 'Interview').length,
      offer: jobs.filter(j => j.status === 'Offer').length,
      rejected: jobs.filter(j => j.status === 'Rejected').length,
    };
    return of(stats);
  }

  getCompanyStats(): Observable<any> {
    const jobs = this.jobService.getJobs();
    const companies = new Map<string, number>();
    
    jobs.forEach(job => {
      companies.set(job.company, (companies.get(job.company) || 0) + 1);
    });

    return of(Array.from(companies, ([name, value]) => ({ name, value })));
  }

  getMonthlyStats(): Observable<any> {
    const jobs = this.jobService.getJobs();
    const months = new Map<string, number>();
    
    jobs.forEach(job => {
      const date = new Date(job.appliedDate);
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      months.set(month, (months.get(month) || 0) + 1);
    });

    return of(Array.from(months, ([month, applications]) => ({ month, applications })));
  }

  getStatusDistribution(): Observable<any> {
    const jobs = this.jobService.getJobs();
    return of({
      applied: jobs.filter(j => j.status === 'Applied').length,
      interview: jobs.filter(j => j.status === 'Interview').length,
      offer: jobs.filter(j => j.status === 'Offer').length,
      rejected: jobs.filter(j => j.status === 'Rejected').length,
    });
  }
}
