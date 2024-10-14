import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Media } from '../models/media.model';
import { PagedResponse } from '../models/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = 'http://localhost:8080/api/media';

  constructor(private http: HttpClient) {}

  getMediaItemsByUsername(username: string, page: number, size: number): Observable<PagedResponse<Media>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PagedResponse<Media>>(`${this.apiUrl}/user/${username}`, { params });
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
