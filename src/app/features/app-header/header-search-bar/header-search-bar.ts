import { Component, computed, inject, Signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LocalizationService } from '@core/localization/localization-service';
import * as Keys from './header-search-utils';

@Component({
	selector: 'app-header-search-bar',
	imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIcon],
	templateUrl: './header-search-bar.html',
	styleUrl: './header-search-bar.scss'
})
export class HeaderSearchBarComponent {
	readonly #formBuilder: FormBuilder = inject(FormBuilder);
	readonly #localizationService: LocalizationService = inject(LocalizationService);

	protected readonly searchForm = this.#formBuilder.group({
		searchText: [null, []]
	});

	protected readonly searchButtonText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.SEARCH_BUTTON_LABEL_KEY));

	constructor() {
		// Nothing to do so far
	}

	protected search(): void {
		// TODO
	}
}
