import {
  Component,
  inject,
  Signal,
  computed,
  signal,
  WritableSignal,
  output,
  OutputEmitterRef,
  effect,
} from '@angular/core';
import { SidebarFilters } from './sidebar-filters/sidebar-filters';

@Component({
  selector: 'app-body-sidebar',
  imports: [SidebarFilters],
  templateUrl: './app-body-sidebar.html',
  styleUrl: './app-body-sidebar.css',
})
export class AppBodySidebarComponent {
  public readonly visibilityChange: OutputEmitterRef<boolean> = output<boolean>();

  protected readonly filtersVisible: WritableSignal<boolean> = signal<boolean>(false);

  readonly #isVisible: Signal<boolean> = computed(() => this.filtersVisible());

  constructor() {
    effect(() => {
      this.visibilityChange.emit(this.#isVisible());
    });
  }
}
