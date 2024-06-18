import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  SkipSelf,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { Room, RoomList } from '../../interfaces/room.interface';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from '../rooms-list/rooms-list.component';
import { HeaderComponent } from '../header/header.component';
import { BookButtonComponent } from '../book-button/book-button.component';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../../services/rooms.service';
import { Observable } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    CommonModule,
    RoomsListComponent,
    HeaderComponent,
    BookButtonComponent,
    EmployeeComponent,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterViewInit,
    AfterViewChecked,
    AfterContentInit,
    AfterContentChecked,
    OnDestroy
{
  @Input('hotelName') hotelName: string = '';

  @ViewChild(HeaderComponent, { static: true }) header!: HeaderComponent;
  @ViewChild('bookRoom', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild('description', { static: true }) description!: ElementRef;
  @ViewChildren(HeaderComponent) headerChildren!: QueryList<HeaderComponent>;

  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  numberOfRooms: number = 10;
  hideRooms: boolean = false;
  rooms: Room = {
    totalRooms: 10,
    availableRooms: 8,
    bookedRooms: 0,
  };
  roomList: RoomList[] = [];
  selectedRoom = {} as RoomList;
  title = 'Room List';
  empName: string = '';

  objectKeys = Object.keys;

  observable = new Observable<number>((observer) => {
    observer.next(1);
    observer.error('Error');
    observer.complete();
  });

  constructor(
    private cdr: ChangeDetectorRef,
    @SkipSelf() private roomsService: RoomsService
  ) {
    console.log('constructor in RoomsComponent fired');
  }

  ngOnInit(): void {
    console.log('ngOnInit in RoomsComponent fired');
    this.roomsService.getRooms().subscribe((rooms) => {
      this.roomList = rooms;
    });
    this.header.title = 'Hotel inventory'; // - ми можемо змінити значення властивості title компонента HeaderComponent з середини RoomsComponent в ngOnInit лише якщо вказано { static: true }.
    this.description.nativeElement.innerText =
      'Our goal is to provide best service';
    //observables
    this.observable.subscribe({
      next: (value) => console.log(value),
      error: (error) => console.log(error),
      complete: () => console.log('Completed'),
    });

    this.observable.subscribe((data) => console.log(data));
    //
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Response header has been received');
          break;
        }
        case HttpEventType.DownloadProgress: {
          console.log(`Download in progress: ${event.loaded}`);
          break;
        }
        case HttpEventType.Response: {
          console.log(`Download completed: ${event.body}`);
          break;
        }
        case HttpEventType.Response: {
          console.log(`Download completed: ${event.body}`);
          break;
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges in RoomsComponent fired', changes);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck in RoomsComponent fired');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit in RoomsComponent fired');
    // console.log(this.header);
    // this.header.title = 'Hotel inventory';// - тут це значення зміниться лише на наступному циклі change детектора
    const componentRef = this.vcr.createComponent(BookButtonComponent);
    componentRef.instance.buttonLabel = 'Book new room';
    this.headerChildren.last.title = 'Updating every day';
    this.cdr.detectChanges();
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked in RoomsComponent fired');
    // console.log(this.header);
    // this.header.title = 'Hotel inventory'; //- тут це значення зміниться лише на наступному циклі change детектора
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit in RoomsComponent fired');
    this.employee.empName = 'Rick';
    this.empName = this.employee.employeeName;
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked in RoomsComponent fired');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy in RoomsComponent fired');
  }
  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: '5',
      roomType: 'Common Room',
      amenities: 'Air Conditioner, TV, Wifi,',
      price: 320,
      photos: 'https://picsum.photos/200/300',
      checkInTime: new Date('2024-01-01'),
      checkOutTime: new Date('2024-01-01'),
      rating: 3,
    };

    // this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((updatedRooms) => {
      this.roomList = updatedRooms;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '1',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 1500,
      photos:
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      checkInTime: new Date('2024-01-01'),
      checkOutTime: new Date('2024-01-01'),
      rating: 4.8,
    };
    this.roomsService.editRoom(room).subscribe((updatedRooms) => {
      this.roomList = updatedRooms;
    });
  }

  deleteRoom() {
    this.roomsService.deleteRoom('2').subscribe((updatedRooms) => {
      this.roomList = updatedRooms;
    });
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }
}
