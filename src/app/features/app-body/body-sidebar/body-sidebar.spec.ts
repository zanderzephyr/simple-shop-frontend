import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodySidebarComponent } from './body-sidebar';

describe('BodySidebar', () => {
	let component: BodySidebarComponent;
	let fixture: ComponentFixture<BodySidebarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BodySidebarComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(BodySidebarComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
