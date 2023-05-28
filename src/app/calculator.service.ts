import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  add = (a: number, b: number) => a + b;

  subtract = (a: number, b: number) => a - b;

  multiply = (a: number, b: number) => a * b;
}
