import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDialogComponent } from './general-dialog';

describe('GeneralDialog', () => {
  let component: GeneralDialogComponent;
  let fixture: ComponentFixture<GeneralDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
