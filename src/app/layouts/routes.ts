
import { Route } from '@angular/router';
import { LayoutsComponent } from './layouts.component';



export default [
  {
    path: '',
    component: LayoutsComponent,
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
] satisfies Route[];
