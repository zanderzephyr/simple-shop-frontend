import { Component, computed, effect, output, OutputEmitterRef, signal, Signal, WritableSignal } from '@angular/core';
import { SidebarFiltersComponent } from './sidebar-filters/sidebar-filters';

// TODO Move this component to under the search component, when the search component is created.
@Component({
	selector: 'app-body-sidebar',
	imports: [SidebarFiltersComponent],
	templateUrl: './body-sidebar.html',
	styleUrl: './body-sidebar.scss'
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
