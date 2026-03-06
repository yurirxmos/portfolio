export interface GithubRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  private: boolean;
  archived: boolean;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  repositoryUrl: string;
  demoUrl: string | null;
  language: string;
  stars: number;
  updatedAt: string;
}
