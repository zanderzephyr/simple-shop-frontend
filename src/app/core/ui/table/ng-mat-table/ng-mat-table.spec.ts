import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMatTableComponent } from './ng-mat-table';

describe('Table', () => {
	let component: NgMatTableComponent;
	let fixture: ComponentFixture<NgMatTableComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NgMatTableComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(NgMatTableComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
