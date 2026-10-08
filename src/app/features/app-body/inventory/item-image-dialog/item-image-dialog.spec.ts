import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemImageDialogComponent } from './item-image-dialog';

describe('ItemImageDialog', () => {
	let component: ItemImageDialogComponent;
	let fixture: ComponentFixture<ItemImageDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ItemImageDialogComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ItemImageDialogComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
