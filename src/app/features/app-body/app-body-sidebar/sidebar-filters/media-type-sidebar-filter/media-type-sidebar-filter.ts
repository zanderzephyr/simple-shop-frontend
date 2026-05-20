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
  readonly #allMediaTypeValue = 'All';

  protected readonly mediaTypes: Signal<Readonly<MediaType[]>> = signal(
    Object.freeze(Object.values(MediaType)),
  ).asReadonly();

  protected readonly selectedMediaType: WritableSignal<string> = signal<string>(
    this.#allMediaTypeValue,
  );

  constructor() {}

  protected updateSelectedMediaType(mediaType: string) {
    this.selectedMediaType.set(mediaType);
  }

  protected getAllMediaTypesValue() {
    return this.#allMediaTypeValue;
  }
}
