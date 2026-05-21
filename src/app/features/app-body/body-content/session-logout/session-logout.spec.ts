import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLogoutComponent } from './session-logout';

describe('SessionLogout', () => {
  let component: SessionLogoutComponent;
  let fixture: ComponentFixture<SessionLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionLogoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionLogoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
