import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  empName: string = 'John Doe';

  constructor() {
    console.log('constructor in EmployeeComponent fired');
  }

  get employeeName(): string {
    return this.empName;
  }
}
