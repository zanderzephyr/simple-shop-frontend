import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableActionRenderer } from './user-management-table-action-renderer';

describe('UserTableActionRenderer', () => {
	let component: UserTableActionRenderer;
	let fixture: ComponentFixture<UserTableActionRenderer>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UserTableActionRenderer]
		}).compileComponents();

		fixture = TestBed.createComponent(UserTableActionRenderer);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
