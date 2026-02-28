export interface GithubRepository {
  readonly id: number;
  readonly name: string;
  readonly description: string | null;
  readonly html_url: string;
  readonly homepage: string | null;
  readonly topics: string[];
  readonly language: string | null;
  readonly stargazers_count: number;
  readonly forks_count: number;
  readonly updated_at: string;
  readonly fork: boolean;
}

export interface GithubServiceState {
  readonly repositories: readonly GithubRepository[];
  readonly loading: boolean;
  readonly error: string | null;
}

export interface GithubProfile {
  readonly login: string;
  readonly avatar_url: string;
  readonly html_url: string;
  readonly name: string;
  readonly bio: string | null;
  readonly public_repos: number;
  readonly followers: number;
  readonly following: number;
}
