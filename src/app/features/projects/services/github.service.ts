import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GithubRepository, GithubServiceState } from '../models/github.model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'https://api.github.com/users/allangaiteir00';

  private readonly state: WritableSignal<GithubServiceState> = signal({
    repositories: [],
    loading: false,
    error: null,
  });

  readonly repositories = () => this.state().repositories;
  readonly loading = () => this.state().loading;
  readonly error = () => this.state().error;

  loadRepositories(): void {
    this.state.update((s) => ({ ...s, loading: true, error: null }));

    this.http
      .get<GithubRepository[]>(`${this.API_URL}/repos?sort=updated&per_page=12`)
      .pipe(
        map((repos) =>
          repos.filter((repo) => !repo.fork && repo.description && repo.description.trim() !== ''),
        ),
        tap((repos) => {
          this.state.update((s) => ({ ...s, repositories: repos.slice(0, 6), loading: false }));
        }),
        catchError((err) => {
          this.state.update((s) => ({ ...s, error: err.message, loading: false }));
          return of([]);
        }),
      )
      .subscribe();
  }
}
