import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { CategoryFormComponent } from './components/categories/category-form/category-form.component';
import { CategoryDetailComponent } from './components/categories/category-detail/category-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './core/guards/auth.guard';
import { UserListComponent } from './pages/user-list/user-list.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'products/new',
    component: ProductFormComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'products/:id/edit',
    component: ProductFormComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'categories',
    component: CategoryListComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'categories/new',
    component: CategoryFormComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'categories/:id',
    component: CategoryDetailComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'categories/:id/edit',
    component: CategoryFormComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'users',
    component: UserListComponent,
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
