import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { MediaType } from '@features/item/model/item';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-sidebar-filters',
  imports: [MatSelectModule, MatFormFieldModule],
  templateUrl: './app-sidebar-filters.html',
  styleUrl: './app-sidebar-filters.css',
})
export class AppSidebarFilters {
  protected static readonly allMediaTypeValue = 'All';
  protected mediaTypes: Signal<MediaType[]> = signal(Object.values(MediaType));
  protected selectedMediaType: WritableSignal<string> = signal<string>(
    AppSidebarFilters.allMediaTypeValue,
  );

  protected getAllMediaTypesValue() {
    return AppSidebarFilters.allMediaTypeValue;
  }
}
