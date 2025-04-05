import { CanActivateFn, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const userStorage = localStorage.getItem('user');
  const rolesEnabled = route.data['roles'];
  if(userStorage === null) {
    router.navigate(['/login']);
    return false;
  }
  const user: User = JSON.parse(userStorage);
  if (rolesEnabled.includes(user.role.toLowerCase())) {
    return true;
  }
  console.log('User does not have the required role to access this route', user.role, rolesEnabled)
  return false;
};
