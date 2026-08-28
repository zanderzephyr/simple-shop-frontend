import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLoginComponent } from './session-login';

describe('SessionLogin', () => {
	let component: SessionLoginComponent;
	let fixture: ComponentFixture<SessionLoginComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SessionLoginComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(SessionLoginComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
