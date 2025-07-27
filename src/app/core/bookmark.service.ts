import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bookmark } from '../models/bookmark.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  private apiUrl = 'http://localhost:3000/bookmarks'; 

  constructor(private http: HttpClient) {}

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.apiUrl);
  }

  getBookmark(id: string): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${this.apiUrl}/${id}`);
  }

  addBookmark(bookmark: Partial<Bookmark>): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.apiUrl, bookmark);
  }

  updateBookmark(id: string, bookmark: Bookmark): Observable<Bookmark> {
    return this.http.put<Bookmark>(`${this.apiUrl}/${id}`, bookmark);
  }
}
