"use client";

import Link from "next/link";
import { GiBrazilFlag, GiSharpShuriken } from "react-icons/gi";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { RiEmphasisCn } from "react-icons/ri";
import type { Language } from "@/lib/language";

interface TopNavbarProps {
  language: Language;
  homeLabel: string;
  projectsLabel: string;
  activePage: "home" | "projects";
  onLanguageChange: (language: Language) => void;
}

export function TopNavbar({
  language,
  homeLabel,
  projectsLabel,
  activePage,
  onLanguageChange,
}: TopNavbarProps) {
  return (
    <div className="mb-5 flex w-full items-center justify-between gap-2 sm:flex-row sm:gap-0">
      <div className="flex items-center gap-2 group hover:cursor-pointer">
        <GiSharpShuriken className="group-hover:animate-spin" />
        <h1 className="font-semibold">Yuri Ramos</h1>
      </div>

      <div className="mx-auto flex items-center gap-2">
        {activePage !== "home" ? (
          <Link className="text-xs underline hover:opacity-50" href="/">
            {homeLabel}
          </Link>
        ) : null}

        {activePage !== "projects" ? (
          <Link className="text-xs underline hover:opacity-50" href="/projects">
            {projectsLabel}
          </Link>
        ) : null}
      </div>

      <div className="flex flex-row items-center gap-4">
        <button
          type="button"
          className={`hover:opacity-50 flex items-center gap-1 text-xs hover:cursor-pointer ${
            language === "br" ? "border-b border-border" : ""
          }`}
          onClick={() => onLanguageChange("br")}
        >
          BR
          <GiBrazilFlag size={18} />
        </button>

        <button
          type="button"
          className={`hover:opacity-50 flex items-center gap-1 text-xs hover:cursor-pointer ${
            language === "en" ? "border-b border-border" : ""
          }`}
          onClick={() => onLanguageChange("en")}
        >
          EN
          <LiaFlagUsaSolid size={18} />
        </button>

        <button
          type="button"
          className={`hover:opacity-50 flex items-center gap-1 text-xs hover:cursor-pointer ${
            language === "cn" ? "border-b border-border" : ""
          }`}
          onClick={() => onLanguageChange("cn")}
        >
          CN
          <RiEmphasisCn size={18} />
        </button>
      </div>
    </div>
  );
}
