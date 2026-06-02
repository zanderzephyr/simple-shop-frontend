import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringEditorComponent } from './string-editor';

describe('StringEditor', () => {
  let component: StringEditorComponent;
  let fixture: ComponentFixture<StringEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StringEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StringEditorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
