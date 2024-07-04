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
  AfterContentInit,
  AfterContentChecked,
  OnDestroy,
} from '@angular/core';
import { RoomList } from '../../interfaces/room.interface';
import { MatTableModule } from "@angular/material/table";

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent
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
  @Input() rooms: RoomList[] | null = [];
  @Input() title: string = '';
  @Output() selectedRoom = new EventEmitter<RoomList>();

  dataSource = this.rooms;
  constructor() {
    console.log('constructor in RoomsListComponent fired');
  }

  ngOnInit(): void {
    console.log('ngOnInit in RoomsListComponent fired');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges in RoomsListComponent fired');
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

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit in RoomsListComponent fired');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked in RoomsListComponent fired');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy in RoomsListComponent fired');
  }
  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }
}
