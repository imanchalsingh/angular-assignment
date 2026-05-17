
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filter.html',
  styleUrls: ['./search-filter.css']
})
export class SearchFilterComponent {
  @Output() searchChange = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<string>();

  searchTerm = '';
  selectedStatus = 'All';

  statuses = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];

  onSearch(): void {
    this.searchChange.emit(this.searchTerm);
  }

  onStatusChange(): void {
    this.statusChange.emit(this.selectedStatus);
  }
}