"use client";

import { List, ListItem, Typography, Divider, Box } from "@mui/material";

interface ConnectionData {
  agentKey: string;
  contextNetIp: string;
  contextNetPort: string;
  agentUuid: string;
  userUuid: string;
}

interface AgentDataProps {
  data: string[];
  connectionData: ConnectionData | null;
}

export function AgentData({ data, connectionData }: AgentDataProps) {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
        Dados de Conexão
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
            <strong>IP ContextNet:</strong> {connectionData?.contextNetIp}
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
            <strong>Porta ContextNet:</strong> {connectionData?.contextNetPort}
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
            <strong>UUID do Agente:</strong> {connectionData?.agentUuid}
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
            <strong>UUID do Usuário:</strong> {connectionData?.userUuid}
          </Typography>
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
        Dados do Agente
      </Typography>
      <List>
        {data.map((item, index) => (
          <ListItem
            key={index}
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
            <Typography variant="body2">{item}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
