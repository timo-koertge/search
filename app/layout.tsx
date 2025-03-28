import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import { Dot } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tke.gg - Search",
  description: "Search the web with DuckDuckGo bangs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
      <footer className="absolute bottom-0 left-0 w-[100vw] pb-2 flex flex-row items-center justify-center text-muted-foreground">
        <Link href={'https://tke.gg'} className="hover:text-accent-foreground transition duration-200">tke.gg</Link>
        <Dot />
        <Link href={'https://github.com/timo-koertge/search'} className="hover:text-accent-foreground transition duration-200">GitHub</Link>
      </footer>
    </html>
  );
}
