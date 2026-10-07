"use client";

import { useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/language";

interface ReactionGameProps {
  language: Language;
}

type Phase = "idle" | "waiting" | "ready" | "result" | "early";

const BEST_TIME_STORAGE_KEY = "portfolio-reaction-best";
const MIN_WAIT_MS = 1000;
const MAX_WAIT_MS = 3000;

const translations = {
  br: {
    title: "reflexo",
    best: "recorde",
    idle: "clique para começar",
    waiting: "espere ficar verde...",
    ready: "CLIQUE!",
    early: "cedo demais! tente de novo",
    again: "clique para jogar de novo",
  },
  en: {
    title: "reflex",
    best: "best",
    idle: "click to start",
    waiting: "wait for green...",
    ready: "CLICK!",
    early: "too early! try again",
    again: "click to play again",
  },
  cn: {
    title: "反应测试",
    best: "最佳",
    idle: "点击开始",
    waiting: "等待变绿...",
    ready: "点击！",
    early: "太早了！再试一次",
    again: "点击再玩一次",
  },
};

const phaseStyles: Record<Phase, string> = {
  idle: "bg-background text-foreground/60",
  waiting: "bg-red-500/15 text-red-500",
  ready: "bg-emerald-500 text-white",
  result: "bg-background text-foreground",
  early: "bg-background text-red-500",
};

export function ReactionGame({ language }: ReactionGameProps) {
  const t = translations[language];
  const [phase, setPhase] = useState<Phase>("idle");
  const [lastTime, setLastTime] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);

  useEffect(() => {
    try {
      const saved = Number(window.localStorage.getItem(BEST_TIME_STORAGE_KEY));
      if (saved > 0) {
        setBest(saved);
      }
    } catch {}

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (phase === "waiting") {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      setPhase("early");
      return;
    }

    if (phase === "ready") {
      const elapsed = Math.round(performance.now() - startedAtRef.current);
      setLastTime(elapsed);
      setPhase("result");

      if (best === null || elapsed < best) {
        setBest(elapsed);
        try {
          window.localStorage.setItem(BEST_TIME_STORAGE_KEY, String(elapsed));
        } catch {}
      }
      return;
    }

    setPhase("waiting");
    timeoutRef.current = window.setTimeout(
      () => {
        startedAtRef.current = performance.now();
        setPhase("ready");
      },
      MIN_WAIT_MS + Math.random() * (MAX_WAIT_MS - MIN_WAIT_MS),
    );
  };

  return (
    <div className="rounded-none rounded-tl-2xl rounded-br-2xl border border-foreground/10 bg-card p-5 text-sm">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-foreground/40">
        <span>{`// ${t.title}`}</span>
        {best !== null ? (
          <span>
            {t.best} {best}ms
          </span>
        ) : null}
      </div>

      <button
        type="button"
        onClick={handleClick}
        className={`mt-3 flex h-20 w-full flex-col items-center justify-center gap-1 rounded-lg border border-foreground/10 text-xs font-medium transition-colors select-none ${phaseStyles[phase]}`}
      >
        {phase === "result" && lastTime !== null ? (
          <>
            <span className="font-mono text-2xl">{lastTime}ms</span>
            <span className="text-foreground/50">{t.again}</span>
          </>
        ) : (
          t[phase === "result" ? "again" : phase]
        )}
      </button>
    </div>
  );
}
