import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTableActionRendererComponent } from './inventory-table-action-renderer';

describe('InventoryTableActionRenderer', () => {
	let component: InventoryTableActionRendererComponent;
	let fixture: ComponentFixture<InventoryTableActionRendererComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [InventoryTableActionRendererComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(InventoryTableActionRendererComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
