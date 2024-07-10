import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../interfaces/room.interface';
import { APP_SERVICE_CONFIG } from '../config/config.service';
import { AppConfigInterface } from '../config/config.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Photo } from '../interfaces/photo.interface';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  shareReplay,
  throwError,
} from 'rxjs';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  rooms: RoomList[] = [];

  getRooms$!: Observable<RoomList[]>;
  //<<<<---------------------------------------------------->>
  getUsers$ = this.http
    .get<User[]>('https://jsonplaceholder.typicode.com/users')
    .pipe(
      map((users) =>
        users.map((user) => ({
          ...user,
          username: `${user.username}@${user.website}`,
        }))
      ),
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error(err));
      }),
      shareReplay(1)
    );

  private selectedUserSubject = new BehaviorSubject<number | null>(null); //створюємо Subject зі значенням null
  selectedUserAction$ = this.selectedUserSubject.asObservable(); //створюємо стрім, джерелом даних якого є наш Subject
  onSelectedUser(id: number) {
    this.selectedUserSubject.next(id); //додаємо в стрім нові дані
  }

  selectedUserData$: Observable<User> = combineLatest([
    this.getUsers$,
    this.selectedUserAction$,
  ]).pipe(
    map(([allUsers, selectedUser]) => {
      return allUsers.find((u) => u.id === selectedUser) as User;
    })
  );
  //<<<<---------------------------------------------------->>

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfigInterface,
    private http: HttpClient
  ) {
    console.log('RoomsService initialized');
    this.getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
      shareReplay(1) //цей оператор дає можливість закешувати результати запитів, тобто в разі якщо такий запит було зроблено в іншому компоненті, то буде повернуто збережені дані з кешу.
    );
  }

  getRooms() {
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
