import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { KeyProvider } from "@/contexts/key-context"
import { SnackbarProvider } from "@/components/snackbar-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ContextNet - Comunicação Humano-Agente",
  description: "Aplicação para facilitar a comunicação entre humano e agente por meio do ContextNet",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <SnackbarProvider>
            <KeyProvider>{children}</KeyProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
