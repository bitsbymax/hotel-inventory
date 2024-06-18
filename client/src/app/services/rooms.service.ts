import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../interfaces/room.interface';
import { APP_SERVICE_CONFIG } from '../config/config.service';
import { AppConfigInterface } from '../config/config.interface';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Photo } from '../interfaces/photo.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  rooms: RoomList[] = [];

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfigInterface,
    private http: HttpClient
  ) {
    console.log('RoomsService initialized');
  }

  getRooms() {
    console.log('getRooms called');
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/photos',
      {
        reportProgress: true,
      }
    );
    return this.http.request<Photo[]>(request);
  }
}
