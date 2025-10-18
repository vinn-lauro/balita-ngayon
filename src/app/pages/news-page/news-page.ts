import { Component, inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsModel } from '../../models/news.model';
import { ApiService } from '../../services/api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-news-page',
  imports: [AsyncPipe],
  templateUrl: './news-page.html',
  styleUrl: './news-page.css',
})
export class NewsPage implements OnInit {
  private newsOb$: Observable<NewsModel | null>;
  private apiService = inject(ApiService);

  constructor() {
    this.newsOb$ = of(null);
  }

  public ngOnInit(): void {
    this.onGetNews();
  }

  public get new$(): Observable<NewsModel | null> {
    return this.newsOb$;
  }

  private onGetNews(): void {
    this.newsOb$ = this.apiService.getNews();
  }
}
