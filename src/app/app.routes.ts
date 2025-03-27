import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
  },

  {
    path: '',
    loadComponent() {
      return import('./layouts/layouts.component').then((m) => m.LayoutsComponent);
    },
    children: [
      {
        path: 'product',
        loadChildren: () => import('./feature/product/routes')
      }
    ]
  }
];
