import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCompanyLogoComponent } from './header-company-logo';

describe('HeaderCompanyLogo', () => {
	let component: HeaderCompanyLogoComponent;
	let fixture: ComponentFixture<HeaderCompanyLogoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeaderCompanyLogoComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(HeaderCompanyLogoComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
