import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JobService } from '../../../core/services/jobs';
import { Job } from '../../../models/job.models';
import { SearchFilterComponent } from '../../../shared/components/search-filter/search-filter';
import { JobCardComponent } from '../job-card/job-card';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, SearchFilterComponent, JobCardComponent],
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.css']
})
export class JobListComponent implements OnInit {
  allJobs: Job[] = [];
  filteredJobs: Job[] = [];

  searchTerm = '';
  selectedStatus = 'All';

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobService.jobs$.subscribe(jobs => {
      this.allJobs = jobs;
      this.applyFilters();
    });
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  applyFilters(): void {
    let jobs = [...this.allJobs];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      jobs = jobs.filter(job =>
        job.company.toLowerCase().includes(term) ||
        job.position.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term)
      );
    }

    if (this.selectedStatus !== 'All') {
      jobs = jobs.filter(job => job.status === this.selectedStatus);
    }

    this.filteredJobs = jobs;
  }

  editJob(id: string): void {
    this.router.navigate(['/edit-job', id]);
  }

  deleteJob(id: string): void {
    this.jobService.deleteJob(id);
  }
}