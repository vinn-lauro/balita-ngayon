import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NewsModel } from '../models/news.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl: string = environment.api.url;
  private readonly apiKey: string = environment.api.key;

  constructor(private readonly http: HttpClient) {}

  public getNews(): Observable<NewsModel> {
    return this.http.get<NewsModel>(`${this.apiUrl}?access_key=${this.apiKey}`).pipe(
      catchError((error) => {
        return throwError(() => error.error.error);
      })
    );
  }
}
