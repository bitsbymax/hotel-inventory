import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-book-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-button.component.html',
  styleUrl: './book-button.component.scss'
})
export class BookButtonComponent {
  buttonLabel: string = 'Book a room';
}
