"use client";
import { useEffect, useState } from "react";
import css from "./LanguageSelect.module.css";
import { Lang } from "@/types/types";

const LANGS: Record<Lang, string> = {
  en: "EN 🇬🇧",
  pt: "PT 🇵🇹",
  uk: "UK 🇺🇦",
};

export default function LanguageSelect() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <div className={css.wrapper}>
      <select className={css.select}
        id="lang"
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
        aria-label="Select language"
      >
        {Object.entries(LANGS).map(([value, label]) => (
          <option className={css.option} key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
