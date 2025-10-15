export const i18n = {
  defaultLocale: "en",
  locales: ["en", "uk", "pt"],
} as const;

export type Locale = (typeof i18n)["locales"][number];