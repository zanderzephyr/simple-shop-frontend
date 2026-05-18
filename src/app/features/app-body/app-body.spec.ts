import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBody } from './app-body';

describe('AppBody', () => {
  let component: AppBody;
  let fixture: ComponentFixture<AppBody>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBody],
    }).compileComponents();

    fixture = TestBed.createComponent(AppBody);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
