import {
  Component,
  Signal,
  computed,
  signal,
  WritableSignal,
  output,
  OutputEmitterRef,
  effect,
} from '@angular/core';
import { SidebarFiltersComponent } from './sidebar-filters/sidebar-filters';

@Component({
  selector: 'app-body-sidebar',
  imports: [SidebarFiltersComponent],
  templateUrl: './body-sidebar.html',
  styleUrl: './body-sidebar.scss',
})
export class BodySidebarComponent {
  public readonly visibilityChange: OutputEmitterRef<boolean> = output<boolean>();

  protected readonly filtersVisible: WritableSignal<boolean> = signal<boolean>(false);

  readonly #isVisible: Signal<boolean> = computed(() => this.filtersVisible());

  constructor() {
    effect(() => {
      this.visibilityChange.emit(this.#isVisible());
    });
  }
}
