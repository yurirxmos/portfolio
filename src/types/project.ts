export interface GithubRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  created_at: string;
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
  updatedAt: string;
}
