import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MediaType } from '@api/item/model/media-type';

@Component({
  selector: 'app-media-type-sidebar-filter',
  imports: [MatSelectModule, MatFormFieldModule],
  templateUrl: './media-type-sidebar-filter.html',
  styleUrl: './media-type-sidebar-filter.scss',
})
export class MediaTypeSidebarFilterComponent {
  readonly #allMediaTypeValue: string = 'All';

  protected readonly mediaTypes: Signal<readonly MediaType[]> = signal(
    Object.freeze(Object.values(MediaType)),
  ).asReadonly();

  protected readonly selectedMediaType: WritableSignal<string> = signal<string>(
    this.#allMediaTypeValue,
  );

  constructor() {
    // Nothing to do so far
  }

  protected updateSelectedMediaType(mediaType: string): void {
    this.selectedMediaType.set(mediaType);
  }

  protected getAllMediaTypesValue(): string {
    return this.#allMediaTypeValue;
  }
}
