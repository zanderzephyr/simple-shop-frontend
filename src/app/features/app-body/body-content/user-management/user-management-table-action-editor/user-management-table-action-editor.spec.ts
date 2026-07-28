import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableActionEditor } from './user-management-table-action-editor';

describe('UserTableActionEditor', () => {
  let component: UserTableActionEditor;
  let fixture: ComponentFixture<UserTableActionEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTableActionEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableActionEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
