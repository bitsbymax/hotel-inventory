import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../interfaces/room.interface';
import { APP_SERVICE_CONFIG } from '../config/config.service';
import { AppConfigInterface } from '../config/config.interface';
import { HttpClient } from '@angular/common/http';

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
}
