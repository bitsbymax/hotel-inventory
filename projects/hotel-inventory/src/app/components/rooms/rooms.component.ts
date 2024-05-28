import { Component } from '@angular/core';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  hotelName: string = 'Hilton';
  numberOfRooms: number = 10;
  hideRooms: boolean = false;

  toggle() {
    this.hideRooms = !this.hideRooms;
  }
}
