import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private storageKey = 'job-tracker-data';

  private jobsSubject = new BehaviorSubject<Job[]>(this.loadJobs());
  jobs$ = this.jobsSubject.asObservable();

  constructor() {}

  // Get all jobs
  getJobs(): Job[] {
    return this.jobsSubject.value;
  }

  // Add new job
  addJob(job: Job): void {
    const jobs = [...this.getJobs(), job];
    this.updateState(jobs);
  }

  // Update existing job
  updateJob(updatedJob: Job): void {
    const jobs = this.getJobs().map(job =>
      job.id === updatedJob.id ? updatedJob : job
    );
    this.updateState(jobs);
  }

  // Delete job
  deleteJob(id: string): void {
    const jobs = this.getJobs().filter(job => job.id !== id);
    this.updateState(jobs);
  }

  // Get single job by ID
  getJobById(id: string): Job | undefined {
    return this.getJobs().find(job => job.id === id);
  }

  // Search jobs
  searchJobs(term: string): Job[] {
    const searchTerm = term.toLowerCase().trim();

    if (!searchTerm) {
      return this.getJobs();
    }

    return this.getJobs().filter(job =>
      job.company.toLowerCase().includes(searchTerm) ||
      job.position.toLowerCase().includes(searchTerm) ||
      job.location.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by status
  filterByStatus(status: string): Job[] {
    if (!status || status === 'All') {
      return this.getJobs();
    }

    return this.getJobs().filter(job => job.status === status);
  }

  // Save jobs and update observable
  private updateState(jobs: Job[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(jobs));
    this.jobsSubject.next(jobs);
  }

  // Load jobs from localStorage
  private loadJobs(): Job[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }
}