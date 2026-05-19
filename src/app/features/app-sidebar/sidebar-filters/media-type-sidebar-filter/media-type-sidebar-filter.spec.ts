import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTypeSidebarFilter } from './media-type-sidebar-filter';

describe('MediaTypeSidebarFilter', () => {
  let component: MediaTypeSidebarFilter;
  let fixture: ComponentFixture<MediaTypeSidebarFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaTypeSidebarFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaTypeSidebarFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
