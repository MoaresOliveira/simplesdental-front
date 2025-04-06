import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./product-form/product-form.component').then(
        (m) => m.ProductFormComponent
      ),
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./product-form/product-form.component').then(
        (m) => m.ProductFormComponent
      ),
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
];
