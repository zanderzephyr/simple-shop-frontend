import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDialogComponent } from './info-dialog';

describe('InfoDialog', () => {
	let component: InfoDialogComponent;
	let fixture: ComponentFixture<InfoDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [InfoDialogComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(InfoDialogComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
