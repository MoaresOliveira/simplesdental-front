import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/v1/auth';
  private user!: User;
  authChanged: EventEmitter<User> = new EventEmitter<User>();

  constructor(private http: HttpClient) { }


  getAuthContext(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/context`).pipe(
      map(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.user = res;
        this.authChanged.emit(this.user);
        return res;
      })
    );
  }

  getUser(): User {
    const userStorage = localStorage.getItem('user');
    if (!this.user && userStorage) {
      this.user = JSON.parse(userStorage);
    }
    return this.user;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user = {} as User;
    this.authChanged.emit(this.user);
  }

  isAdmin(): boolean {
    const user = this.getUser()
    return user.role == 'ADMIN' || false;
  }

  registerUser(user: User): Observable<User> {
    if (!user.role) {
      user.role = 'USER';
    }
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  login(request: {email: string, password: string}): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, request).pipe(map(res => {
      localStorage.setItem('token', res.token);
      return res;
    }))
  }
}
