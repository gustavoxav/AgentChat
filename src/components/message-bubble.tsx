"use client"

import { Box, Typography } from "@mui/material"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { SmartToy, Person } from "@mui/icons-material"

type MessageType = "TELL" | "ASKONE" | "ACHIEVE"| "TELLHOW" | "ASKALL"
type Message = {
  id: string
  content: string
  sender: "user" | "agent"
  type?: MessageType
  timestamp: Date
}

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user"

  return (
    <Box sx={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", maxWidth: "80%", gap: 1 }}>
        {!isUser && (
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: (theme) => (theme.palette.mode === "light" ? "primary.50" : "primary.900"),
              flexShrink: 0,
            }}
          >
            <SmartToy
              fontSize="small"
              sx={{ color: (theme) => (theme.palette.mode === "light" ? "primary.main" : "primary.light") }}
            />
          </Box>
        )}

        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            ...(isUser
              ? {
                  bgcolor: "primary.main",
                  color: "white",
                  borderBottomRightRadius: 0,
                }
              : {
                  bgcolor: (theme) => (theme.palette.mode === "light" ? "grey.200" : "grey.800"),
                  color: "text.primary",
                  borderBottomLeftRadius: 0,
                }),
          }}
        >
          {message.type && (
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
                display: "block",
                mb: 0.5,
                color: isUser ? "primary.100" : "text.secondary",
              }}
            >
              {message.type}
            </Typography>
          )}

          <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
            {message.content}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 0.5,
              textAlign: "right",
              color: isUser ? "primary.100" : "text.secondary",
            }}
          >
            {format(message.timestamp, "HH:mm", { locale: ptBR })}
          </Typography>
        </Box>

        {isUser && (
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "primary.main",
              flexShrink: 0,
            }}
          >
            <Person fontSize="small" sx={{ color: "white" }} />
          </Box>
        )}
      </Box>
    </Box>
  )
}
