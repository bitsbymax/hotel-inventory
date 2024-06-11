import { Component, Self } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  providers: [RoomsService],
})
export class EmployeeComponent {
  empName: string = 'John Doe';

  constructor(@Self() private roomsService: RoomsService) {
    console.log('constructor in EmployeeComponent fired');
  }

  get employeeName(): string {
    return this.empName;
  }
}
