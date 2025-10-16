import type { Metadata } from "next";
import { Nunito_Sans, PT_Sans } from "next/font/google";
import "./globals.css";
import "modern-normalize";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { i18n, type Locale } from "@/lib/i18n/i18n-config";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin", "cyrillic"],
  weight: "300",
});

const PTSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin", "cyrillic"],
  weight: "700",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Locale = (i18n.locales as readonly string[]).includes(raw)
    ? (raw as Locale)
    : (i18n.defaultLocale as Locale);

  const dict = await getDictionary(lang);

  const baseUrl = "https://my-resume-ten-delta.vercel.app";
  const localizedUrl = `${baseUrl}/${lang}`;

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    icons: { icon: "/favicon.svg" },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: localizedUrl,
      siteName: "Oleksii Ivaniuta",
      images: [
        {
          url: "/oleksii-meta-data.webp",
          width: 1200,
          height: 630,
          alt: "Oleksii Ivaniuta",
        },
      ],
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = (i18n.locales as readonly string[]).includes(raw)
    ? (raw as Locale)
    : (i18n.defaultLocale as Locale);

  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={`${nunitoSans.variable} ${PTSans.variable} container`}>
        <Header dict={dictionary} />
        <main>{children}</main>
        <Footer dict={dictionary} />
      </body>
    </html>
  );
}