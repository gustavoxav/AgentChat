"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Divider,
  Alert,
  Chip,
} from "@mui/material";
import { KeyboardArrowUp, Send, Help } from "@mui/icons-material";
import { useKey } from "@/contexts/key-context";

type MessageType = "TELL" | "ASKONE" | "ACHIEVE" | "TELLHOW" | "ASKALL";

interface ChatInputProps {
  onSendMessage: (message: string, type: MessageType) => void;
  initialChatState: {
    force: MessageType | null;
    message: string | null;
  } | null;
}

export function ChatInput({
  onSendMessage,
  initialChatState,
}: Readonly<ChatInputProps>) {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("TELL");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const { connectionData } = useKey();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, messageType);
      setMessage("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const selectMessageType = (type: MessageType) => {
    setMessageType(type);
    handleCloseMenu();
  };

  const handleInputClick = () => {
    setHelpModalOpen(true);
  };

  const handleCloseHelpModal = () => {
    setHelpModalOpen(false);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const getMessageTypeLabel = (type: MessageType) => {
    switch (type) {
      case "TELL":
        return "TELL";
      case "ASKONE":
        return "ASK ONE";
      case "ASKALL":
        return "ASK ALL";
      case "ACHIEVE":
        return "ACHIEVE";
      case "TELLHOW":
        return "TELL HOW";
      default:
        return "TELL";
    }
  };

  const getExampleMessage = (type: MessageType) => {
    const userUuid = connectionData?.userUuid || "{uuid_user}";
    const agentUuid = connectionData?.agentUuid || "{uuid_agente}";
    const messageId = `mid${Math.floor(Math.random() * 1000)}`;

    switch (type) {
      case "TELL":
        return `<${messageId},${userUuid},tell,${agentUuid},{conteúdo_msg}>`;
      case "ASKONE":
        return `<${messageId},${userUuid},askOne,${agentUuid},{conteúdo_msg}>`;
      case "ASKALL":
        return `<${messageId},${userUuid},askAll,${agentUuid},{conteúdo_msg}>`;
      case "ACHIEVE":
        return `<${messageId},${userUuid},achieve,${agentUuid},{conteúdo_msg}>`;
      case "TELLHOW":
        return `<${messageId},${userUuid},tellHow,${agentUuid},{conteúdo_msg}>`;
      default:
        return `<${messageId},${userUuid},tell,${agentUuid},{conteúdo_msg}>`;
    }
  };

  const getTypeDescription = (type: MessageType) => {
    switch (type) {
      case "TELL":
        return "Informa algo ao agente (declaração)";
      case "ASKONE":
        return "Faz uma pergunta esperando uma resposta";
      case "ASKALL":
        return "Faz uma pergunta esperando todas as respostas registradas";
      case "ACHIEVE":
        return "Solicita que o agente execute uma ação";
      case "TELLHOW":
        return "Informa ao agente como fazer algo (procedimento)";
      default:
        return "Informa algo ao agente";
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
    if (initialChatState) {
      setMessageType(initialChatState.force || "TELL");
      setMessage(initialChatState.message || "");
    }
  }, [initialChatState]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "800px",
          mx: "auto",
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? "#f5f5f5" : "#333",
          borderRadius: "8px",
          boxShadow: 3,
          border: (theme) =>
            `1px solid ${theme.palette.mode === "light" ? "#e0e0e0" : "#555"}`,
        }}>
        {/* Força dropdown */}
        <Box>
          <Box
            onClick={handleOpenMenu}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              height: "50px",
              px: 2,
              py: 1.5,
              borderRadius: "7px 0 0 7px",
              border: 0,
              cursor: "pointer",
              "&:hover": {
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? "#e0e0e0" : "#444",
              },
              transition: "background-color 0.2s",
            }}>
            <Typography
              variant="body2"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light" ? "#555" : "#ccc",
              }}>
              {messageType}
            </Typography>
            <KeyboardArrowUp
              fontSize="small"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light" ? "#777" : "#aaa",
              }}
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
            }}>
            <MenuItem
              onClick={() => selectMessageType("TELL")}
              selected={messageType === "TELL"}>
              TELL
            </MenuItem>
            <MenuItem
              onClick={() => selectMessageType("ASKONE")}
              selected={messageType === "ASKONE"}>
              ASKONE
            </MenuItem>
            <MenuItem
              onClick={() => selectMessageType("ASKALL")}
              selected={messageType === "ASKALL"}>
              ASKALL
            </MenuItem>
            <MenuItem
              onClick={() => selectMessageType("ACHIEVE")}
              selected={messageType === "ACHIEVE"}>
              ACHIEVE
            </MenuItem>
            <MenuItem
              onClick={() => selectMessageType("TELLHOW")}
              selected={messageType === "TELLHOW"}>
              TELLHOW
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
          onClick={handleInputClick}
          sx={{
            p: 1.5,
            color: (theme) =>
              theme.palette.mode === "light" ? "#555" : "#ccc",
            "&:hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? "#e0e0e0" : "#444",
            },
          }}>
          <Help />
        </IconButton>
        <IconButton
          onClick={handleSend}
          disabled={!message.trim()}
          sx={{
            p: 1.5,
            borderRadius: "0 7px 7px 0",
            height: "50px",
            color: (theme) =>
              theme.palette.mode === "light" ? "#555" : "#ccc",
            "&:hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? "#e0e0e0" : "#444",
            },
          }}>
          <Send />
        </IconButton>
      </Box>

      <Dialog
        open={helpModalOpen}
        onClose={handleCloseHelpModal}
        fullWidth
        maxWidth="md"
        disablePortal={false}
        keepMounted={false}
        PaperProps={{
          sx: {
            borderRadius: "8px",
            maxHeight: "80vh",
          },
        }}>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Help color="primary" />
            <Typography variant="h6" fontWeight="bold" component="div">
              Como usar o Chat
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Introdução */}
            <Alert severity="info" sx={{ borderRadius: "8px" }}>
              <Typography variant="body2">
                <strong>Você só precisa digitar o conteúdo da mensagem!</strong>
                <br />A aplicação automaticamente formata a mensagem completa
                com seus dados de conexão.
              </Typography>
            </Alert>

            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Tipos de Mensagem
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {(
                  [
                    "TELL",
                    "ASKONE",
                    "ASKALL",
                    "ACHIEVE",
                    "TELLHOW",
                  ] as MessageType[]
                ).map((type) => (
                  <Box
                    key={type}
                    sx={{
                      p: 2,
                      bgcolor: "background.paper",
                      borderRadius: "8px",
                      border: "1px solid",
                      borderColor: "divider",
                    }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}>
                      <Chip
                        label={getMessageTypeLabel(type)}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Typography variant="body2" color="text.secondary">
                        {getTypeDescription(type)}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "monospace",
                        bgcolor:
                          theme.palette.mode === "light"
                            ? "grey.100"
                            : "grey.800",
                        p: 1,
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        wordBreak: "break-all",
                      }}>
                      {getExampleMessage(type)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Divider />

            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                💡 Exemplos Práticos
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "success.50",
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: "success.200",
                  }}>
                  <Typography
                    variant="subtitle2"
                    color="success.main"
                    gutterBottom>
                    ✅ Você digita apenas:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "monospace", mb: 1 }}>
                    {"executarAcao(A)"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    A aplicação envia automaticamente a mensagem completa
                    formatada
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    bgcolor: "error.50",
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: "error.200",
                  }}>
                  <Typography
                    variant="subtitle2"
                    color="error.main"
                    gutterBottom>
                    ❌ Não é necessário digitar:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "0.75rem",
                      wordBreak: "break-all",
                    }}>
                    {getExampleMessage("ASKONE").replace(
                      "{conteúdo_msg}",
                      "executarAcao(A)"
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Dicas */}
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                🎯 Dicas de Uso
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <span>•</span>
                  <span>Escolha o tipo de mensagem no dropdown à esquerda</span>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <span>•</span>
                  <span>Digite apenas o conteúdo da sua mensagem</span>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <span>•</span>
                  <span>Use TELL para informar algo ao agente</span>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <span>•</span>
                  <span>Use ASK ONE/ALL para fazer perguntas</span>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <span>•</span>
                  <span>Use ACHIEVE para solicitar ações</span>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <span>•</span>
                  <span>Use TELLHOW para ensinar ações ao agente</span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseHelpModal}
            variant="contained"
            sx={{ borderRadius: "4px" }}>
            Entendi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
