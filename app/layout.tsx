import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daha Stampart",
  description:
    "Daha Stampart web portal",
  openGraph: {
    title: "Daha Stampart",
    description:
      "Desain bukan hanya tentang estetika, tapi tentang pesan yang menyampaikan gagasan.",
    url: "https://daha-stampart.vercel.app",
    siteName: "Daha Stampart",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
