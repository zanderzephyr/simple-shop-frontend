import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOverviewComponent } from './item-overview';

describe('ItemOverview', () => {
	let component: ItemOverviewComponent;
	let fixture: ComponentFixture<ItemOverviewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ItemOverviewComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ItemOverviewComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
