import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSearchBarComponent } from './header-search-bar';

describe('HeaderSearchBar', () => {
	let component: HeaderSearchBarComponent;
	let fixture: ComponentFixture<HeaderSearchBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeaderSearchBarComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(HeaderSearchBarComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
