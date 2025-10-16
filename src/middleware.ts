import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/lib/i18n/i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const LOCALES = [...i18n.locales] as string[];
const DEFAULT = i18n.defaultLocale;

function bestFromAcceptLanguage(req: NextRequest): string {
  const headers: Record<string, string> = {};
  req.headers.forEach((v, k) => (headers[k] = v));
  const languages = new Negotiator({ headers }).languages();
  return matchLocale(languages, LOCALES, DEFAULT);
}

function firstSeg(pathname: string): string | null {
  const seg = pathname.split("/").filter(Boolean)[0];
  return seg ?? null;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const seg = firstSeg(pathname);
  const hasLocale = seg && LOCALES.includes(seg);

  if (hasLocale) {
    const res = NextResponse.next();
    const currentCookie = request.cookies.get("lang")?.value;
    if (currentCookie !== seg) {
      res.cookies.set("lang", seg!, {
        path: "/",
        maxAge: 60 * 60 * 24 * 180,
        sameSite: "lax",
      });
    }
    return res;
  }

  const cookieLang = request.cookies.get("lang")?.value;
  const chosen = cookieLang && LOCALES.includes(cookieLang) ? cookieLang : bestFromAcceptLanguage(request);

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${chosen}` : `/${chosen}${pathname}`;
  url.search = search;

  const res = NextResponse.redirect(url);
  res.cookies.set("lang", chosen, {
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
    sameSite: "lax",
  });
  return res;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};