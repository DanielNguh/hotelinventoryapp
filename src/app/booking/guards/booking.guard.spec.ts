import { TestBed } from '@angular/core/testing';

import { BookingGuard } from './booking.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('BookingGuard', () => {
  let guard: BookingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
    });
    guard = TestBed.inject(BookingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
