import type { Metadata } from "next";
import { Nunito_Sans, PT_Sans } from "next/font/google";
import "./globals.css";
import "modern-normalize";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { i18n, Locale } from "@/lib/i18n/i18n-config";

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
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);

  return {
    title: "Oleksii Ivaniuta - fullstack developer",
    description: "Website-resume of the fullstack Javascript developer",
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      title: "Oleksii Ivaniuta - fullstack developer",
      description: "Website-resume of the fullstack Javascript developer",
      url: "https://my-resume-ten-delta.vercel.app/",
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
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const { children } = props;
  const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang}>
      <body className={`${nunitoSans.variable} ${PTSans.variable} container`}>
        <Header dict={dictionary}/>
        <main>{children}</main>
        <Footer dict={dictionary}/>
      </body>
    </html>
  );
}
