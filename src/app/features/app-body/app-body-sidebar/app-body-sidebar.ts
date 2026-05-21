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
import { SidebarAdmin } from './sidebar-admin/sidebar-admin';
import { SidebarFilters } from './sidebar-filters/sidebar-filters';

@Component({
  selector: 'app-body-sidebar',
  imports: [SidebarFilters, SidebarAdmin],
  templateUrl: './app-body-sidebar.html',
  styleUrl: './app-body-sidebar.css',
})
export class AppBodySidebarComponent {
  public readonly visibilityChange: OutputEmitterRef<boolean> = output<boolean>();

  protected readonly adminVisible: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly filtersVisible: WritableSignal<boolean> = signal<boolean>(false);

  readonly #isVisible: Signal<boolean> = computed(
    () => this.adminVisible() || this.filtersVisible(),
  );

  constructor() {
    effect(() => {
      this.visibilityChange.emit(this.#isVisible());
    });
  }
}
