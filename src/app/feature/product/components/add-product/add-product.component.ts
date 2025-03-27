import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../../../../components';
import { PRODUCT_INITIAL_STATE } from '../../../../store';
import { FormServiceService } from '../formService.service';
@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './add-product.component.html',
})
export class AddProductComponent {
  public productStore = inject(PRODUCT_INITIAL_STATE);
  public formService = inject(FormServiceService);



}
