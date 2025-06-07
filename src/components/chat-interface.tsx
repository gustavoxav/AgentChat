"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Drawer,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useKey } from "@/contexts/key-context";
import { useRouter } from "next/navigation";
import { MessageBubble } from "@/components/message-bubble";
import { AgentData } from "@/components/agent-data";
import { ArrowBack, Info } from "@mui/icons-material";
import { ModeToggle } from "@/components/mode-toggle";
import { ChatInput } from "@/components/chat-input";
import { Footer } from "@/components/footer";
import { useSnackbar } from "@/components/snackbar-provider";
import SockJS from "sockjs-client";
import { Client, over } from "stompjs";

type MessageType = "TELL" | "ASK" | "ACHIEVE";
type Message = {
  id: string;
  content: string;
  sender: "user" | "agent";
  type?: MessageType;
  timestamp: Date;
};

let stompClient: Client | null = null;

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Como posso ajudar você hoje?",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { clearAgentKey } = useKey();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();

  // Exemplo de dados do agente
  const agentData = [
    "ID: agent-123456",
    "Tipo: Assistente Virtual",
    "Status: Online",
    "Última atualização: 02/05/2024",
    "Capacidades: KQML, Processamento de Linguagem Natural",
    "Versão: 1.0.3",
  ];

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = over(socket);

    stompClient.connect({}, () => {
      console.log("Conectado ao WebSocket");

      stompClient?.subscribe("/topic/messages", (message) => {
        if (message.body) {
          console.log("MESSAGE BODY: ", message.body);
        }
      });
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (message: string, type: MessageType) => {
    if (!message.trim() || !stompClient) return;
    stompClient.send("/app/send", {}, JSON.stringify(message));
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      type: type,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    showSnackbar("Mensagem enviada", "success");

    // Simular resposta do agente após 1 segundo
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Resposta para sua mensagem "${message}" do tipo ${type}`,
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentResponse]);
    }, 1000);
  };

  const handleLogout = () => {
    clearAgentKey();
    router.push("/");
    showSnackbar("Sessão encerrada", "info");
  };

  // Definindo gradientes diretamente no componente
  const headerGradient = {
    background:
      theme.palette.mode === "light"
        ? "linear-gradient(to right, #0d47a1, #1976d2)"
        : "linear-gradient(to right, #0d2b4d, #1565c0)",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}>
      {/* Header */}
      <AppBar position="static" sx={headerGradient} elevation={2}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleLogout}>
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ ml: 1, fontWeight: "bold", flexGrow: 1 }}>
            Chat SMA
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ModeToggle />
            <Button
              variant="outlined"
              onClick={() => setDrawerOpen(true)}
              startIcon={<Info />}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                borderColor: "transparent",
                "&:hover": {
                  bgcolor: "primary.dark",
                  borderColor: "transparent",
                },
                borderRadius: "4px",
              }}>
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
        }}>
        <Box
          sx={{
            maxWidth: "800px",
            mx: "auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </Box>
      </Box>

      {/* Floating Input Area */}
      <Box
        sx={{
          position: "fixed",
          bottom: 64,
          left: 0,
          right: 0,
          px: { xs: 2, md: 4 },
        }}>
        <ChatInput onSendMessage={handleSendMessage} />
      </Box>

      {/* Footer */}
      <Footer />

      {/* Agent Data Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Dados do Agente
          </Typography>
          <AgentData data={agentData} />
        </Box>
      </Drawer>
    </Box>
  );
}
