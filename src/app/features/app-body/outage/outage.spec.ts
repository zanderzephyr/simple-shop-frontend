import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutageComponent } from './outage';

describe('Outage', () => {
	let component: OutageComponent;
	let fixture: ComponentFixture<OutageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [OutageComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(OutageComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
