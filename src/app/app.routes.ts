import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products/product.routes').then((m) => m.routes),
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./pages/categories/category.routes').then((m) => m.routes),
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/user.routes').then((m) => m.routes),
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
  },
  { path: '**', redirectTo: '' },
];
