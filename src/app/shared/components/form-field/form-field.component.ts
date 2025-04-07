import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatHint, MatInputModule } from '@angular/material/input';

type InputType = 'text' | 'password' | 'number' | 'email' | 'textarea';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ]
})
export class FormFieldComponent implements ControlValueAccessor, OnInit {
  @Input({required: true}) label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() textarea = false;
  @Input() rows = 3;
  @Input() maxlength: number | null = null;
  @Input() min: number | null = null;
  @Input() readonly = false;
  @Input() required = false;

  value = '';
  disabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor() {}

  ngOnInit(): void {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: any): void {
    const value = event.target.value;
    this.value = value;
    this.onChange(value);
  }
}
