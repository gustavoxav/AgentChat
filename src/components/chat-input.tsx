"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { KeyboardArrowUp, Send, Help } from "@mui/icons-material";
import { HelperDialog } from "./helper-dialog";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("chatInput");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("TELL");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
          placeholder={t("placeholderKqml")}
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
      {HelperDialog(helpModalOpen, handleCloseHelpModal)}
    </>
  );
}
