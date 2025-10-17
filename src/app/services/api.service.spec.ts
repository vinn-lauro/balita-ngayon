import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { MOCK_NEWS } from '../testing/MOCK_NEWS';
import { HttpClient, HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { asyncData } from '../testing/helper/asyncData';
import { throwError } from 'rxjs';

describe('ApiService', () => {
  describe('initialization', () => {
    let service: ApiService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideHttpClient()],
      });
      service = TestBed.inject(ApiService);
    });

    it('should be created', () => {
      expect(service).toBeDefined();
    });
  });

  describe('HttpClient (with spies)', () => {
    let apiService: ApiService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ApiService, provideHttpClient()],
      });

      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      apiService = new ApiService(httpClientSpy);
    });

    it('should return expected news (HttpClient called once)', (done: DoneFn) => {
      const expectedNews = MOCK_NEWS;

      httpClientSpy.get.and.returnValue(asyncData(expectedNews));

      apiService.getNews().subscribe({
        next: (news) => {
          expect(news).withContext('expected news').toEqual(expectedNews);
          done();
        },
        error: done.fail,
      });
      expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
    });

    it('should return an error when server returns a 404', (done: DoneFn) => {
      const errorResponse = new HttpErrorResponse({
        error: {
          error: {
            code: '404_not_found',
            message: '404 not found',
          },
        },
      });

      httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

      apiService.getNews().subscribe({
        next: (news) => done.fail('expected an error, not news'),
        error: (error) => {
          expect(error.code).toContain('404_not_found');
          done();
        },
      });
    });
  });
});
