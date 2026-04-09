"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { GiBrazilFlag, GiSharpShuriken } from "react-icons/gi";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { RiArrowDownSLine, RiEmphasisCn } from "react-icons/ri";
import { useTheme } from "@/components/ThemeProvider";
import type { Language } from "@/lib/language";

interface TopNavbarProps {
  language: Language;
  homeLabel: string;
  projectsLabel: string;
  activePage: "home" | "projects";
  onLanguageChange: (language: Language) => void;
}

interface LanguageOption {
  value: Language;
  label: string;
  icon: ReactNode;
}

const languageOptions: LanguageOption[] = [
  { value: "br", label: "BR", icon: <GiBrazilFlag size={18} /> },
  { value: "en", label: "EN", icon: <LiaFlagUsaSolid size={18} /> },
  { value: "cn", label: "CN", icon: <RiEmphasisCn size={18} /> },
];

export function TopNavbar({
  language,
  homeLabel,
  projectsLabel,
  activePage,
  onLanguageChange,
}: TopNavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [shurikenRotation, setShurikenRotation] = useState(0);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const shurikenVelocityRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const currentLanguage = languageOptions.find(
    (languageOption) => languageOption.value === language,
  );

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (!languageMenuRef.current?.contains(event.target)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    const animate = (timestamp: number) => {
      const lastTimestamp = lastTimestampRef.current ?? timestamp;
      const delta = Math.min((timestamp - lastTimestamp) / 1000, 0.032);
      const targetVelocity = isNavHovered ? 740 : 0;
      const acceleration = isNavHovered ? 10 : 2;

      shurikenVelocityRef.current +=
        (targetVelocity - shurikenVelocityRef.current) * acceleration * delta;

      setShurikenRotation((currentRotation) => {
        return currentRotation + shurikenVelocityRef.current * delta;
      });

      lastTimestampRef.current = timestamp;
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isNavHovered]);

  if (!currentLanguage) {
    return null;
  }

  return (
    <div className="mb-5 flex w-full items-center justify-between gap-2 sm:flex-row sm:gap-0">
      <nav
        className="group flex items-center gap-2"
        aria-label="Primary"
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
      >
        <GiSharpShuriken
          style={{ transform: `rotate(${shurikenRotation}deg)` }}
        />

        <Link
          className={`text-xs hover:opacity-50 ${activePage === "home" ? "opacity-100" : "opacity-60"}`}
          href="/"
        >
          /{homeLabel}
        </Link>

        <Link
          className={`text-xs hover:opacity-50 ${activePage === "projects" ? "opacity-100" : "opacity-60"}`}
          href="/projects"
        >
          /{projectsLabel}
        </Link>
      </nav>

      <div className="flex flex-row items-center gap-4">
        <button
          type="button"
          aria-label={`switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="hover:opacity-50 flex items-center gap-1 text-xs hover:cursor-pointer"
          onClick={() => {
            void toggleTheme();
          }}
        >
          {theme === "dark" ? (
            <MdLightMode size={18} />
          ) : (
            <MdDarkMode size={18} />
          )}
        </button>

        <div className="relative" ref={languageMenuRef}>
          <button
            type="button"
            aria-expanded={isLanguageMenuOpen}
            aria-label="Toggle language menu"
            className="hover:opacity-50 flex items-center gap-1 text-xs hover:cursor-pointer"
            onClick={() =>
              setIsLanguageMenuOpen((currentValue) => !currentValue)
            }
          >
            {currentLanguage.label}
            {currentLanguage.icon}
            <RiArrowDownSLine
              className={`transition ${isLanguageMenuOpen ? "rotate-180" : ""}`}
              size={16}
            />
          </button>

          {isLanguageMenuOpen ? (
            <div className="absolute right-0 top-full z-10 mt-2 min-w-24 rounded-md border border-foreground/10 bg-background p-1 shadow-lg">
              {languageOptions.map((languageOption) => (
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-3 rounded px-2 py-1 text-xs hover:bg-foreground/5 ${
                    language === languageOption.value ? "opacity-60" : ""
                  }`}
                  key={languageOption.value}
                  onClick={() => {
                    onLanguageChange(languageOption.value);
                    setIsLanguageMenuOpen(false);
                  }}
                >
                  <span>{languageOption.label}</span>
                  {languageOption.icon}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
