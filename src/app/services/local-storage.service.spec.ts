import { inject, TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { MOCK_LOCAL_STORAGE } from '../testing/MOCK_LOCAL_STORAGE';
import { MOCK_NEWS } from '../testing/MOCK_NEWS';

describe('LocalStorageService', () => {
  describe('initialization', () => {
    let service: LocalStorageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: PLATFORM_ID,
            useValue: 'browser',
          },
        ],
      });
      service = TestBed.inject(LocalStorageService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should correctly identify the platform as browser', inject(
      [PLATFORM_ID],
      (platformId: Object) => {
        expect(isPlatformBrowser(platformId)).toBe(true);
        expect(isPlatformServer(platformId)).toBe(false);
      }
    ));
  });

  describe('test with mock data', () => {
    let localStorageMock = MOCK_LOCAL_STORAGE;
    let localStorageService: LocalStorageService;
    let setItemSpy: jasmine.Spy;
    let getItemSpy: jasmine.Spy;

    beforeEach(() => {
      TestBed.configureTestingModule({});
      localStorageService = TestBed.inject(LocalStorageService);
      setItemSpy = spyOn(localStorageService, 'setItem').and.callFake(localStorageMock.setItem);
      getItemSpy = spyOn(localStorageService, 'getItem').and.callFake(localStorageMock.getItem);
      localStorageMock.clear();
    });

    it('should call localStorage.setItem when saving data', () => {
      const news = MOCK_NEWS;

      localStorageService.setItem('news', news);

      expect(setItemSpy).toHaveBeenCalledTimes(1);
      expect(setItemSpy).toHaveBeenCalledWith('news', MOCK_NEWS);
    });

    it('should call localStorage.getItem and return stored data', () => {
      const expectedNews = MOCK_NEWS;

      localStorageMock.setItem('news', expectedNews);
      const result = localStorageService.getItem('news');

      expect(getItemSpy).toHaveBeenCalledTimes(1);
      expect(getItemSpy).toHaveBeenCalledWith('news');
      expect(result).toEqual(expectedNews);
    });

    it('should remove data from local storage', () => {
      const key = 'news';
      const expectedNews = MOCK_NEWS;

      localStorageMock.setItem(key, expectedNews);
      localStorageMock.removeItem(key);

      expect(localStorageMock.getItem(key)).toBeNull();
    });

    it('should clear data from local storage', () => {
      const key = 'news';
      const expectedNews = MOCK_NEWS;

      localStorageMock.setItem(key, expectedNews);
      localStorageMock.clear();

      expect(localStorageMock.getItem(key)).toBeNull();
    });
  });
});
