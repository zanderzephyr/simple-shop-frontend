import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDialogContentComponent } from './general-dialog-content';

describe('GeneralDialog', () => {
  let component: GeneralDialogContentComponent;
  let fixture: ComponentFixture<GeneralDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralDialogContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralDialogContentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
