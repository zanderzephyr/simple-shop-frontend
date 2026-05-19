import { Component, signal, WritableSignal } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'price-sidebar-filter',
  imports: [MatSliderModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './price-sidebar-filter.html',
  styleUrl: './price-sidebar-filter.css',
})
export class PriceSidebarFilter {
  // TODO This must be taken from the available items set later.
  protected readonly minLimit: number = 0;
  protected readonly maxLimit: number = 2000;

  protected minPrice: WritableSignal<number> = signal<number>(20);
  protected maxPrice: WritableSignal<number> = signal<number>(120);
}
