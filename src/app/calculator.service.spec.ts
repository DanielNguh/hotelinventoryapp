import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add 2 numbers', () => {
    expect(service.add(2, 2)).toBe(4);
  });

  it('should subtract 2 numbers', () => {
    expect(service.subtract(2, 2)).toBe(0);
  });

  it('should multiply 2 numbers', () => {
    expect(service.multiply(2, 2)).toBe(4);
  });
});
