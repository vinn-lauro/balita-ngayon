import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public setItem(key: string, value: any): void {
    if (this.isBrowser) {
      try {
        const valueToStore = JSON.stringify(value);
        localStorage.setItem(key, valueToStore);
      } catch (e: unknown) {
        console.error('Error saving to local storage', e);
      }
    }
  }

  public getItem<T>(key: string): T | null {
    if (this.isBrowser) {
      const item = localStorage.getItem(key);
      if (!item) {
        return null;
      }
      try {
        return JSON.parse(item) as T;
      } catch (e: unknown) {
        return item as unknown as T;
      }
    }
    return null;
  }

  public removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  public clear(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }
}
