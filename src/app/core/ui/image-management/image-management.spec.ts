import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageManagementComponent } from './image-management';

describe('ImageManagement', () => {
	let component: ImageManagementComponent;
	let fixture: ComponentFixture<ImageManagementComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ImageManagementComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ImageManagementComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
