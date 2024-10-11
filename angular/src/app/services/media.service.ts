import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Media } from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = 'http://localhost:8080/api/media';

  constructor(private http: HttpClient) {}

  getMediaItemsByUsername(username: string): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/user/${username}`);
  }

  addMediaItem(username: string, mediaItem: Media): Observable<Media> {
    return this.http.post<Media>(`${this.apiUrl}/user/${username}`, mediaItem);
  }

  deleteMediaItem(id: number, username: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/user/${username}`);
  }

  updateMedia(id: number, username: string, media: Media): Observable<Media> {
    return this.http.put<Media>(`${this.apiUrl}/${id}/user/${username}`, media);
  }
}
