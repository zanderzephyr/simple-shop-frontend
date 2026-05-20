import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSession } from './header-session';

describe('HeaderSession', () => {
  let component: HeaderSession;
  let fixture: ComponentFixture<HeaderSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSession],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderSession);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
