"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { TopNavbar } from "@/components/TopNavbar";
import {
  detectLanguageFromBrowser,
  isSupportedLanguage,
  LANGUAGE_STORAGE_KEY,
  type Language,
} from "@/lib/language";

interface App {
  key: "feather" | "metria";
  name: string;
  icon: string;
  url: string;
  repositoryUrl: string;
  platforms: string[];
}

/** The shipped apps, each with its own site. Descriptions live in `translations`. */
const APPS: App[] = [
  {
    key: "feather",
    name: "Feather",
    icon: "/apps/feather.svg",
    url: "https://feather.rxmos.dev",
    repositoryUrl: "https://github.com/yurirxmos/feather",
    platforms: ["macOS", "Windows", "Linux"],
  },
  {
    key: "metria",
    name: "Metria",
    icon: "/apps/metria.png",
    url: "https://metria.rxmos.dev",
    repositoryUrl: "https://github.com/yurirxmos/metria",
    platforms: ["macOS", "Windows", "Linux"],
  },
];

const translations = {
  br: {
    home: "home",
    projects: "projetos",
    apps: "apps",
    title: "apps",
    site: "site",
    repository: "github",
    count: "apps",
    descriptions: {
      feather:
        "Assistente de escrita com IA. Aperte um atalho em qualquer app, diga o que escrever e ele escreve a resposta a partir do que está na tela.",
      metria:
        "Acompanhe o uso dos seus assistentes de IA para programar em tempo real, sem sair do seu fluxo.",
    },
  },
  en: {
    home: "home",
    projects: "projects",
    apps: "apps",
    title: "apps",
    site: "site",
    repository: "github",
    count: "apps",
    descriptions: {
      feather:
        "AI writing assistant. Press a shortcut in any app, say what to write, and it drafts the reply from what's on your screen.",
      metria:
        "Track your AI coding assistant usage in real time, without leaving your flow.",
    },
  },
  cn: {
    home: "主页",
    projects: "项目",
    apps: "应用",
    title: "应用",
    site: "网站",
    repository: "github",
    count: "个应用",
    descriptions: {
      feather:
        "AI 写作助手。在任何应用中按下快捷键，说出要写的内容，它会根据屏幕上的内容写好回复。",
      metria: "实时查看你的 AI 编程助手用量，无需离开工作流。",
    },
  },
};

export function AppsPageClient() {
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

  return (
    <div className="mx-auto flex h-screen max-w-4xl flex-col px-6 py-10 md:px-24">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden">
        <div className="mb-5">
          <TopNavbar language={language} onLanguageChange={setLanguage} />
        </div>

        <div className="mb-2 flex shrink-0 items-end justify-between gap-4 border-b border-foreground/10 pb-5">
          <h1 className="text-3xl font-semibold md:text-4xl">{t.title}</h1>
          <span className="whitespace-nowrap text-xs text-foreground/40 md:text-sm">
            {APPS.length} {t.count}
          </span>
        </div>

        <motion.div
          className="no-scrollbar flex-1 divide-y divide-foreground/10 overflow-y-auto"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {APPS.map((app, index) => (
            <motion.article
              key={app.key}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group flex gap-4 py-6"
            >
              <span className="w-6 shrink-0 pt-3 text-xs text-foreground/30 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* biome-ignore lint/performance/noImgElement: small static icons, no optimization needed */}
              <img
                src={app.icon}
                alt=""
                width={44}
                height={44}
                className="size-11 shrink-0 rounded-[11px] shadow-sm"
              />

              <div className="flex min-w-0 flex-1 flex-col gap-2 transition-transform duration-300 group-hover:translate-x-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold md:text-xl">
                    <a
                      href={app.url}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="underline-offset-4 hover:underline"
                    >
                      {app.name}
                    </a>
                  </h2>
                  <p className="mt-1 max-w-md text-sm text-foreground/60">
                    {t.descriptions[app.key]}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {app.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="rounded-full border border-foreground/15 px-2 py-0.5 text-[10px] text-foreground/60"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-4 pt-1 text-sm text-foreground/40 transition-colors duration-300 group-hover:text-foreground/90">
                  <a
                    className="inline-flex items-center gap-0.5 underline-offset-4 hover:underline"
                    href={app.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {app.url.replace("https://", "")}
                    <FiArrowUpRight size={14} />
                  </a>
                  <a
                    className="underline-offset-4 hover:underline"
                    href={app.repositoryUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {t.repository}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
