import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroupDirective,
  AbstractControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GeneralDialogContentComponent } from '@ui/dialog/general-dialog/general-dialog-content';
import { ItemEditorDialogData } from './item-editor-dialog-data';
import { Item, ItemBuilder, MediaType } from '@api/item/model/item';

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
    stock: [this.#initialItem?.getStock() ?? null, [Validators.required, Validators.min(0)]],
    price: [this.#initialItem?.getPrice() ?? null, [Validators.required, Validators.min(0)]],
    imageUrl: [
      this.#initialItem?.getImageUrl() ?? null,
      [Validators.required, Validators.maxLength(2048)],
    ],
  });

  protected readonly isSubmitted: WritableSignal<boolean> = signal(false);

  readonly #formTrigger: Signal<unknown> = toSignal(
    merge(this.itemForm.statusChanges, this.itemForm.valueChanges),
    { initialValue: null },
  );

  protected isTitleFieldInvalid: Signal<boolean> = computed(() => {
    return this.#isFieldInvalid('title');
  });

  protected isMediaTypeFieldInvalid: Signal<boolean> = computed(() => {
    return this.#isFieldInvalid('mediaType');
  });

  protected isStockFieldInvalid: Signal<boolean> = computed(() => {
    return this.#isFieldInvalid('stock');
  });

  protected isPriceFieldInvalid: Signal<boolean> = computed(() => {
    return this.#isFieldInvalid('price');
  });

  protected isImageUrlFieldInvalid: Signal<boolean> = computed(() => {
    return this.#isFieldInvalid('imageUrl');
  });

  constructor() {
    super();
  }

  #isFieldInvalid(fieldName: string): boolean {
    this.#formTrigger();

    const field: AbstractControl<unknown, unknown, unknown> | null = this.itemForm.get(fieldName);
    if (field?.invalid && (field?.touched || this.isSubmitted())) {
      return true;
    }
    return false;
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

    if (this.itemForm.valid) {
      const itemShape: ItemShape = this.itemForm.getRawValue();
      this.setResult(this.#createItem(itemShape));
      super.onConfirm();
    }
  }

  #createItem(itemShape: ItemShape): Item {
    return new ItemBuilder() //
      .setTitle(itemShape.title!) //
      .setMediaType(itemShape.mediaType!) //
      .setStock(itemShape.stock!) //
      .setPrice(itemShape.price!) //
      .setImageUrl(itemShape.imageUrl!) //
      .build();
  }

  protected override onCancel(): void {
    this.setResult(undefined);

    super.onCancel();
  }

  // TODO Maybe add this to MediaType?
  protected compareMediaTypes(o1: MediaType | null, o2: MediaType | null): boolean {
    return o1?.id === o2?.id;
  }
}
