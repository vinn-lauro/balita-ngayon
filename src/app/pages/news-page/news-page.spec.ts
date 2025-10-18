import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { NewsPage } from './news-page';
import { ApiService } from '../../services/api.service';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MOCK_NEWS } from '../../testing/MOCK_NEWS';

describe('NewsPage', () => {
  describe('initialization', () => {
    let component: NewsPage;
    let fixture: ComponentFixture<NewsPage>;
    let apiService: ApiService;
    let componentApiService: ApiService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NewsPage],
        providers: [ApiService, provideHttpClient()],
      }).compileComponents();

      fixture = TestBed.createComponent(NewsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();

      apiService = fixture.debugElement.injector.get(ApiService);
      componentApiService = apiService;
      apiService = TestBed.inject(ApiService);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it("should inject the component's ApiService instance", inject(
      [ApiService],
      (service: ApiService) => {
        expect(service).toBe(componentApiService);
      }
    ));

    it('TestBed and Component UserService should be the same', () => {
      expect(apiService).toBe(componentApiService);
    });

    it('should initialize news Observable in ngOnInit', async () => {
      await fixture.isStable();
      expect(component.new$).toBeDefined();
    });
  });

  describe('testing with spy', () => {
    let component: NewsPage;
    let fixture: ComponentFixture<NewsPage>;
    let getNewsSpy: jasmine.Spy;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ApiService, provideHttpClient()],
      });
      const apiService = TestBed.inject(ApiService);
      getNewsSpy = spyOn(apiService, 'getNews').and.returnValue(of(MOCK_NEWS));

      fixture = TestBed.createComponent(NewsPage);
      fixture.autoDetectChanges();
      component = fixture.componentInstance;
    });

    it('should show news after component initialized', async () => {
      await fixture.whenStable();
      expect(getNewsSpy.calls.any()).withContext('onGetNews called').toBe(true);
    });
  });
});
