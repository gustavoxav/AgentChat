"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type Locale = "pt" | "en"

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const router = useRouter()
  const pathname = usePathname()

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)

    // Salvar preferência no localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-locale", newLocale)
    }

    // Atualizar a URL com o novo locale
    const currentPath = pathname.replace(/^\/(pt|en)/, "")
    router.push(`/${newLocale}${currentPath}`)
  }

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}
