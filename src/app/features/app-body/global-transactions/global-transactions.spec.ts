import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTransactionsComponent } from './global-transactions';

describe('GlobalTransactions', () => {
	let component: GlobalTransactionsComponent;
	let fixture: ComponentFixture<GlobalTransactionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [GlobalTransactionsComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(GlobalTransactionsComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
