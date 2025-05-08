"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Box,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material"
import { KeyboardArrowUp, Send, Add } from "@mui/icons-material"

type MessageType = "TELL" | "ASK" | "ACHIEVE"

interface ChatInputProps {
  onSendMessage: (message: string, type: MessageType) => void
}

// Lista de ações pré-definidas para exemplo
const ACOES_PREDEFINIDAS = [
  "TELL (agent-identifier :name agent) (TEMPERATURA)",
  "ASK (agent-identifier :name agent) (TEMPERATURA)",
  "ACHIEVE (agent-identifier :name agent) (LIGAR)",
  "TELL (agent-identifier :name agent) (DESLIGAR)",
  "ASK (agent-identifier :name agent) (STATUS)",
  "ACHIEVE (agent-identifier :name agent) (MODO ECONOMIA)",
  "TELL (agent-identifier :name agent) (PROGRAMAR 18:00)",
  "ASK (agent-identifier :name agent) (CONSUMO)",
]

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<MessageType>("TELL")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const theme = useTheme()

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

  const handleInputClick = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    // Manter o foco no input após fechar o modal
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const handleSelectAction = (action: string) => {
    // Extrair a força (TELL, ASK, ACHIEVE) e o conteúdo da mensagem
    const parts = action.trim().split(/\s+(.*)/)

    if (parts.length >= 2) {
      const forceType = parts[0] as MessageType
      const messageContent = parts[1]

      // Verificar se a força é válida
      if (forceType === "TELL" || forceType === "ASK" || forceType === "ACHIEVE") {
        // Atualizar o tipo de mensagem no dropdown
        setMessageType(forceType)

        // Preencher apenas o conteúdo da mensagem no input (sem a força)
        setMessage(messageContent)
      } else {
        // Se a força não for válida, manter o comportamento original
        setMessage(action)
      }
    } else {
      // Se não conseguir separar, manter o comportamento original
      setMessage(action)
    }

    setModalOpen(false)

    // Manter o foco no input após selecionar uma ação
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const handleCreateNew = () => {
    setModalOpen(false)
    setMessage("")
    // Manter o foco no input após criar novo
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  // Efeito para focar no input quando o componente é montado
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "800px",
          mx: "auto",
          bgcolor: (theme) => (theme.palette.mode === "light" ? "#f5f5f5" : "#333"),
          borderRadius: "8px",
          boxShadow: 3,
          border: (theme) => `1px solid ${theme.palette.mode === "light" ? "#e0e0e0" : "#555"}`,
        }}
      >
        {/* Força dropdown */}
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
              borderRadius: "8px 0 0 8px",
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

        {/* Input field */}
        <TextField
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onClick={handleInputClick}
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

        {/* Send button */}
        <IconButton
          onClick={handleSend}
          disabled={!message.trim()}
          sx={{
            p: 1.5,
            borderRadius: "0 8px 8px 0",
            color: (theme) => (theme.palette.mode === "light" ? "#555" : "#ccc"),
            "&:hover": {
              bgcolor: (theme) => (theme.palette.mode === "light" ? "#e0e0e0" : "#444"),
            },
          }}
        >
          <Send />
        </IconButton>
      </Box>

      {/* Modal de Ações */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold" component="div">
            Ações
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <List sx={{ pt: 0 }}>
            {ACOES_PREDEFINIDAS.map((acao, index) => (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleSelectAction(acao)}
                    sx={{
                      borderRadius: "4px",
                      mb: 0.5,
                      "&:hover": {
                        bgcolor:
                          theme.palette.mode === "light" ? "rgba(25, 118, 210, 0.08)" : "rgba(144, 202, 249, 0.08)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={acao}
                      primaryTypographyProps={{
                        sx: {
                          fontFamily: "monospace",
                          fontSize: "0.9rem",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                {index < ACOES_PREDEFINIDAS.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button onClick={handleCloseModal} variant="outlined" sx={{ borderRadius: "4px" }}>
            Cancelar
          </Button>
          <Button onClick={handleCreateNew} variant="contained" startIcon={<Add />} sx={{ borderRadius: "4px" }}>
            Criar Novo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
