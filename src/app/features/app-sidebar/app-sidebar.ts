import { Component } from '@angular/core';
import { SidebarFilters } from '@app/features/app-sidebar/sidebar-filters/sidebar-filters';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarFilters],
  templateUrl: './app-sidebar.html',
  styleUrl: './app-sidebar.css',
})
export class AppSidebarComponent {}
