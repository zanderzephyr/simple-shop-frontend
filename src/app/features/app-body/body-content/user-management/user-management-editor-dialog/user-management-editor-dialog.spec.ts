import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditorDialog } from './user-management-editor-dialog';

describe('UserEditorDialog', () => {
  let component: UserEditorDialog;
  let fixture: ComponentFixture<UserEditorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditorDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(UserEditorDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
