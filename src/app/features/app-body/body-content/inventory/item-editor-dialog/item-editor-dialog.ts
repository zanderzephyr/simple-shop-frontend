import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GeneralDialogContentComponent } from '@ui/dialog/general-dialog/general-dialog-content';
import { ItemEditorDialogData } from './item-editor-dialog-data';
import { Item, ItemBuilder } from '@api/item/model/item';
import { MediaType, compareMediaTypes } from '@api/item/model/media-type';
import { JAVA_MAX_INT_VALUE } from '@core/utils/data-type-utils';

interface ItemShape {
  title: string | null;
  mediaType: MediaType | null;
  stock: number | null;
  price: number | null;
  imageUrl: string | null;
}

@Component({
  selector: 'app-item-editor-dialog',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './item-editor-dialog.html',
  styleUrl: './item-editor-dialog.css',
})
export class ItemEditorDialogComponent extends GeneralDialogContentComponent<
  ItemEditorDialogData,
  Item
> {
  protected readonly mediaTypes: Signal<readonly MediaType[]> = signal(
    Object.freeze(Object.values(MediaType)),
  ).asReadonly();

  readonly #formBuilder: FormBuilder = inject(FormBuilder);

  readonly #initialItem: Item | undefined = this.getDialogData().getItem();

  protected readonly itemForm = this.#formBuilder.group({
    title: [
      this.#initialItem?.getTitle() ?? null,
      [Validators.required, Validators.maxLength(400)],
    ],
    mediaType: [this.#initialItem?.getMediaType() ?? null, [Validators.required]],
    stock: [
      this.#initialItem?.getStock() ?? null,
      [Validators.required, Validators.min(0), Validators.max(JAVA_MAX_INT_VALUE)],
    ],
    price: [
      this.#initialItem?.getPrice() ?? null,
      [Validators.required, Validators.min(0), Validators.max(JAVA_MAX_INT_VALUE)],
    ],
    imageUrl: [
      this.#initialItem?.getImageUrl() ?? null,
      [Validators.required, Validators.maxLength(2048)],
    ],
  });

  protected readonly isSubmitted: WritableSignal<boolean> = signal(false);

  protected readonly compareMediaTypes: (o1: MediaType | null, o2: MediaType | null) => boolean =
    compareMediaTypes;

  protected readonly badIntErrorMessage: string =
    ' must not be empty, &lt; 0 or &gt; ' + JAVA_MAX_INT_VALUE + '!';

  constructor() {
    super();
  }

  // TODO Not called currently. Add a button for that or remove this method.
  protected discard(formDirective: FormGroupDirective): void {
    this.isSubmitted.set(false);
    formDirective.resetForm({
      title: this.#initialItem?.getTitle() ?? null,
      mediaType: this.#initialItem?.getMediaType() ?? null,
      stock: this.#initialItem?.getStock() ?? null,
      price: this.#initialItem?.getPrice() ?? null,
      imageUrl: this.#initialItem?.getImageUrl() ?? null,
    });
  }

  protected override onConfirm(): void {
    this.isSubmitted.set(true);

    this.itemForm.markAllAsTouched();

    if (this.itemForm.valid) {
      const itemShape: ItemShape = this.itemForm.getRawValue();
      this.setResult(this.#createItem(itemShape));
      super.onConfirm();
    }
  }

  #createItem(itemShape: ItemShape): Item {
    const itemBuilder: ItemBuilder = new ItemBuilder() //
      .setTitle(itemShape.title!) //
      .setMediaType(itemShape.mediaType!) //
      .setStock(itemShape.stock!) //
      .setPrice(itemShape.price!) //
      .setImageUrl(itemShape.imageUrl!);

    if (this.#initialItem) {
      itemBuilder.setId(this.#initialItem.getId()!);
      itemBuilder.setVersion(this.#initialItem.getVersion()!);
    }

    return itemBuilder.build();
  }

  protected override onCancel(): void {
    this.setResult(undefined);

    super.onCancel();
  }
}
