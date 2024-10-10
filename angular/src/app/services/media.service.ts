import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Media } from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}

  getMediaItems(): Observable<Media[]> {
    return this.http.get<any[]>(`${this.apiUrl}/media`);
  }

  addMediaItem(mediaItem: Media): Observable<Media> {
    return this.http.post<any>(`${this.apiUrl}/media`, mediaItem);
  }

  deleteMediaItem(id: number): Observable<void> {
    return this.http.delete<any>(`${this.apiUrl}/media/${id}`);
  }

  updateMedia(id: number, media: Media): Observable<Media> {
    return this.http.put<any>(`${this.apiUrl}/media/${id}`, media);
  }
}
