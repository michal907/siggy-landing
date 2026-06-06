import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { AnnotationEditor } from "./_components/AnnotationEditor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siggy · Email signatures, finally serious.",
  description:
    "Pick a template, paste once. A signature that looks the same in Gmail, Outlook, Apple Mail, Proton, and Thunderbird. Free forever for individuals.",
  keywords: [
    "email signature",
    "email signature generator",
    "email signature templates",
    "Gmail signature",
    "Outlook signature",
    "Apple Mail signature",
    "HTML email signature",
    "professional email signature",
  ],
  metadataBase: new URL("https://siggy.app"),
  openGraph: {
    title: "Siggy · Email signatures, finally serious.",
    description:
      "A signature that looks the same in every inbox. 30+ templates. Free forever for individuals.",
    url: "/",
    siteName: "Siggy",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siggy · Email signatures, finally serious.",
    description:
      "A signature that looks the same in every inbox. 30+ templates. Free forever for individuals.",
    images: ["/og-default.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <AnnotationEditor />
      </body>
    </html>
  );
}
