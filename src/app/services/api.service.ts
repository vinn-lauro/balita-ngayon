import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl: string = environment.api.url;
  private readonly apiKey: string = environment.api.key;

  constructor(private readonly http: HttpClient) {}

  public getNews(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?access_key=${this.apiKey}`);
  }
}
