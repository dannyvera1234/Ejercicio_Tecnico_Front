import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, input, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FormErrorMessageComponent } from './form-error-message.component';
import { InputErrorLocatorService } from '../../util';

@Component({
  selector: 'app-custom-input',
  imports: [NgClass, FormErrorMessageComponent],
  template: `<div [class]="groupClass">
    <div class="relative">
      <label [for]="id ?? control.name" class="absolute left-0 top-[-27px]  font-medium text-gray-700">
      {{ label }}
      </label>
      <input
        [id]="id ?? control.name"
        [name]="control.name"
        [type]="type"
        [min]="min"
        [accept]="accept"
        [placeholder]="placeholder"
        [ngClass]="[
      'peer w-full border rounded-md focus:ring outline-none text-gray-600 p-2',
      inputClass,
      control.invalid && control.touched ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
    ]"
        [readonly]="readonly"
        [autocomplete]="autocomplete"
        [value]="value"
        (input)="change($event)"
        (blur)="control.control?.markAsTouched()"
        [disabled]="this.control.control?.disabled ?? false"
      />
    </div>
    <app-form-error-message [control]="control.control!" />
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInputComponent implements ControlValueAccessor, OnInit {
  @Input() type: string = 'text';

  @Input() readonly = false;

  @Input() accept = '';

  @Input() label = '';

  @Input() placeholder = '';

  @Input() inputClass = '';

  @Input() groupClass = '';

  @Input() min = '';

  @Input() max = '';

  @Input() autocomplete = 'off';

  @Input() pattern: any;

  @Input() id: string | undefined;

  @Input() subLabel = '';

  public value: any;

  constructor(
    public control: NgControl,
    public readonly errorLocator: InputErrorLocatorService,
    public readonly _cd: ChangeDetectorRef,
  ) {
    this.control.valueAccessor = this;
  }

  touched = signal(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: any) => { };

  onTouched = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  ngOnInit(): void {
    const originalMarkAsTouched = this.control.control!.markAsTouched.bind(this.control.control);
    this.control.control!.markAsTouched = () => {
      originalMarkAsTouched();
      this.touched.set(true);
      this._cd.markForCheck();
    };
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
    this._cd.markForCheck();
  }

  public change(event: any) {
    this.control.control?.markAsTouched();
    this.value = event.target.value;
    this.onChange(event.target.value);
  }
}
