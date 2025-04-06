import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-field',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true
    }
  ]
})
export class SelectFieldComponent implements ControlValueAccessor, OnInit {
  @Input({required: true}) label = '';
  @Input() format: {label: string, value: string} = {label: 'name', value: 'id'};
  @Input() options: any[] = [];
  @Input() canBeEmpty = true;
  @Input() primitive = false;
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

  handleChange(event: MatSelectChange<any>): void {
    const value = event.value;
    this.value = value;
    this.onChange(value);
  }
}
