"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type ReactNode, useEffect, useState } from "react";
import { FaApple, FaGithub, FaLinux, FaWindows } from "react-icons/fa6";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import type { Language } from "@/lib/language";
import type { GithubRepository, Project } from "@/types/project";

type DesktopOs = "mac" | "windows" | "linux";

interface ProjectAction {
  href: string;
  label: string;
  icon: ReactNode;
}

const GITHUB_REPOSITORIES_URL = "https://github.com/yurirxmos?tab=repositories";
const FEATHER_DOWNLOAD_URL = "https://feather.rxmos.dev/download";

interface ProjectsPageClientProps {
  language: Language;
}

// Projects shown in the top list, with their own logo. Every other repo goes
// into the repositories list below, using the mac-style GitHub tile.
const FEATURED_PROJECTS: Record<string, string> = {
  feather: "/logos/feather.png",
  metria: "/logos/metria.png",
};

const translations = {
  br: {
    title: "projetos",
    github: "github",
    visitSite: "site",
    download: "download",
    error:
      "Nao foi possivel carregar os projetos agora. Tente novamente em alguns instantes.",
    empty: "Nenhum projeto encontrado no momento.",
    repositoriesTitle: "repositórios",
  },
  en: {
    title: "projects",
    github: "github",
    visitSite: "site",
    download: "download",
    error: "Could not load projects now. Please try again in a few moments.",
    empty: "No projects found right now.",
    repositoriesTitle: "repositories",
  },
  cn: {
    title: "项目",
    github: "github",
    visitSite: "网站",
    download: "下载",
    error: "当前无法加载项目，请稍后重试。",
    empty: "当前没有可展示的项目。",
    repositoriesTitle: "仓库",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

function ProjectLogo({ project }: { project: Project }) {
  const logo = FEATURED_PROJECTS[project.name.toLowerCase()];

  if (logo) {
    return (
      <Image
        src={logo}
        alt={`${project.name} logo`}
        width={56}
        height={56}
        className="size-14 shrink-0 rounded-xl"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="relative flex size-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-neutral-900 text-white"
    >
      <span className="absolute left-1.5 top-1.5 flex gap-[3px]">
        <span className="size-[5px] rounded-full bg-[#ff5f57]" />
        <span className="size-[5px] rounded-full bg-[#febc2e]" />
        <span className="size-[5px] rounded-full bg-[#28c840]" />
      </span>
      <FaGithub size={22} className="mt-2" />
    </div>
  );
}

function OsIcon({ os }: { os: DesktopOs | null }) {
  if (os === "mac") return <FaApple size={14} />;
  if (os === "windows") return <FaWindows size={14} />;
  if (os === "linux") return <FaLinux size={14} />;
  return <FiDownload size={14} />;
}

function getProjectAction(
  project: Project,
  os: DesktopOs | null,
  labels: { download: string; visitSite: string },
): ProjectAction | null {
  if (project.name.toLowerCase() === "feather") {
    return {
      href: FEATHER_DOWNLOAD_URL,
      label: labels.download,
      icon: <OsIcon os={os} />,
    };
  }

  if (project.demoUrl) {
    return {
      href: project.demoUrl,
      label: labels.visitSite,
      icon: <FiArrowUpRight size={14} />,
    };
  }

  return null;
}

const detectDesktopOs = (): DesktopOs | null => {
  const userAgent = navigator.userAgent.toLowerCase();

  // Phones and tablets can't install the desktop app: keep the generic icon.
  if (/android|iphone|ipad|ipod/.test(userAgent)) {
    return null;
  }

  if (userAgent.includes("windows")) return "windows";
  if (userAgent.includes("mac")) return "mac";
  if (userAgent.includes("linux") || userAgent.includes("x11")) return "linux";
  return null;
};

export function ProjectsPageClient({ language }: ProjectsPageClientProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [os, setOs] = useState<DesktopOs | null>(null);

  useEffect(() => {
    setOs(detectDesktopOs());
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/yurirxmos/repos?sort=created&per_page=100&type=owner",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories from GitHub");
        }

        const repositories = (await response.json()) as GithubRepository[];
        setProjects(
          repositories
            .filter(
              (repository) =>
                !repository.fork &&
                !repository.private &&
                !repository.archived &&
                repository.name !== "portfolio",
            )
            .sort(
              (first, second) =>
                Date.parse(second.created_at) - Date.parse(first.created_at),
            )
            .map((repository) => ({
              id: repository.id,
              name: repository.name,
              description: repository.description,
              repositoryUrl: repository.html_url,
              demoUrl: repository.homepage?.trim() || null,
              updatedAt: repository.updated_at,
            })),
        );
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProjects();
  }, []);

  const t = translations[language];

  const featuredProjects = projects.filter(
    (project) => project.name.toLowerCase() in FEATURED_PROJECTS,
  );
  const otherRepositories = projects.filter(
    (project) => !(project.name.toLowerCase() in FEATURED_PROJECTS),
  );
  const sections = [
    { key: "projects", title: t.title, items: featuredProjects },
    {
      key: "repositories",
      title: t.repositoriesTitle,
      items: otherRepositories,
    },
  ];

  return (
    <section
      id="projects"
      className="flex min-w-0 flex-1 flex-col px-6 pb-10 lg:px-0 lg:py-6"
    >
      {hasError ? (
        <p className="pt-8 text-sm text-foreground/80 md:text-base">
          {t.error}
        </p>
      ) : null}

      {!hasError && !isLoading && projects.length === 0 ? (
        <p className="pt-8 text-sm text-foreground/80 md:text-base">
          {t.empty}
        </p>
      ) : null}

      {!hasError
        ? sections.map((section) =>
            section.items.length > 0 ? (
              <div key={section.key} className="mb-10 flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-mono text-sm uppercase tracking-widest text-foreground/60">
                    {"// "}
                    {section.title}
                  </h2>

                  {section.key === "repositories" ? (
                    <a
                      href={GITHUB_REPOSITORIES_URL}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-lg border border-foreground/10 bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-foreground/30"
                    >
                      <FaGithub size={13} />
                      {t.github}
                    </a>
                  ) : null}
                </div>

                <motion.div
                  className="flex flex-col gap-3 pt-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.05 } },
                  }}
                >
                  {section.items.map((project) => {
                    const action = getProjectAction(project, os, t);
                    const isRepository = section.key === "repositories";

                    return (
                      <motion.article
                        key={project.id}
                        variants={cardVariants}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="group relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 rounded-none rounded-tl-2xl rounded-br-2xl border border-foreground/10 bg-card p-4 transition-colors duration-300 hover:border-foreground/30"
                      >
                        <div className="sm:row-span-2">
                          <ProjectLogo project={project} />
                        </div>

                        <h3 className="truncate text-lg font-semibold">
                          <a
                            href={project.repositoryUrl}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="after:absolute after:inset-0"
                          >
                            {project.name}
                          </a>
                        </h3>

                        {action ? (
                          <a
                            aria-label={action.label}
                            title={action.label}
                            className={
                              isRepository
                                ? "relative z-10 flex size-8 items-center justify-center rounded-lg text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
                                : "relative z-10 inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-80"
                            }
                            href={action.href}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {isRepository ? null : action.label}
                            {action.icon}
                          </a>
                        ) : (
                          <span />
                        )}

                        {project.description ? (
                          <p
                            className={`col-span-3 text-sm text-foreground/50 sm:col-span-2 sm:col-start-2 ${isRepository ? "truncate" : "line-clamp-2"}`}
                          >
                            {project.description}
                          </p>
                        ) : null}
                      </motion.article>
                    );
                  })}
                </motion.div>
              </div>
            ) : null,
          )
        : null}
    </section>
  );
}
