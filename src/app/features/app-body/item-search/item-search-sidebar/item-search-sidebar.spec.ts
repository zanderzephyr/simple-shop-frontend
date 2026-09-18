import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSearchSidebarComponent } from './item-search-sidebar';

describe('BodySidebar', () => {
	let component: ItemSearchSidebarComponent;
	let fixture: ComponentFixture<ItemSearchSidebarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ItemSearchSidebarComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ItemSearchSidebarComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
