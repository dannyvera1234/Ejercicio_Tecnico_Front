import { Component, inject, Input } from '@angular/core';
import { PRODUCT_INITIAL_STATE } from '../../../../store';

@Component({
  selector: 'app-delete-product',
  imports: [],
  templateUrl: './delete-product.component.html',
})
export class DeleteProductComponent {
  @Input({required: true}) titleProduct!: string;
  public readonly productStore = inject(PRODUCT_INITIAL_STATE);
}
