import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Nav } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  // TODO:
  metadataBase: new URL("https://henriqueluhm.dev"),

  title: {
    default: "Henrique Luhm",
    template: "%s · Henrique Luhm",
  },

  description:
    "Full-stack developer based in Brazil with 5+ years of experience in React, Node.js, AWS, and a strong interest in Rust and Go.",

  keywords: [
    "Henrique Luhm",
    "Full-stack developer",
    "React",
    "Next.js",
    "Node.js",
    "AWS",
    "Rust",
    "Go",
    "Software Engineer",
  ],

  authors: [{ name: "Henrique Luhm" }],
  creator: "Henrique Luhm",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",

    // TODO:
    url: "https://henriqueluhm.dev",
    title: "Henrique Luhm",
    description:
      "Full-stack developer with 5+ years of experience building web applications using React, Node.js, and AWS.",
    siteName: "Henrique Luhm",

    // TODO:
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Henrique Luhm – Full-stack developer",
      },
    ],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider>
            <Nav />

            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
