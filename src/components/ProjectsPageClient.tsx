"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { FaJava } from "react-icons/fa6";
import { FiCode } from "react-icons/fi";
import {
  SiCss3,
  SiExpo,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { TopNavbar } from "@/components/TopNavbar";
import {
  detectLanguageFromBrowser,
  isSupportedLanguage,
  LANGUAGE_STORAGE_KEY,
  type Language,
} from "@/lib/language";
import type { Project } from "@/types/project";

interface ProjectsPageClientProps {
  projects: Project[];
  hasError: boolean;
}

interface TechnologyIconInfo {
  key: string;
  icon: ReactNode;
  label: string;
  colorClassName: string;
}

const translations = {
  br: {
    home: "home",
    projects: "projetos",
    title: "/projetos",
    subtitle:
      "Lista de projetos publicados no meu GitHub, atualizada automaticamente.",
    repository: "github",
    demo: "demo",
    error:
      "Nao foi possivel carregar os projetos agora. Tente novamente em alguns instantes.",
    empty: "Nenhum projeto encontrado no momento.",
  },
  en: {
    home: "home",
    projects: "projects",
    title: "/projects",
    subtitle: "Public projects from my GitHub profile, updated automatically.",
    repository: "github",
    demo: "demo",
    error: "Could not load projects now. Please try again in a few moments.",
    empty: "No projects found right now.",
  },
  cn: {
    home: "主页",
    projects: "项目",
    title: "/项目",
    subtitle: "来自我 GitHub 的公开项目列表，自动更新。",
    repository: "github",
    demo: "演示",
    error: "当前无法加载项目，请稍后重试。",
    empty: "当前没有可展示的项目。",
  },
};

const REPOSITORY_TECH_HINTS: Record<string, string[]> = {
  "opencode-refactor-agent": ["typescript", "node", "react"],
  "opencode-ship-cmd": ["typescript", "node"],
  "freeqrcode-generator": ["javascript", "html", "css"],
  gitrats: ["typescript", "react", "next"],
  portfolio: ["typescript", "react", "next", "tailwind"],
  rxmosdev: ["typescript", "react", "next"],
  "qrcode-tester": ["typescript", "react", "expo"],
  "frontend-mmr-calculator": ["javascript", "react"],
  "repo-contaslol": ["javascript", "html", "css"],
  "4get-list": ["javascript", "html", "css"],
  "github-card": ["javascript", "html", "css"],
  "caplol-site": ["html", "css", "javascript"],
};

const getTechnologyIconInfo = (technology: string): TechnologyIconInfo => {
  const normalizedTechnology = technology.trim().toLowerCase();

  if (normalizedTechnology === "typescript") {
    return {
      key: "typescript",
      icon: <SiTypescript size={14} />,
      label: "TypeScript",
      colorClassName: "text-[#3178C6]",
    };
  }

  if (normalizedTechnology === "javascript") {
    return {
      key: "javascript",
      icon: <SiJavascript size={14} />,
      label: "JavaScript",
      colorClassName: "text-[#F7DF1E]",
    };
  }

  if (normalizedTechnology === "html") {
    return {
      key: "html",
      icon: <SiHtml5 size={14} />,
      label: "HTML",
      colorClassName: "text-[#E34F26]",
    };
  }

  if (normalizedTechnology === "css") {
    return {
      key: "css",
      icon: <SiCss3 size={14} />,
      label: "CSS",
      colorClassName: "text-[#1572B6]",
    };
  }

  if (normalizedTechnology === "vue") {
    return {
      key: "vue",
      icon: <SiVuedotjs size={14} />,
      label: "Vue",
      colorClassName: "text-[#42B883]",
    };
  }

  if (normalizedTechnology === "java") {
    return {
      key: "java",
      icon: <FaJava size={14} />,
      label: "Java",
      colorClassName: "text-[#F89820]",
    };
  }

  if (normalizedTechnology === "react") {
    return {
      key: "react",
      icon: <SiReact size={14} />,
      label: "React",
      colorClassName: "text-[#61DAFB]",
    };
  }

  if (normalizedTechnology === "next") {
    return {
      key: "next",
      icon: <SiNextdotjs size={14} />,
      label: "Next.js",
      colorClassName: "text-foreground",
    };
  }

  if (normalizedTechnology === "tailwind") {
    return {
      key: "tailwind",
      icon: <SiTailwindcss size={14} />,
      label: "Tailwind CSS",
      colorClassName: "text-[#06B6D4]",
    };
  }

  if (normalizedTechnology === "node") {
    return {
      key: "node",
      icon: <SiNodedotjs size={14} />,
      label: "Node.js",
      colorClassName: "text-[#5FA04E]",
    };
  }

  if (normalizedTechnology === "expo") {
    return {
      key: "expo",
      icon: <SiExpo size={14} />,
      label: "Expo",
      colorClassName: "text-foreground",
    };
  }

  return {
    key: normalizedTechnology || "code",
    icon: <FiCode size={14} />,
    label: technology || "Code",
    colorClassName: "text-foreground",
  };
};

const getProjectTechnologies = (project: Project): TechnologyIconInfo[] => {
  const technologies = new Set<string>();

  if (project.language) {
    technologies.add(project.language.toLowerCase());
  }

  const hints = REPOSITORY_TECH_HINTS[project.name] ?? [];
  for (const hint of hints) {
    technologies.add(hint);
  }

  const description =
    `${project.name} ${project.description ?? ""}`.toLowerCase();

  if (description.includes("react")) {
    technologies.add("react");
  }

  if (description.includes("next")) {
    technologies.add("next");
  }

  if (description.includes("tailwind")) {
    technologies.add("tailwind");
  }

  if (description.includes("node")) {
    technologies.add("node");
  }

  if (description.includes("expo") || description.includes("react native")) {
    technologies.add("expo");
    technologies.add("react");
  }

  if (technologies.size === 0) {
    return [getTechnologyIconInfo("")];
  }

  return Array.from(technologies).map((technology) =>
    getTechnologyIconInfo(technology),
  );
};

export function ProjectsPageClient({
  projects,
  hasError,
}: ProjectsPageClientProps) {
  const [language, setLanguage] = useState<Language>("br");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && isSupportedLanguage(savedLanguage)) {
      setLanguage(savedLanguage);
      return;
    }

    setLanguage(detectLanguageFromBrowser(navigator.language));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const t = translations[language];
  const hasProjects = useMemo(() => projects.length > 0, [projects.length]);

  return (
    <div className="min-h-screen px-6 py-10 md:px-24">
      <div className="mx-auto w-full max-w-5xl">
        <TopNavbar
          activePage="projects"
          homeLabel={t.home}
          language={language}
          onLanguageChange={setLanguage}
          projectsLabel={t.projects}
        />

        <div className="mb-10 flex flex-col gap-3">
          <h1 className="text-3xl font-semibold md:text-4xl">{t.title}</h1>
          <p className="max-w-2xl text-sm text-foreground/80 md:text-base">
            {t.subtitle}
          </p>
        </div>

        {hasError ? (
          <p className="mt-3 max-w-2xl text-sm text-foreground/80 md:text-base">
            {t.error}
          </p>
        ) : null}

        {!hasError && !hasProjects ? (
          <p className="mt-3 max-w-2xl text-sm text-foreground/80 md:text-base">
            {t.empty}
          </p>
        ) : null}

        {!hasError && hasProjects ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((project) => {
              const technologies = getProjectTechnologies(project);

              return (
                <article
                  className="flex h-full flex-col justify-between rounded-xl border border-foreground/10 p-5"
                  key={project.id}
                >
                  <div className="space-y-3">
                    <h2 className="text-lg font-semibold md:text-xl">
                      {project.name}
                    </h2>
                    {project.description ? (
                      <p className="text-sm text-foreground/80">
                        {project.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/75">
                      {technologies.map((technology) => (
                        <span
                          key={`${project.id}-${technology.key}`}
                          title={technology.label}
                        >
                          <span
                            className={`inline-flex items-center ${technology.colorClassName}`}
                          >
                            {technology.icon}
                          </span>
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <a
                        className="underline hover:opacity-70"
                        href={project.repositoryUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {t.repository}
                      </a>

                      {project.demoUrl ? (
                        <a
                          className="underline hover:opacity-70"
                          href={project.demoUrl}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {t.demo}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
