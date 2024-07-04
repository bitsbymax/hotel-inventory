import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoomsComponent } from './components/rooms/rooms.component';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoggerService } from './services/logger.service';
import { LocalStorageToken } from './local-storage.token';
import { InitService } from './services/init.service';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReusableFormGroupComponent } from './shared/reusable-form-group.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RoomsComponent,
    CommonModule,
    EmployeeComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    ReusableFormGroupComponent
  ],
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

  form: UntypedFormGroup;
  name: string = '';

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private initService: InitService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loggerService?.log('ngOnInit in AppComponent fired');
    this.localStorage.setItem('name', 'Urban Hotel');
    this.config = this.initService.config;

    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
    });

    this.cdr.detectChanges();
  }

  public save(): void {
    console.log(this.form.controls);
  }
}
