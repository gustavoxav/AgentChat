"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { setCookie, getCookie, deleteCookie } from "cookies-next"

interface KeyContextType {
  agentKey: string | null
  setAgentKey: (key: string) => Promise<void>
  clearAgentKey: () => void
}

const KeyContext = createContext<KeyContextType | undefined>(undefined)

export function KeyProvider({ children }: { children: ReactNode }) {
  const [agentKey, setAgentKeyState] = useState<string | null>(null)

  useEffect(() => {
    const storedKey = getCookie("agent-key")
    if (storedKey) {
      setAgentKeyState(storedKey.toString())
    }
  }, [])

  const setAgentKey = async (key: string) => {
    setCookie("agent-key", key, { maxAge: 60 * 60 * 24 * 7 })
  }

  const clearAgentKey = () => {
    deleteCookie("agent-key")
    setAgentKeyState(null)
  }

  return <KeyContext.Provider value={{ agentKey, setAgentKey, clearAgentKey }}>{children}</KeyContext.Provider>
}

export function useKey() {
  const context = useContext(KeyContext)
  if (context === undefined) {
    throw new Error("useKey must be used within a KeyProvider")
  }
  return context
}
