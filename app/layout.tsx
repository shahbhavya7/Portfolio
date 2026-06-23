import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Nav } from "@/components/ui";

export const metadata: Metadata = {
  title: "Bhavya Shah — AI Engineer",
  description:
    "Portfolio of Bhavya Shah — AI Engineer specializing in machine learning, deep learning, and intelligent systems.",
  openGraph: {
    title: "Bhavya Shah — AI Engineer",
    description:
      "Portfolio of Bhavya Shah — AI Engineer specializing in machine learning, deep learning, and intelligent systems.",
    type: "website",
    locale: "en_US",
    siteName: "Bhavya Shah Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhavya Shah — AI Engineer",
    description:
      "Portfolio of Bhavya Shah — AI Engineer specializing in machine learning, deep learning, and intelligent systems.",
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
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
