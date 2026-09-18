import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSidebarFilter } from './price-sidebar-filter';

describe('PriceSidebarFilter', () => {
	let component: PriceSidebarFilter;
	let fixture: ComponentFixture<PriceSidebarFilter>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PriceSidebarFilter]
		}).compileComponents();

		fixture = TestBed.createComponent(PriceSidebarFilter);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
