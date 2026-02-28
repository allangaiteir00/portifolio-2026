import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import '../../../../../setup-vitest';
import { GithubRepository } from '../models/github.model';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  const mockRepos: Partial<GithubRepository>[] = [
    { id: 1, name: 'repo1', fork: false, description: 'desc1' },
    { id: 2, name: 'repo2', fork: true, description: 'desc2' },
    { id: 3, name: 'repo3', fork: false, description: '' },
    { id: 4, name: 'repo4', fork: false, description: null },
    { id: 5, name: 'repo5', fork: false, description: 'desc5' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load repositories and filter forks and empty descriptions', () => {
    service.loadRepositories();
    expect(service.loading()).toBe(true);

    const req = httpMock.expectOne((req) => req.url.includes('/repos') && req.url.includes('per_page=12'));
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);

    expect(service.loading()).toBe(false);
    expect(service.repositories().length).toBe(2);
    expect(service.repositories().every((r) => !r.fork && !!r.description)).toBe(true);
  });

  it('should handle error when loading fails', () => {
    service.loadRepositories();

    const req = httpMock.expectOne((req) => req.url.includes('/repos'));
    req.error(new ProgressEvent('error'), { status: 404, statusText: 'Not Found' });

    expect(service.loading()).toBe(false);
    expect(service.error()).toBeTruthy();
    expect(service.repositories().length).toBe(0);
  });
});
