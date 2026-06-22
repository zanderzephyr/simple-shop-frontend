import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTransactionsComponent } from './user-transactions';

describe('Transactions', () => {
  let component: UserTransactionsComponent;
  let fixture: ComponentFixture<UserTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTransactionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTransactionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
