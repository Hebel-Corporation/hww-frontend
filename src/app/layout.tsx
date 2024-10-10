import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${GeistSans.className} `}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <NextUIProvider>
          {children}
          <Toaster position="top-right" richColors  />
        </NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
