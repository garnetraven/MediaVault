import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getMediaItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/media`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  addMediaItem(mediaItem: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/media`, mediaItem);
  }

}
