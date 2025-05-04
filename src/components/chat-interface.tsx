"use client"

import { useState, useRef, useEffect } from "react"
import { Box, Button, Drawer, Typography, IconButton, AppBar, Toolbar } from "@mui/material"
import { useKey } from "@/contexts/key-context"
import { useRouter } from "next/navigation"
import { MessageBubble } from "@/components/message-bubble"
import { AgentData } from "@/components/agent-data"
import { ArrowBack } from "@mui/icons-material"
import { ModeToggle } from "@/components/mode-toggle"
import { ChatInput } from "@/components/chat-input"
import { Footer } from "@/components/footer"

type MessageType = "TELL" | "ASK" | "ACHIEVE"
type Message = {
  id: string
  content: string
  sender: "user" | "agent"
  type?: MessageType
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Como posso ajudar você hoje?",
      sender: "agent",
      timestamp: new Date(),
    },
  ])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { clearAgentKey } = useKey()
  const router = useRouter()

  // Exemplo de dados do agente
  const agentData = [
    "ID: agent-123456",
    "Tipo: Assistente Virtual",
    "Status: Online",
    "Última atualização: 02/05/2024",
    "Capacidades: KQML, Processamento de Linguagem Natural",
    "Versão: 1.0.3",
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (message: string, type: MessageType) => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      type: type,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])

    // Simular resposta do agente após 1 segundo
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Resposta para sua mensagem "${message}" do tipo ${type}`,
        sender: "agent",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentResponse])
    }, 1000)
  }

  const handleLogout = () => {
    clearAgentKey()
    router.push("/")
  }

  const headerGradient = {
    background: "linear-gradient(to right, var(--gradient-header-start), var(--gradient-header-end))",
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%" }}>
      {/* Header */}
      <AppBar position="static" sx={headerGradient} elevation={2}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleLogout}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold", flexGrow: 1 }}>
            Chat SMA
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ModeToggle />
            <Button
              variant="outlined"
              onClick={() => setDrawerOpen(true)}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                borderColor: "transparent",
                "&:hover": { bgcolor: "primary.dark", borderColor: "transparent" },
              }}
            >
              Dados do Agente
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: { xs: 2, md: 3 },
          pb: 14,
        }}
      >
        <Box sx={{ maxWidth: "800px", mx: "auto", width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </Box>
      </Box>

      {/* Floating Input Area */}
      <Box sx={{ position: "fixed", bottom: 64, left: 0, right: 0, px: { xs: 2, md: 4 } }}>
        <ChatInput onSendMessage={handleSendMessage} />
      </Box>

      {/* Footer */}
      <Footer />

      {/* Agent Data Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Dados do Agente
          </Typography>
          <AgentData data={agentData} />
        </Box>
      </Drawer>
    </Box>
  )
}
