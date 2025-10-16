import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/lib/i18n/i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { Lang } from "./types/types";

const LOCALES = [...i18n.locales];
const DEFAULT = i18n.defaultLocale;

function getLocaleFromAcceptLanguage(request: NextRequest): string {
  const headers: Record<string, string> = {};
  request.headers.forEach((v, k) => (headers[k] = v));
  const languages = new Negotiator({ headers }).languages();
  return matchLocale(languages, LOCALES, DEFAULT);
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const cookieLang = request.cookies.get("lang")?.value as Lang;
  const chosen =
    cookieLang && LOCALES.includes(cookieLang) ? cookieLang : getLocaleFromAcceptLanguage(request);

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${chosen}` : `/${chosen}${pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};