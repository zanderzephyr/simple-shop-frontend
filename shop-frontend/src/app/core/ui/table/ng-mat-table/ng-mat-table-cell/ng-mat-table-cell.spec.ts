import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMatTableCellComponent } from './ng-mat-table-cell';

describe('NgMatTableCell', () => {
  let component: NgMatTableCellComponent;
  let fixture: ComponentFixture<NgMatTableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgMatTableCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgMatTableCellComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
