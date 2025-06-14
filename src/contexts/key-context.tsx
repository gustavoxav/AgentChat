"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { setCookie, getCookie, deleteCookie } from "cookies-next"

interface ConnectionData {
  contextNetIp: string
  contextNetPort: string
  agentUuid: string
  userUuid: string
}

interface KeyContextType {
  connectionData: ConnectionData | null
  setConnectionData: (data: ConnectionData) => Promise<void>
  clearConnectionData: () => void
}

const KeyContext = createContext<KeyContextType | undefined>(undefined)

const COOKIE_NAME = "connection-data"

export function KeyProvider({ children }: { children: ReactNode }) {
  const [connectionData, setConnectionDataState] = useState<ConnectionData | null>(null)

  useEffect(() => {
    // Carregar os dados dos cookies ao inicializar
    const storedData = getCookie(COOKIE_NAME)
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData.toString())
        setConnectionDataState(parsedData)
      } catch (error) {
        console.error("Erro ao analisar dados de conexão:", error)
        deleteCookie(COOKIE_NAME)
      }
    }
  }, [])

  const setConnectionData = async (data: ConnectionData) => {
    // Salvar os dados nos cookies
    setCookie(COOKIE_NAME, JSON.stringify(data), { maxAge: 60 * 60 * 24 * 7 }) // 7 dias
    setConnectionDataState(data)
  }

  const clearConnectionData = () => {
    deleteCookie(COOKIE_NAME)
    setConnectionDataState(null)
  }

  return (
    <KeyContext.Provider value={{ connectionData, setConnectionData, clearConnectionData }}>
      {children}
    </KeyContext.Provider>
  )
}

export function useKey() {
  const context = useContext(KeyContext)
  if (context === undefined) {
    throw new Error("useKey must be used within a KeyProvider")
  }
  return context
}
