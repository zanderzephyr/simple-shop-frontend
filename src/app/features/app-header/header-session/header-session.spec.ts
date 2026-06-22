import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSessionComponent } from './header-session';

describe('HeaderSession', () => {
  let component: HeaderSessionComponent;
  let fixture: ComponentFixture<HeaderSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSessionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderSessionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
