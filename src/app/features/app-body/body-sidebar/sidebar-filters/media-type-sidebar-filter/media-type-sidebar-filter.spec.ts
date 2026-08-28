import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTypeSidebarFilterComponent } from './media-type-sidebar-filter';

describe('MediaTypeSidebarFilter', () => {
	let component: MediaTypeSidebarFilterComponent;
	let fixture: ComponentFixture<MediaTypeSidebarFilterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MediaTypeSidebarFilterComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(MediaTypeSidebarFilterComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
