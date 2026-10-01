import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: 'input[type="number"][appIntegersOnly]',
	standalone: true
})
export class IntegersOnlyDirective {
	readonly #forbiddenCharacters: string[] = ['.', ',', 'e', 'E'];

	public constructor() {
		// Nothing to do so far
	}

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent): void {
		if (this.#forbiddenCharacters.includes(event.key)) {
			event.preventDefault();
		}
	}
}
