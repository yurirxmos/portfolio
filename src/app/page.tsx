"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiCheck, FiMail } from "react-icons/fi";
import { ProjectsPageClient } from "@/components/ProjectsPageClient";
import { ReactionGame } from "@/components/ReactionGame";
import { TopNavbar } from "@/components/TopNavbar";
import {
  detectLanguageFromBrowser,
  isSupportedLanguage,
  LANGUAGE_STORAGE_KEY,
  type Language,
} from "@/lib/language";

const translations = {
  br: {
    role: "Engenheiro de software",
    description1:
      "Sou engenheiro de software, com {years} anos de experiência. Atuei em projetos voltados para o setor agronômico, onde aprendi a aplicar tecnologias para otimização de processos e implantação de soluções com inteligência artificial.",
    contributions: "{contributions} contribuições no GitHub este ano",
    contact: "Quer me conhecer melhor? Me mande um e-mail :)",
    sendEmail: "Enviar e-mail",
    copied: "E-mail copiado!",
  },
  en: {
    role: "Software engineer",
    description1:
      "I'm a software engineer with {years} years of experience. I've worked on projects focused on the agricultural sector, where I learned to apply technologies for process optimization and implementation of artificial intelligence solutions.",
    contributions: "{contributions} GitHub contributions this year",
    contact: "Want to get to know me better? Send me an email :)",
    sendEmail: "Send e-mail",
    copied: "E-mail copied!",
  },
  cn: {
    role: "软件工程师",
    description1:
      "我是一名软件工程师，有{years}年的经验。我曾在农业部门的项目中工作，在那里我学会了应用技术来优化流程并实施人工智能解决方案。",
    contributions: "今年在GitHub上有{contributions}次贡献",
    contact: "想更了解我？给我发邮件 :)",
    sendEmail: "发送邮件",
    copied: "邮箱已复制！",
  },
};

const CONTACT_EMAIL = "yuri@rxmos.dev.br";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yurirxmos/",
    icon: FaLinkedinIn,
  },
  { label: "GitHub", href: "https://github.com/yurirxmos", icon: FaGithub },
  { label: "X", href: "https://twitter.com/rxmosdev", icon: FaXTwitter },
  { label: "Email", href: "mailto:yuriramos2406@gmail.com", icon: FiMail },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const fadeUpTransition = { duration: 0.5, ease: "easeOut" } as const;

export default function Home() {
  const calculateExperienceYears = () => {
    const startYear = 2021;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  };

  const years = calculateExperienceYears();

  const [contributions, setContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>("br");
  const [copied, setCopied] = useState(false);

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

  useEffect(() => {
    const fetchContributions = async () => {
      const currentYear = new Date().getFullYear();
      const from = `${currentYear}-01-01T00:00:00Z`;
      const to = `${currentYear}-12-31T23:59:59Z`;
      const query = `{
        user(login: "yurirxmos") {
          contributionsCollection(from: "${from}", to: "${to}") {
            totalCommitContributions
            totalIssueContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
            totalRepositoryContributions
          }
        }
      }`;
      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
          body: JSON.stringify({ query }),
        });
        const data = await response.json();
        if (data.data) {
          const coll = data.data.user.contributionsCollection;
          const total =
            coll.totalCommitContributions +
            coll.totalIssueContributions +
            coll.totalPullRequestContributions +
            coll.totalPullRequestReviewContributions +
            coll.totalRepositoryContributions;
          setContributions(total);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchContributions();
  }, []);

  const t = translations[language];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const replaceTemplate = (
    text: string,
    values: Record<string, string | number>,
  ) => {
    return text.replace(/{(\w+)}/g, (_, key) => String(values[key] || ""));
  };

  return (
    <div className="mx-auto min-h-screen max-w-6xl lg:flex lg:gap-10 lg:px-10">
      <motion.aside
        className="m-6 flex flex-col gap-4 lg:sticky lg:top-6 lg:m-0 lg:my-6 lg:w-80 lg:shrink-0 lg:self-start"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div
          variants={fadeUp}
          transition={fadeUpTransition}
          className="rounded-none rounded-tl-2xl rounded-br-2xl border border-foreground/10 bg-card px-5 py-3"
        >
          <TopNavbar language={language} onLanguageChange={setLanguage} />
        </motion.div>

        <div className="flex flex-col gap-5 rounded-none rounded-tl-2xl rounded-br-2xl border border-foreground/10 bg-card p-6">
          <motion.div
            variants={fadeUp}
            transition={fadeUpTransition}
            className="flex flex-col items-start gap-3"
          >
            <motion.div
              whileHover={{ rotate: -6, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Image
                src="/brand.png"
                alt="Yuri Ramos"
                width={72}
                height={72}
                className="size-[72px] rounded-full object-cover dark:invert"
                priority
              />
            </motion.div>
            <div>
              <h1 className="text-2xl font-semibold leading-tight">
                Yuri Ramos
              </h1>
              <p className="text-sm text-foreground/50">
                @yurirxmos · {t.role}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={fadeUpTransition}
            className="flex flex-col gap-2 text-sm leading-relaxed text-foreground/80"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-foreground/40">
              {"// about"}
            </span>
            <p>{replaceTemplate(t.description1, { years: String(years) })}</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={fadeUpTransition}
            className="flex items-center gap-2"
          >
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.92 }}
                className="flex size-9 items-center justify-center rounded-lg border border-foreground/10 bg-background text-foreground/60 transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            transition={fadeUpTransition}
            className="font-mono text-[11px] text-foreground/40"
          >
            {"> "}
            {replaceTemplate(t.contributions, {
              contributions: loading ? "...." : String(contributions),
            })}
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          transition={fadeUpTransition}
          className="rounded-none rounded-tl-2xl rounded-br-2xl border border-foreground/10 bg-card p-5 text-sm"
        >
          <p className="text-foreground/60">{t.contact}</p>
          <button
            type="button"
            onClick={copyEmail}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-3.5 py-2 text-xs font-medium text-background transition-opacity hover:opacity-80"
          >
            {copied ? <FiCheck size={14} /> : <FiMail size={14} />}
            {copied ? t.copied : t.sendEmail}
          </button>
        </motion.div>

        <motion.div variants={fadeUp} transition={fadeUpTransition}>
          <ReactionGame language={language} />
        </motion.div>
      </motion.aside>

      <ProjectsPageClient language={language} />
    </div>
  );
}
