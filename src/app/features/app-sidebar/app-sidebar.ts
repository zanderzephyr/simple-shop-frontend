import { Component } from '@angular/core';
import { AppSidebarFilters } from '@features/app-sidebar-filters/app-sidebar-filters';

@Component({
  selector: 'app-sidebar',
  imports: [AppSidebarFilters],
  templateUrl: './app-sidebar.html',
  styleUrl: './app-sidebar.css',
})
export class AppSidebarComponent {}
