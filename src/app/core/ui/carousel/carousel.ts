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

	#defaultScrollStepInPx: number | undefined = undefined;
	/**
	 * Scroll step in pixels. If undefined, the viewport height or width is used.
	 */
		// First generic type param of input is the type left of =. The second generic type param is the type of the
		// value parameter of the transform function. input returns an InputSignalWithTransform<TARGET_TYPE,
		// SOURCE_TYPE> and InputSignal extends InputSignalWithTransform<T,T>.
	public scrollStepInPx: InputSignal<number | undefined> = input<number | undefined, number | undefined>(this.#defaultScrollStepInPx, {
		transform: this.#validateScrollStepInPx
	});

	#defaultInitialScrollDelayInMs: number = 400;
	/**
	 * Delay in milliseconds before continuous scrolling starts. Defaults to 400ms.
	 */
	public initialScrollDelayInMs: InputSignal<number> = input(this.#defaultInitialScrollDelayInMs, {
		transform: this.#validateInitialScrollDelayInMs
	});

	#defaultContinuousScrollStepInPercent: number = 0.15;
	/**
	 * Scroll step for continuous scrolling via keeping the scroll buttons pressed down. The number is interpreted as
	 * a percentage of the scrollStep parameter. Defaults to 0.15 (i.e. 15% of the scrollStep).
	 */
	public continuousScrollStepInPercent: InputSignal<number> = input(this.#defaultContinuousScrollStepInPercent, {
		transform: this.#validateContinuousScrollStepInPercent
	});

	#defaultContinuousScrollSpeedInMs: number = 40;
	/**
	 * Scroll speed for continuous scrolling via keeping the scroll buttons pressed down in milliseconds. Defaults to
	 * 40ms (which looks nearly fluid).
	 */
	public continuousScrollSpeedInMs: InputSignal<number> = input(this.#defaultContinuousScrollSpeedInMs, {
		transform: this.#validateContinuousScrollSpeedInMs
	});

	// using TS private instead of JS private due to Angular restrictions.
	private readonly carouselContent: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>('carouselContent');

	protected readonly scrollButtonsVisible: WritableSignal<boolean> = signal(false);
	readonly #destroyRef: DestroyRef = inject(DestroyRef);

	protected ScrollDirection = ScrollDirection;

	#continuousScrollingHandle: number | undefined = undefined;
	#initialScrollDelayHandle: number | undefined = undefined;
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

	#validateScrollStepInPx(value: number | undefined): number | undefined {
		let valueToUse: number | undefined = value;

		if (value !== undefined && value <= 0) {
			console.warn('Scroll step in pixel has to be >0. Falling back to ' + this.#defaultScrollStepInPx + '.');
			valueToUse = this.#defaultScrollStepInPx;
		}

		return valueToUse;
	}

	#validateInitialScrollDelayInMs(value: number): number {
		let valueToUse: number = value;

		if (value < 0) {
			console.warn('Initial scroll delay in ms has to be >=0. Falling back to ' + this.#defaultInitialScrollDelayInMs + '.');
			valueToUse = this.#defaultInitialScrollDelayInMs;
		}

		return valueToUse;
	}

	#validateContinuousScrollStepInPercent(value: number): number {
		let valueToUse: number = value;

		if (value <= 0) {
			console.warn('Continuous scroll step in percent has to be >0. Falling back to ' + this.#defaultContinuousScrollStepInPercent + '.');
			valueToUse = this.#defaultContinuousScrollStepInPercent;
		}

		return valueToUse;
	}

	#validateContinuousScrollSpeedInMs(value: number): number {
		let valueToUse: number = value;

		if (value <= 0) {
			console.warn('Continuous scroll speed in ms has to be >0. Falling back to ' + this.#defaultContinuousScrollSpeedInMs + '.');
			valueToUse = this.#defaultContinuousScrollSpeedInMs;
		}

		return valueToUse;
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

		this.#initialScrollDelayHandle = setTimeout(() => {
			const continuousStep: number = Math.round(this.#getScrollStep() * this.continuousScrollStepInPercent()) * directionNumerical;
			this.#continuousScrollingHandle = setInterval(() => {
				if (this.#activeHoveredDirection === direction) {
					this.#scroll(continuousStep, 'auto');
				}
			}, this.continuousScrollSpeedInMs());
		}, this.initialScrollDelayInMs());
	}

	protected stopScrolling(): void {
		if (this.#initialScrollDelayHandle !== undefined) {
			clearTimeout(this.#initialScrollDelayHandle);
			this.#initialScrollDelayHandle = undefined;
		}

		if (this.#continuousScrollingHandle !== undefined) {
			clearInterval(this.#continuousScrollingHandle);
			this.#continuousScrollingHandle = undefined;
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
