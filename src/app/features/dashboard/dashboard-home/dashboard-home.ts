import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.css']
})
export class DashboardComponent implements OnInit {
  jobs: Job[] = [];

  totalJobs = 0;
  appliedCount = 0;
  interviewCount = 0;
  offerCount = 0;
  rejectedCount = 0;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.jobs$.subscribe(jobs => {
      this.jobs = jobs;
      this.calculateStats();
    });
  }

  calculateStats(): void {
    this.totalJobs = this.jobs.length;
    this.appliedCount = this.jobs.filter(j => j.status === 'Applied').length;
    this.interviewCount = this.jobs.filter(j => j.status === 'Interview').length;
    this.offerCount = this.jobs.filter(j => j.status === 'Offer').length;
    this.rejectedCount = this.jobs.filter(j => j.status === 'Rejected').length;
  }
}