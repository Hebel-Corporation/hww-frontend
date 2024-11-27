"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from "next/navigation";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {

  const router = useRouter();

  return <NextThemesProvider {...props}>
    <NextUIProvider navigate={router.push}>
      {children}
    </NextUIProvider>
  </NextThemesProvider>;
}
