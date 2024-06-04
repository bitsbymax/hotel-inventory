import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { RoomList } from '../../interfaces/room.interface';

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked {
  @Input() rooms: RoomList[] = [];
  @Input() title: string = '';
  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() {
    console.log('constructor in RoomsListComponent fired');
  }

  ngOnInit(): void {
    console.log('ngOnInit in RoomsListComponent fired');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges in RoomsListComponent', changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }

    if (changes['rooms']) {
      this.rooms = changes['rooms'].currentValue;
    }
  }

  ngDoCheck(): void {
    console.log('ngDoCheck in RoomsListComponent fired');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit in RoomsListComponent fired');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked in RoomsListComponent fired');
  }

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }
}
