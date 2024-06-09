import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DoCheck,
  ElementRef,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
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
  implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked, AfterContentInit
{
  @ViewChild(HeaderComponent, { static: true }) header!: HeaderComponent;
  @ViewChild('bookRoom', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild('description', { static: true }) description!: ElementRef;
  @ViewChildren(HeaderComponent) headerChildren!: QueryList<HeaderComponent>;

  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  hotelName: string = 'Urban Hotel';
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

  constructor(private cdr: ChangeDetectorRef) {
    console.log('constructor in RoomsComponent fired');
  }

  ngOnInit(): void {
    console.log('ngOnInit in RoomsComponent fired');
    this.roomList = [
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
    this.header.title = 'Hotel inventory'; // - ми можемо змінити значення властивості title компонента HeaderComponent з середини RoomsComponent в ngOnInit лише якщо вказано { static: true }.
    this.description.nativeElement.innerText = 'Our goal is to provide best service';
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
    this.empName = this.employee.employeeName;;
  }
  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: 5,
      roomType: 'Common Room',
      amenities: 'Air Conditioner, TV, Wifi,',
      price: 320,
      photos: 'https://picsum.photos/200/300',
      checkInTime: new Date('2024-01-01'),
      checkOutTime: new Date('2024-01-01'),
      rating: 3,
    };

    this.roomList = [...this.roomList, room];
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }
}
