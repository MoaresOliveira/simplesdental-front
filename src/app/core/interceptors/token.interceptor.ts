import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('token');
  if (token) {
    const clone = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    })
    return next(clone);
  }
  return next(req);
}
