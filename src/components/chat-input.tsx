"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Box, TextField, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { KeyboardArrowUp, Send } from "@mui/icons-material"

type MessageType = "TELL" | "ASK" | "ACHIEVE"

interface ChatInputProps {
  readonly onSendMessage: (message: string, type: MessageType) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<MessageType>("TELL")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, messageType)
      setMessage("")
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const selectMessageType = (type: MessageType) => {
    setMessageType(type)
    handleCloseMenu()
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "800px",
        mx: "auto",
        bgcolor: (theme) => (theme.palette.mode === "light" ? "#f5f5f5" : "#333"),
        borderRadius: "9999px",
        boxShadow: 3,
        border: (theme) => `1px solid ${theme.palette.mode === "light" ? "#e0e0e0" : "#555"}`,
      }}
    >
      <Box>
        <Box
          onClick={handleOpenMenu}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            px: 2,
            py: 1.5,
            cursor: "pointer",
            borderRadius: "9999px 0 0 9999px",
            "&:hover": {
              bgcolor: (theme) => (theme.palette.mode === "light" ? "#e0e0e0" : "#444"),
            },
            transition: "background-color 0.2s",
          }}
        >
          <Typography variant="body2" sx={{ color: (theme) => (theme.palette.mode === "light" ? "#555" : "#ccc") }}>
            {messageType}
          </Typography>
          <KeyboardArrowUp
            fontSize="small"
            sx={{ color: (theme) => (theme.palette.mode === "light" ? "#777" : "#aaa") }}
          />
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={() => selectMessageType("TELL")} selected={messageType === "TELL"}>
            TELL
          </MenuItem>
          <MenuItem onClick={() => selectMessageType("ASK")} selected={messageType === "ASK"}>
            ASK
          </MenuItem>
          <MenuItem onClick={() => selectMessageType("ACHIEVE")} selected={messageType === "ACHIEVE"}>
            ACHIEVE
          </MenuItem>
        </Menu>
      </Box>

      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite aqui seu código KQML"
        variant="standard"
        inputRef={inputRef}
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          mx: 1,
          "& .MuiInputBase-input": {
            py: 1.5,
            px: 1,
          },
        }}
      />

      <IconButton
        onClick={handleSend}
        disabled={!message.trim()}
        sx={{
          p: 1.5,
          borderRadius: "0 9999px 9999px 0",
          color: (theme) => (theme.palette.mode === "light" ? "#555" : "#ccc"),
          "&:hover": {
            bgcolor: (theme) => (theme.palette.mode === "light" ? "#e0e0e0" : "#444"),
          },
        }}
      >
        <Send />
      </IconButton>
    </Box>
  )
}
