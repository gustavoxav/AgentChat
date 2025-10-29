"use client";

import React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Alert,
  Chip,
  useTheme,
} from "@mui/material";
import { Help } from "@mui/icons-material";
import { useKey } from "@/contexts/key-context";
import { useTranslations } from "next-intl";
type MessageType = "TELL" | "ASKONE" | "ACHIEVE" | "TELLHOW" | "ASKALL";

export function HelperDialog(
  helpModalOpen: boolean,
  handleCloseHelpModal: () => void
) {
  const theme = useTheme();
  const { connectionData } = useKey();
  const t = useTranslations("helper");

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
        return `<${messageId},${userUuid},tell,${agentUuid},{${t(
          "contentPlaceholder"
        )}}>`;
      case "ASKONE":
        return `<${messageId},${userUuid},askOne,${agentUuid},{${t(
          "contentPlaceholder"
        )}}>`;
      case "ASKALL":
        return `<${messageId},${userUuid},askAll,${agentUuid},{${t(
          "contentPlaceholder"
        )}}>`;
      case "ACHIEVE":
        return `<${messageId},${userUuid},achieve,${agentUuid},{${t(
          "contentPlaceholder"
        )}}>`;
      case "TELLHOW":
        return `<${messageId},${userUuid},tellHow,${agentUuid},{${t(
          "contentPlaceholder"
        )}}>`;
    }
  };

  const getTypeDescription = (type: MessageType) => {
    switch (type) {
      case "TELL":
        return t("descriptions.tell");
      case "ASKONE":
        return t("descriptions.askOne");
      case "ASKALL":
        return t("descriptions.askAll");
      case "ACHIEVE":
        return t("descriptions.achieve");
      case "TELLHOW":
        return t("descriptions.tellHow");
      default:
        return t("descriptions.tell");
    }
  };

  return (
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
            {t("title")}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Introdução */}
          <Alert severity="info" sx={{ borderRadius: "8px" }}>
            <Typography variant="body2">
              <strong>{t("info.strong")}</strong>
              <br />
              {t("info.text")}
            </Typography>
          </Alert>

          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {t("typesTitle")}
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
              💡 {t("examples.title")}
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
                  ✅ {t("examples.youType")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "monospace", mb: 1 }}>
                  {"executarAcao(A)"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t("examples.autoFormat")}
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
                <Typography variant="subtitle2" color="error.main" gutterBottom>
                  ❌ {t("examples.dontType")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                    wordBreak: "break-all",
                  }}>
                  {getExampleMessage("ASKONE").replace(
                    `{${t("contentPlaceholder")}}`,
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
              🎯 {t("tips.title")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <span>•</span>
                <span>{t("tips.list.first")}</span>
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <span>•</span>
                <span>{t("tips.list.second")}</span>
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <span>•</span>
                <span>{t("tips.list.third")}</span>
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <span>•</span>
                <span>{t("tips.list.fourth")}</span>
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <span>•</span>
                <span>{t("tips.list.fifth")}</span>
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <span>•</span>
                <span>{t("tips.list.sixth")}</span>
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
          {t("understood")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
