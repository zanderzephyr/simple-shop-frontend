import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSidebarFilters } from './app-sidebar-filters';

describe('AppSidebarFilters', () => {
  let component: AppSidebarFilters;
  let fixture: ComponentFixture<AppSidebarFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSidebarFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSidebarFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
