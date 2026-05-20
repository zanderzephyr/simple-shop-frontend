import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyContent } from './body-content';

describe('BodyContent', () => {
  let component: BodyContent;
  let fixture: ComponentFixture<BodyContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyContent],
    }).compileComponents();

    fixture = TestBed.createComponent(BodyContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
