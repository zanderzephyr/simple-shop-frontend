import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberRendererComponent } from './number-renderer';

describe('NumberRenderer', () => {
	let component: NumberRendererComponent;
	let fixture: ComponentFixture<NumberRendererComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NumberRendererComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(NumberRendererComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
