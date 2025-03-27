
import { Route } from '@angular/router';
import { ProductComponent } from './product.component';

export default [
  {
    path: '',
    component: ProductComponent,
  },
  {
    path: ':id',
    loadComponent: () => import('./components/update-product/update-product.component').then((m) => m.UpdateProductComponent)

  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
] satisfies Route[];
