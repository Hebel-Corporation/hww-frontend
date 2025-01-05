import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from 'sonner';

 
export const metadata: Metadata = {
  title: 'Health Winning World',
  description: "Health Winning World est une entreprise de marketing de réseau crée en 2023 par une association des médecins malaisiens, chinois, thailandais oeuvrant dans la recherche sur le traitement et prise en charge des pathologies chroniques.",
}


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${GeistSans.className} min-h-[calc(100vh)] `}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster position="top-right" richColors  />
        </ThemeProvider>
      </body>
    </html>
  );
}
