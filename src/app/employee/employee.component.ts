import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hinv-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  empName: string = "Daniel";

  constructor() { }

  ngOnInit(): void {
  }

}
