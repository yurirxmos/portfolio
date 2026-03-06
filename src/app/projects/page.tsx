import type { Metadata } from "next";
import { ProjectsPageClient } from "@/components/ProjectsPageClient";
import type { GithubRepository, Project } from "@/types/project";

const GITHUB_USERNAME = "yurirxmos";

export const metadata: Metadata = {
  title: "Projects | yurirxmos portfolio.",
  description:
    "Selected software engineering projects from Yuri Ramos, fetched directly from GitHub.",
};

const mapRepositoriesToProjects = (
  repositories: GithubRepository[],
): Project[] => {
  return repositories
    .filter(
      (repository) =>
        !repository.fork &&
        !repository.private &&
        !repository.archived &&
        repository.name !== "portfolio",
    )
    .map((repository) => ({
      id: repository.id,
      name: repository.name,
      description: repository.description,
      repositoryUrl: repository.html_url,
      demoUrl:
        repository.homepage && repository.homepage.trim().length > 0
          ? repository.homepage
          : null,
      language: repository.language ?? "",
      stars: repository.stargazers_count,
      updatedAt: repository.updated_at,
    }))
    .sort(
      (firstProject, secondProject) =>
        new Date(secondProject.updatedAt).getTime() -
        new Date(firstProject.updatedAt).getTime(),
    );
};

const fetchGithubProjects = async (): Promise<Project[]> => {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`,
    {
      headers,
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories from GitHub");
  }

  const repositories = (await response.json()) as GithubRepository[];
  return mapRepositoriesToProjects(repositories);
};

export default async function ProjectsPage() {
  try {
    const projects = await fetchGithubProjects();
    return <ProjectsPageClient hasError={false} projects={projects} />;
  } catch {
    return <ProjectsPageClient hasError projects={[]} />;
  }
}
