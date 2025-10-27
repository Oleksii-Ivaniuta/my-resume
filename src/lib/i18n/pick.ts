import { Locale } from "@/lib/i18n/i18n-config";

const suffixByLang: Record<Locale, "En" | "Uk" | "Pt"> = {
  en: "En",
  uk: "Uk",
  pt: "Pt",
};

export function pickLocalized<T extends Record<string, unknown>>(
  obj: T,
  base: string,
  lang: Locale,
  fallback: Locale = "en"
) {
  const suf = suffixByLang[lang];
  const fbSuf = suffixByLang[fallback];
  return obj[`${base}${suf}`] ?? obj[`${base}${fbSuf}`] ?? "";
}

export const pickDescription = <T extends Record<string, unknown>>(obj: T, lang: Locale) =>
  pickLocalized(obj, "description", lang);

export const pickType = <T extends Record<string, unknown>>(obj: T, lang: Locale) =>
  pickLocalized(obj, "type", lang);

export const pickRole = <T extends Record<string, unknown>>(obj: T, lang: Locale) =>
  pickLocalized(obj, "role", lang);