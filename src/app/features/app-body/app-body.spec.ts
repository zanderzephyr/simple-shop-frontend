import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBodyComponent } from './app-body';

describe('AppBody', () => {
  let component: AppBodyComponent;
  let fixture: ComponentFixture<AppBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBodyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppBodyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
