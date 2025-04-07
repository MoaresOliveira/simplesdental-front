import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api/v1/users';

  constructor(private http: HttpClient) {}

  updatePassword(password: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/password`, { password });
  }

  getAllUsers(page: number, size: number): Observable<Page<User>> {
    return this.http.get<Page<User>>(`${this.apiUrl}`, {
      params: { page, size },
    });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
