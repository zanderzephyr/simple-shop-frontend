import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCompanyLogo } from './header-company-logo';

describe('HeaderCompanyLogo', () => {
  let component: HeaderCompanyLogo;
  let fixture: ComponentFixture<HeaderCompanyLogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCompanyLogo],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderCompanyLogo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
