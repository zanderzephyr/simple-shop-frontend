import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MediaType } from '@features/item/model/item';

@Component({
  selector: 'media-type-sidebar-filter',
  imports: [MatSelectModule, MatFormFieldModule],
  templateUrl: './media-type-sidebar-filter.html',
  styleUrl: './media-type-sidebar-filter.css',
})
export class MediaTypeSidebarFilter {
  protected static readonly allMediaTypeValue = 'All';
  protected mediaTypes: Signal<MediaType[]> = signal(Object.values(MediaType));
  protected selectedMediaType: WritableSignal<string> = signal<string>(
    MediaTypeSidebarFilter.allMediaTypeValue,
  );

  protected getAllMediaTypesValue() {
    return MediaTypeSidebarFilter.allMediaTypeValue;
  }
}
