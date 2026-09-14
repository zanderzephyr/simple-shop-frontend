import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsComponent } from './item-details';

describe('ItemDetails', () => {
	let component: ItemDetailsComponent;
	let fixture: ComponentFixture<ItemDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ItemDetailsComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ItemDetailsComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
