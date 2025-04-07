import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');
  const authReq = token ? req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    }) : req;
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.log(error)
        authService.authChanged.subscribe((user) => {
          if (!user) {
            router.navigate(['/login']);
          }
        })
        authService.logout();
      }
      return throwError(() => error)
    })
  );
}
