import {
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent
  implements OnInit, OnChanges, DoCheck, AfterViewInit
{
  title: string = '';

  constructor() {
    console.log('constructor in HeaderComponent fired');
  }

  ngOnInit(): void {
    console.log('ngOnInit in HeaderComponent fired');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges in HeaderComponent', changes);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck in HeaderComponent fired');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit in HeaderComponent fired');
  }
}
