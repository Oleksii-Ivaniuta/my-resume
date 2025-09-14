import type { Metadata } from "next";
import { Nunito_Sans, PT_Sans } from "next/font/google";
import "./globals.css";
import "modern-normalize";

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

export const metadata: Metadata = {
  title: "Oleksii Ivaniuta - fullstack developer",
  description: "Website-resume of the fullstack Javascript developer",
   icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Oleksii Ivaniuta - fullstack developer",
    description: "Website-resume of the fullstack Javascript developer",
    url: "https://google.com",
    siteName: 'Oleksii Ivaniuta',
    images: [
      {
        url: '/oleksii-photo.webp',
        width: 1200,
        height: 630,
        alt: "Oleksii Ivaniuta",
      },
    ],
    type: 'article',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} ${PTSans.variable}`}>
        <main className="container">
        {children}
        </main>
      </body>
    </html>
  );
}
