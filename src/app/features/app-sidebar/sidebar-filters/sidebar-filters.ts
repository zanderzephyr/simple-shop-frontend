import { Component } from '@angular/core';
import { MediaTypeSidebarFilter } from './media-type-sidebar-filter/media-type-sidebar-filter';
import { PriceSidebarFilter } from './price-sidebar-filter/price-sidebar-filter';

@Component({
  selector: 'sidebar-filters',
  imports: [MediaTypeSidebarFilter, PriceSidebarFilter],
  templateUrl: './sidebar-filters.html',
  styleUrl: './sidebar-filters.css',
})
export class SidebarFilters {}
