import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { KeyProvider } from "@/contexts/key-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ContextNet - Comunicação Humano-Agente",
  description: "Aplicação para facilitar a comunicação entre humano e agente por meio do ContextNet",
    generator: 'v0.dev'
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
          <KeyProvider>{children}</KeyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
