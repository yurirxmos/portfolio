"use client";

import { motion } from "framer-motion";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { FaJava } from "react-icons/fa6";
import { FiCode, FiDownload, FiStar } from "react-icons/fi";
import {
  SiCss3,
  SiExpo,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSwift,
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

interface ProjectBadge {
  key: string;
  label: string;
  icon?: ReactNode;
}

const PROJECT_BADGES: Record<string, ProjectBadge[]> = {
  metria: [
    { key: "open-source", label: "open-source" },
    {
      key: "downloads",
      label: "+150",
      icon: <FiDownload size={11} />,
    },
  ],
};

const translations = {
  br: {
    home: "home",
    projects: "projetos",
    title: "projetos",
    repository: "github",
    demo: "demo",
    error:
      "Nao foi possivel carregar os projetos agora. Tente novamente em alguns instantes.",
    empty: "Nenhum projeto encontrado no momento.",
    repositories: "repositórios",
  },
  en: {
    home: "home",
    projects: "projects",
    title: "projects",
    repository: "github",
    demo: "demo",
    error: "Could not load projects now. Please try again in a few moments.",
    empty: "No projects found right now.",
    repositories: "repositories",
  },
  cn: {
    home: "主页",
    projects: "项目",
    title: "项目",
    repository: "github",
    demo: "演示",
    error: "当前无法加载项目，请稍后重试。",
    empty: "当前没有可展示的项目。",
    repositories: "仓库",
  },
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

  if (normalizedTechnology === "swift") {
    return {
      key: "swift",
      icon: <SiSwift size={14} />,
      label: "Swift",
      colorClassName: "text-[#F05138]",
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
    <div className="mx-auto flex h-screen max-w-4xl flex-col px-6 py-10 md:px-24">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden">
        <TopNavbar
          activePage="projects"
          homeLabel={t.home}
          language={language}
          onLanguageChange={setLanguage}
          projectsLabel={t.projects}
        />

        <div className="mb-2 flex shrink-0 items-end justify-between gap-4 border-b border-foreground/10 pb-5">
          <h1 className="text-3xl font-semibold md:text-4xl">{t.title}</h1>
          {!hasError && hasProjects ? (
            <span className="whitespace-nowrap text-xs text-foreground/40 md:text-sm">
              {projects.length} {t.repositories}
            </span>
          ) : null}
        </div>

        {hasError ? (
          <p className="pt-8 text-sm text-foreground/80 md:text-base">
            {t.error}
          </p>
        ) : null}

        {!hasError && !hasProjects ? (
          <p className="pt-8 text-sm text-foreground/80 md:text-base">
            {t.empty}
          </p>
        ) : null}

        {!hasError && hasProjects ? (
          <motion.div
            className="no-scrollbar flex-1 divide-y divide-foreground/10 overflow-y-auto"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {projects.map((project, index) => {
              const technology = getTechnologyIconInfo(project.language);
              const badges = PROJECT_BADGES[project.name] ?? [];
              return (
                <motion.article
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="w-6 shrink-0 text-xs text-foreground/30 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-wrap items-center gap-3 transition-transform duration-300 group-hover:translate-x-1">
                      <h2 className="text-lg font-semibold md:text-xl">
                        {project.name}
                      </h2>

                      {badges.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {badges.map((badge) => (
                            <span
                              key={`${project.id}-${badge.key}`}
                              className="inline-flex items-center gap-1 rounded-full bg-foreground/40 text-background  px-2 py-0.5 text-[10px]"
                            >
                              {badge.icon}
                              {badge.label}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center gap-5 pl-10 sm:pl-0">
                    {project.stars > 0 ? (
                      <div className="flex items-center gap-1.5 text-foreground/50">
                        <FiStar size={13} />
                        <span className="text-sm tabular-nums">
                          {project.stars}
                        </span>
                      </div>
                    ) : null}

                    <span
                      title={technology.label}
                      className={`inline-flex items-center ${technology.colorClassName}`}
                    >
                      {technology.icon}
                    </span>

                    <div className="flex items-center gap-4 text-sm text-foreground/40 transition-colors duration-300 group-hover:text-foreground/90">
                      <a
                        className="underline-offset-4 hover:underline"
                        href={project.repositoryUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {t.repository}
                      </a>

                      {project.demoUrl ? (
                        <a
                          className="underline-offset-4 hover:underline"
                          href={project.demoUrl}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {t.demo}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
