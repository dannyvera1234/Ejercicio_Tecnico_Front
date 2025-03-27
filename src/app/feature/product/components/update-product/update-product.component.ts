import { Component, inject, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CustomInputComponent } from '../../../../components';
import { PRODUCT_INITIAL_STATE } from '../../../../store';
import { RouterLink } from '@angular/router';
import { FormServiceService } from '../formService.service';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule, CustomInputComponent, RouterLink],
  templateUrl: './update-product.component.html',
})
export class UpdateProductComponent {
  @Input({required: true}) id!: string
  public productStore = inject(PRODUCT_INITIAL_STATE);
  public formService = inject(FormServiceService);
  constructor() {
    const product = history.state.product;
    if (!product) return;
    this.formService.addProductForm.patchValue(product);
    this.formService.addProductForm.get('id')?.disable();
  }

    resetForm(): void {
      const currentId =  this.formService.addProductForm.get('id')?.value;
      this.formService.addProductForm.reset();
      this.formService.addProductForm.get('id')?.setValue(currentId);
    }

}


