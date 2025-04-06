import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./category-list/category-list.component').then(
        (m) => m.CategoryListComponent
      ),
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./category-form/category-form.component').then(
        (m) => m.CategoryFormComponent
      ),
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./category-detail/category-detail.component').then(
        (m) => m.CategoryDetailComponent
      ),
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./category-form/category-form.component').then(
        (m) => m.CategoryFormComponent
      ),
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
];
