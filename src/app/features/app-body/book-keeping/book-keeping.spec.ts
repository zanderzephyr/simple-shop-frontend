import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookKeepingComponent } from './book-keeping';

describe('BookKeeping', () => {
	let component: BookKeepingComponent;
	let fixture: ComponentFixture<BookKeepingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BookKeepingComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(BookKeepingComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
