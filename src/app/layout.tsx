import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { KeyProvider } from "@/contexts/key-context";
import { SnackbarProvider } from "@/components/snackbar-provider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ContextNet - Comunicação Humano-Agente",
  description:
    "Aplicação para facilitar a comunicação entre humano e agente por meio do ContextNet",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <SnackbarProvider>
              <KeyProvider>{children}</KeyProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
