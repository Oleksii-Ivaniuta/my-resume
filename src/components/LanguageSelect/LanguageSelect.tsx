"use client";
import { usePathname, useRouter, useParams } from "next/navigation";
import css from "./LanguageSelect.module.css";
import { Lang } from "@/types/types";

const LANGS: Record<Lang, string> = {
  en: "EN 🇬🇧",
  pt: "PT 🇵🇹",
  uk: "UK 🇺🇦",
};

function setLangCookie(lang: Lang) {
  document.cookie = `lang=${lang}; Max-Age=${60 * 60 * 24 * 180}; Path=/; SameSite=Lax`;
}

export default function LanguageSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const { lang: urlLang } = useParams<{ lang: string }>();

  const current = (Object.keys(LANGS) as Lang[]).includes(urlLang as Lang)
    ? (urlLang as Lang)
    : "en";

  const onChange = (newLang: Lang) => {
    setLangCookie(newLang);
    const segments = pathname.split("/").filter(Boolean);
    const rest = segments.slice(1).join("/");
    router.replace(`/${newLang}${rest ? `/${rest}` : ""}`);
  };

  router.refresh();

  return (
    <div className={css.wrapper}>
      <select
        className={css.select}
        id="lang"
        value={current}
        onChange={(e) => onChange(e.target.value as Lang)}
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