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

type MessageType = "TELL" | "ASKONE" | "ACHIEVE" | "TELLHOW" | "ASKALL";
type Message = {
  id: string;
  content: string;
  sender: "user" | "agent";
  type?: MessageType;
  timestamp: Date;
};

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
  const [messageCounter, setMessageCounter] = useState(1);
  const { connectionData, clearConnectionData } = useKey();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws");
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("Conectado ao WebSocket");
      if (connectionData) {
        ws.send(
          JSON.stringify({
            gatewayIP: connectionData.contextNetIp,
            gatewayPort: Number(connectionData.contextNetPort),
            myUUID: connectionData.userUuid,
            destinationUUID: connectionData.agentUuid,
          })
        );
      }
    };

    ws.onclose = () => {
      console.log("WebSocket fechado");
    };

    ws.onmessage = (event) => {
      console.log("Mensagem recebida do servidor:", event.data);
      const newMessage = {
        id: Date.now().toString(),
        content: event.data,
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage as Message]);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [connectionData]);

  type MessageType = "TELL" | "ASKONE" | "ACHIEVE" | "TELLHOW" | "ASKALL";

  const messageTypeSender: Record<MessageType, string> = {
    TELL: "tell",
    ASKONE: "askOne",
    ACHIEVE: "achieve",
    TELLHOW: "tellHow",
    ASKALL: "askAll",
  };

  const handleSendMessage = (message: string, type: MessageType) => {
    console.log("Message enviado:", message, "Tipo:", type);
    if (!message.trim() || !socketRef.current) return;

    const messageFormatter = `<mid${messageCounter},${connectionData?.userUuid},${messageTypeSender[type]},${connectionData?.agentUuid},${message}>`;
    console.log("Mensagem formatada:", messageFormatter);
    socketRef.current.send(messageFormatter);

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      type: type,
      timestamp: new Date(),
    };

    setMessageCounter((prev) => prev + 1);
    setMessages((prev) => [...prev, newMessage]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    clearConnectionData();
    router.push("/");
    showSnackbar("Sessão encerrada", "info");
  };

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
              Dados da conexão
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: { xs: 2, md: 3 },
          pt: 2,
          pb: 8,
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
      <Footer />
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <AgentData connectionData={connectionData} />
        </Box>
      </Drawer>
    </Box>
  );
}
