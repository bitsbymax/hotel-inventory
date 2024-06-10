import { Injectable } from '@angular/core';
import { RoomList } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  rooms: RoomList[] = [
    {
      roomNumber: 1,
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, TV, Wifi,',
      price: 1000,
      photos: 'https://picsum.photos/200/300',
      checkInTime: new Date('2024-01-01'),
      checkOutTime: new Date('2024-01-01'),
      rating: 4.8,
    },
    {
      roomNumber: 2,
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, TV, Wifi,',
      price: 500,
      photos: 'https://picsum.photos/200/300',
      checkInTime: new Date('2024-01-01'),
      checkOutTime: new Date('2024-01-01'),
      rating: 4.757,
    },
    {
      roomNumber: 3,
      roomType: 'Private Room',
      amenities: 'Air Conditioner, TV, Wifi,',
      price: 300,
      photos: 'https://picsum.photos/200/300',
      checkInTime: new Date('2024-01-01'),
      checkOutTime: new Date('2024-01-01'),
      rating: 4,
    },
    {
      roomNumber: 4,
      roomType: 'Common Room',
      amenities: 'Air Conditioner, TV, Wifi,',
      price: 100,
      photos: 'https://picsum.photos/200/300',
      checkInTime: new Date('2024-01-01'),
      checkOutTime: new Date('2024-01-01'),
      rating: 3,
    },
  ];

  constructor() {}

  getRooms() {
    return this.rooms;
  }
}
