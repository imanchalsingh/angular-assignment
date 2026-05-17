import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isOpen = false;

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  closeSidebar(): void {
    this.isOpen = false;
  }

  menuItems = [
    { label: 'Dashboard', icon: '📊', route: '/dashboard' },
    { label: 'Jobs', icon: '💼', route: '/jobs' },
    { label: 'Add Job', icon: '➕', route: '/add-job' },
  ];
}
