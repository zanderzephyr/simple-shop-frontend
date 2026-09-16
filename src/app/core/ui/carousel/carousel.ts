import { Component, input, InputSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * This component is so far constructed to hold exactly one content element. Do not add more. There might be issues
 * with line wrapping.
 */
@Component({
	selector: 'app-carousel',
	imports: [MatButtonModule, MatIconModule],
	templateUrl: './carousel.html',
	styleUrl: './carousel.scss'
})
export class CarouselComponent {
	public scrollHorizontally: InputSignal<boolean> = input(true);
	public scrollCyclically: InputSignal<boolean> = input(false);

	public constructor() {
		// Nothing to do so far
	}

	protected onLeftClick(): void {

	}

	protected onRightClick(): void {

	}

	protected onUpClick(): void {

	}

	protected onDownClick(): void {

	}
}
