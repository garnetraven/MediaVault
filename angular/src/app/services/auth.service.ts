import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { AuthStateService } from './authstate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authStateService: AuthStateService) { }

  login(username: string, password: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password }, 
      { headers: headers, responseType: 'text' }).pipe(
        tap(() => this.authStateService.setCurrentUser(username))
      );
  }

  logout() {
    this.authStateService.clearCurrentUser();
  }

  register(username: string, password: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/auth/register`, { username, password },
      { headers: headers, responseType: 'text' });
  }

  getCurrentUser(): Observable<User> {
    const username = this.authStateService.currentUserValue;
    if (!username) {
      throw new Error('No authenticated user');
    }
    return this.http.get<User>(`${this.apiUrl}/user/profile/${username}`);
  }

  updateUserProfile(username: string, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/user/profile/${username}`, updatedUser);
  }

  updatePassword(username: string, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/change-password/${username}`, { currentPassword, newPassword });
  }
}
