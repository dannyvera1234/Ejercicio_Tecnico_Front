import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
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
export class UpdateProductComponent implements OnInit, OnDestroy {
  @Input({ required: true }) id!: string
  public productStore = inject(PRODUCT_INITIAL_STATE);
  public formService = inject(FormServiceService);

  ngOnInit(): void {
    const product = history.state.product;
    if (!product) return
    this.formService.addProductForm.patchValue(product);
    this.formService.addProductForm.get('id')?.disable();
  }


  ngOnDestroy(): void {
    // Limpiar o resetear el formulario cuando se destruye el componente
    this.formService.addProductForm.reset();
    this.formService.addProductForm.get('id')?.enable();
  }

  resetForm(): void {
    const currentId = this.formService.addProductForm.get('id')?.value;
    this.formService.addProductForm.reset();
    this.formService.addProductForm.get('id')?.setValue(currentId);
  }

}


