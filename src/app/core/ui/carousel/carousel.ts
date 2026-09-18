import {
	afterNextRender,
	Component,
	DestroyRef,
	ElementRef,
	inject,
	input,
	InputSignal,
	Signal,
	signal,
	viewChild,
	WritableSignal
} from '@angular/core';
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

	/**
	 * Scroll step in pixels. If undefined, the viewport height or width is used.
	 */
	public scrollStep: InputSignal<number | undefined> = input<number | undefined>(undefined);

	// using TS private instead of JS private due to Angular restrictions.
	private readonly carouselContent: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>('carouselContent');

	protected readonly scrollButtonsVisible: WritableSignal<boolean> = signal(false);
	readonly #destroyRef = inject(DestroyRef);

	public constructor() {
		afterNextRender({
			// execute in the read phase to make sure the element access doesn't cause negative recalculation loops
			read: () => {
				const element: HTMLDivElement = this.carouselContent().nativeElement;

				const observer: ResizeObserver = new ResizeObserver(() => this.#updateScrollButtonsVisible());
				this.#destroyRef.onDestroy(() => observer.disconnect());
				observer.observe(element);
			}
		});
	}

	protected onLeftClick(): void {
		this.#scroll(-this.#getScrollStep());
	}

	protected onRightClick(): void {
		this.#scroll(this.#getScrollStep());
	}

	protected onUpClick(): void {
		this.#scroll(-this.#getScrollStep());
	}

	protected onDownClick(): void {
		this.#scroll(this.#getScrollStep());
	}

	/**
	 * Calculates how far to scroll. Defaults to the visible container width/height.
	 */
	#getScrollStep(): number {
		const configuredScrollStep: number | undefined = this.scrollStep();
		if (configuredScrollStep !== undefined) {
			return configuredScrollStep;
		} else {
			const element: HTMLDivElement = this.carouselContent().nativeElement;
			return this.scrollHorizontally() ? element.clientWidth : element.clientHeight;
		}
	}

	#scroll(offset: number): void {
		if (offset !== 0) {
			const element: HTMLDivElement = this.carouselContent().nativeElement;

			let scrollToOptions: ScrollToOptions = { behavior: 'smooth' };

			if (this.scrollHorizontally()) {
				let newScrollLeft: number = element.scrollLeft + offset;
				scrollToOptions.left = newScrollLeft;
			} else {
				let newScrollTop: number = element.scrollTop + offset;
				scrollToOptions.top = newScrollTop;
			}

			element.scrollTo(scrollToOptions);
		}
	}

	#updateScrollButtonsVisible(): void {
		const element: HTMLDivElement = this.carouselContent().nativeElement;

		const hasOverflow: boolean = this.scrollHorizontally()
			? element.scrollWidth > element.clientWidth
			: element.scrollHeight > element.clientHeight;

		this.scrollButtonsVisible.set(hasOverflow);
	}
}
