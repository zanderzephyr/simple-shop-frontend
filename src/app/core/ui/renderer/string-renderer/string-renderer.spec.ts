import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringRendererComponent } from './string-renderer';

describe('StringRenderer', () => {
	let component: StringRendererComponent;
	let fixture: ComponentFixture<StringRendererComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StringRendererComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(StringRendererComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
