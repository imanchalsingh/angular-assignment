import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../../models/job.models';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-card.html',
  styleUrls: ['./job-card.css']
})
export class JobCardComponent {
  @Input() job!: Job;

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onEdit(): void {
    this.edit.emit(this.job.id);
  }

  onDelete(): void {
    const confirmed = confirm(
      `Delete application for ${this.job.position} at ${this.job.company}?`
    );

    if (confirmed) {
      this.delete.emit(this.job.id);
    }
  }
}