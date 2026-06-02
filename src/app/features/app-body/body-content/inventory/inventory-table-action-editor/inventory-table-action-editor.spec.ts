import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTableActionEditorComponent } from './inventory-table-action-editor';

describe('InventoryTableActionEditor', () => {
  let component: InventoryTableActionEditorComponent;
  let fixture: ComponentFixture<InventoryTableActionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryTableActionEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryTableActionEditorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
