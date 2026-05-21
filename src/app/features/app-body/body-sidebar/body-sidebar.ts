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
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin';
import { SidebarFiltersComponent } from './sidebar-filters/sidebar-filters';

@Component({
  selector: 'app-body-sidebar',
  imports: [SidebarFiltersComponent, SidebarAdminComponent],
  templateUrl: './body-sidebar.html',
  styleUrl: './body-sidebar.css',
})
export class BodySidebarComponent {
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
