import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Nav } from "@/components/ui";
import Loader from "@/components/ui/Loader";
import dynamic from "next/dynamic";

const CursorDot = dynamic(() => import("@/components/ui/CursorDot"), { ssr: false });
const BackToTop = dynamic(() => import("@/components/ui/BackToTop"), { ssr: false });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Bhavya Shah · Neural Gravity",
  description: "Third-year AI & Data Science student at MIT-WPU. Building production GenAI systems — RAG pipelines, multi-agent architectures, and LLM evaluation frameworks.",
  keywords: [
    "Bhavya Shah", "AI Engineer", "GenAI", "RAG", 
    "LLM", "NLP", "Machine Learning", "MIT-WPU",
    "LangChain", "Next.js", "Portfolio"
  ],
  authors: [{ name: "Bhavya Shah" }],
  openGraph: {
    title: "Bhavya Shah · Neural Gravity",
    description: "Building intelligent systems at the intersection of language, reasoning, and scale.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhavya Shah · Neural Gravity",
    description: "Building intelligent systems at the intersection of language, reasoning, and scale.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-inter antialiased">
        <Loader />
        <CursorDot />
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
        <BackToTop />
      </body>
    </html>
  );
}
