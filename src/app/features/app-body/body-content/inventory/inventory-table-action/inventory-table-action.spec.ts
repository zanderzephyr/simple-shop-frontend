import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTableActionComponent } from './inventory-table-action';

describe('InventoryTableActionComponent', () => {
  let component: InventoryTableActionComponent;
  let fixture: ComponentFixture<InventoryTableActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryTableActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryTableActionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
