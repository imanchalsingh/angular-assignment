import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../core/services/jobs';
import { Job } from '../../../models/job.models';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-form.html',
  styleUrls: ['./job-form.css']
})
export class JobFormComponent implements OnInit {
  jobForm!: FormGroup;
  isEditMode = false;
  jobId: string = '';

  statusOptions = ['Applied', 'Interview', 'Offer', 'Rejected'];
  jobTypeOptions = ['Full-Time', 'Internship', 'Remote', 'Part-Time'];

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.jobId = this.route.snapshot.paramMap.get('id') || '';

    if (this.jobId) {
      this.isEditMode = true;
      const job = this.jobService.getJobById(this.jobId);

      if (job) {
        this.jobForm.patchValue(job);
      }
    }
  }

  initializeForm(): void {
    this.jobForm = this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      status: ['Applied', Validators.required],
      jobType: ['Full-Time', Validators.required],
      location: ['', Validators.required],
      salary: [''],
      appliedDate: [
        new Date().toISOString().split('T')[0],
        Validators.required
      ],
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }

    const job: Job = {
      id: this.isEditMode ? this.jobId : Date.now().toString(),
      ...this.jobForm.value
    };

    if (this.isEditMode) {
      this.jobService.updateJob(job);
    } else {
      this.jobService.addJob(job);
    }

    this.router.navigate(['/jobs']);
  }
}