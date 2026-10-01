import { Directive, HostListener } from '@angular/core';
import { IntegersOnlyDirective } from './integers-only-directive';

@Directive({
	selector: 'input[type="number"][appPositiveIntegersOnly]',
	standalone: true
})
export class PositiveIntegersOnlyDirective extends IntegersOnlyDirective {
	public constructor() {
		super();
	}

	@HostListener('keydown', ['$event'])
	override onKeyDown(event: KeyboardEvent): void {
		super.onKeyDown(event);

		if (event.key === '-') {
			event.preventDefault();
		}
	}
}
