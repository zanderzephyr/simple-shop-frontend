import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyContentComponent } from './body-content';

describe('BodyContent', () => {
	let component: BodyContentComponent;
	let fixture: ComponentFixture<BodyContentComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BodyContentComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(BodyContentComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
