import { Component, Inject, OnInit, Optional } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoomsComponent } from './components/rooms/rooms.component';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoggerService } from './services/logger.service';
import { LocalStorageToken } from './local-storage.token';
import { InitService } from './services/init.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RoomsComponent, CommonModule, EmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  hotelName: string = 'Urban Hotel';
  role: string = 'Admin';

  totalCustomers = 10;
  ctx = { count: this.totalCustomers };

  data = {
    screen: true,
    label: 'Mobile',
  };

  config: any;

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private initService: InitService
  ) {}

  ngOnInit(): void {
    this.loggerService?.log('ngOnInit in AppComponent fired');
    this.localStorage.setItem('name', 'Urban Hotel');
    this.config = this.initService.config;
  }
}
