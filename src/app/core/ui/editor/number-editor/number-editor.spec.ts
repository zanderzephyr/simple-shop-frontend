import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberEditorComponent } from './number-editor';

describe('NumberEditor', () => {
	let component: NumberEditorComponent;
	let fixture: ComponentFixture<NumberEditorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NumberEditorComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(NumberEditorComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
