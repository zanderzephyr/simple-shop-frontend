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
import { ScrollDirection } from './scroll-direction';

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
	public scrollStepInPx: InputSignal<number | undefined> = input<number | undefined>(undefined);

	/**
	 * Delay in milliseconds before continuous scrolling starts. Defaults to 400ms.
	 */
	public initialScrollDelayInMs: InputSignal<number> = input(400);

	/**
	 * Scroll step for continuous scrolling via keeping the scroll buttons pressed down. The number is interpreted as
	 * a percentage of the scrollStep parameter. Defaults to 0.05 (i.e. 5% of the scrollStep).
	 */
	public continuousScrollStepInPx: InputSignal<number> = input(0.15);

	/**
	 * Scroll speed for continuous scrolling via keeping the scroll buttons pressed down in milliseconds. Defaults to
	 * 40ms (which looks nearly fluid).
	 */
	public continuousScrollingSpeedInMs: InputSignal<number> = input(40);

	// using TS private instead of JS private due to Angular restrictions.
	private readonly carouselContent: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>('carouselContent');

	protected readonly scrollButtonsVisible: WritableSignal<boolean> = signal(false);
	readonly #destroyRef: DestroyRef = inject(DestroyRef);

	protected ScrollDirection = ScrollDirection;

	#scrollingCallback: number | undefined = undefined;
	#delayTimeout: number | undefined = undefined;
	#documentMouseUpListener: (() => void) | undefined = undefined;
	#activeHoveredDirection: ScrollDirection | undefined = undefined;

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

	protected startScrolling(direction: ScrollDirection): void {
		this.stopScrolling(); // Just in case something weird happens

		this.#activeHoveredDirection = direction;

		const mouseUpListener = () => this.stopScrolling();
		document.addEventListener('mouseup', mouseUpListener);
		this.#documentMouseUpListener = () => document.removeEventListener('mouseup', mouseUpListener);

		const directionNumerical: number = (direction === ScrollDirection.BACKWARD ? -1 : 1);

		const step: number = this.#getScrollStep() * directionNumerical;
		this.#scroll(step, 'smooth');

		this.#delayTimeout = setTimeout(() => {
			const continuousStep: number = Math.round(this.#getScrollStep() * this.continuousScrollStepInPx()) * directionNumerical;
			this.#scrollingCallback = setInterval(() => {
				if (this.#activeHoveredDirection === direction) {
					this.#scroll(continuousStep, 'auto');
				}
			}, this.continuousScrollingSpeedInMs());
		}, this.initialScrollDelayInMs());
	}

	protected stopScrolling(): void {
		if (this.#delayTimeout !== undefined) {
			clearTimeout(this.#delayTimeout);
			this.#delayTimeout = undefined;
		}

		if (this.#scrollingCallback !== undefined) {
			clearInterval(this.#scrollingCallback);
			this.#scrollingCallback = undefined;
		}

		if (this.#documentMouseUpListener !== undefined) {
			this.#documentMouseUpListener();
			this.#documentMouseUpListener = undefined;
		}

		this.#activeHoveredDirection = undefined;
	}

	/**
	 * Calculates how far to scroll. Defaults to the visible container width/height.
	 */
	#getScrollStep(): number {
		const configuredScrollStep: number | undefined = this.scrollStepInPx();
		if (configuredScrollStep !== undefined) {
			return configuredScrollStep;
		} else {
			const element: HTMLDivElement = this.carouselContent().nativeElement;
			return this.scrollHorizontally() ? element.clientWidth : element.clientHeight;
		}
	}

	#scroll(offset: number, behavior: ScrollBehavior): void {
		if (offset !== 0) {
			const element: HTMLDivElement = this.carouselContent().nativeElement;
			let scrollToOptions: ScrollToOptions = { behavior };

			if (this.scrollHorizontally()) {
				scrollToOptions.left = element.scrollLeft + offset;
			} else {
				scrollToOptions.top = element.scrollTop + offset;
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

	protected onMouseEnter(direction: ScrollDirection): void {
		this.#activeHoveredDirection = direction;
	}

	protected onMouseLeave(): void {
		this.#activeHoveredDirection = undefined;
	}
}
