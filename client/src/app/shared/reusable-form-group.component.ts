import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-reusable-form-group',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule],
  templateUrl: './reusable-form-group.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (): ControlContainer => inject(ControlContainer, {skipSelf: true})
    }
  ]
})
export class ReusableFormGroupComponent implements OnInit, OnDestroy {
  public parentContainer = inject(ControlContainer);

  public get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }
  @Input() public controlKey = '';
  constructor(private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.parentFormGroup.addControl(this.controlKey,
      new FormGroup({
        email: this.fb.control('', [Validators.email]),
        emailConfirm: this.fb.control('', [Validators.email]),
      }));
  }

  public ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlKey);
  }
}