"use client";

import { List, ListItem, Typography, Box } from "@mui/material";
import { useTranslations } from "next-intl";

interface ConnectionData {
  contextNetIp: string;
  contextNetPort: string;
  agentUuid: string;
  userUuid: string;
}

interface AgentDataProps {
  connectionData: ConnectionData | null;
}

export function AgentData({ connectionData }: Readonly<AgentDataProps>) {
  const t = useTranslations("landing");

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
        {t("titleOptions")}
      </Typography>
      <List sx={{ mb: 3 }}>
        <ListItem
          sx={{
            p: 1.5,
            mb: 1,
            borderRadius: 1,
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "grey.100" : "grey.800",
            border: (theme) =>
              `1px solid ${
                theme.palette.mode === "light" ? "grey.200" : "grey.700"
              }`,
          }}>
          <Typography variant="body2">
            <strong>{t("network.ipComplete")}:</strong> {connectionData?.contextNetIp}
          </Typography>
        </ListItem>
        <ListItem
          sx={{
            p: 1.5,
            mb: 1,
            borderRadius: 1,
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "grey.100" : "grey.800",
            border: (theme) =>
              `1px solid ${
                theme.palette.mode === "light" ? "grey.200" : "grey.700"
              }`,
          }}>
          <Typography variant="body2">
            <strong>{t("network.portComplete")}:</strong> {connectionData?.contextNetPort}
          </Typography>
        </ListItem>
        <ListItem
          sx={{
            p: 1.5,
            mb: 1,
            borderRadius: 1,
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "grey.100" : "grey.800",
            border: (theme) =>
              `1px solid ${
                theme.palette.mode === "light" ? "grey.200" : "grey.700"
              }`,
          }}>
          <Typography variant="body2">
            <strong>{t("connection.agentUuid")}:</strong> {connectionData?.agentUuid}
          </Typography>
        </ListItem>
        <ListItem
          sx={{
            p: 1.5,
            mb: 1,
            borderRadius: 1,
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "grey.100" : "grey.800",
            border: (theme) =>
              `1px solid ${
                theme.palette.mode === "light" ? "grey.200" : "grey.700"
              }`,
          }}>
          <Typography variant="body2">
            <strong>{t("connection.userUuid")}:</strong> {connectionData?.userUuid}
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
}
