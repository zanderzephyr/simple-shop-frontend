import { Component, computed, effect, output, OutputEmitterRef, signal, Signal, WritableSignal } from '@angular/core';
import { SidebarFiltersComponent } from './sidebar-filters/sidebar-filters';

@Component({
	selector: 'app-item-search-sidebar',
	imports: [SidebarFiltersComponent],
	templateUrl: './item-search-sidebar.html',
	styleUrl: './item-search-sidebar.scss'
})
export class ItemSearchSidebarComponent {
	public readonly visibilityChange: OutputEmitterRef<boolean> = output<boolean>();

	protected readonly filtersVisible: WritableSignal<boolean> = signal<boolean>(false);

	readonly #isVisible: Signal<boolean> = computed(() => this.filtersVisible());

	constructor() {
		effect(() => {
			this.visibilityChange.emit(this.#isVisible());
		});
	}
}
