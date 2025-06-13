"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Box,
  useTheme,
  Grid,
  InputAdornment,
} from "@mui/material";
import { QrScanner } from "@/components/qr-scanner";
import { useKey } from "@/contexts/key-context";
import { useMobile } from "@/hooks/use-mobile";
import { ModeToggle } from "@/components/mode-toggle";
import { Footer } from "@/components/footer";
import { useSnackbar } from "@/components/snackbar-provider";

export function LandingPage() {
  const [contextNetIp, setContextNetIp] = useState("127.0.0.1");
  const [contextNetPort, setContextNetPort] = useState("5500");
  const [agentUuid, setAgentUuid] = useState("");
  const [userUuid, setUserUuid] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const router = useRouter();
  const { setConnectionData } = useKey();
  const { showSnackbar } = useSnackbar();
  const isMobile = useMobile();
  const theme = useTheme();

  // Gerar UUID aleatório para o usuário quando o componente é montado
  useEffect(() => {
    // Usar crypto.randomUUID() se disponível, ou uma implementação alternativa
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      setUserUuid(crypto.randomUUID());
    } else {
      // Implementação simples de UUID para navegadores que não suportam crypto.randomUUID
      const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        (c) => {
          const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
      setUserUuid(uuid);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação dos campos
    if (!key.trim()) {
      showSnackbar("Por favor, insira uma chave válida", "error");
      return;
    }

    if (!contextNetIp.trim()) {
      showSnackbar("Por favor, insira o IP da rede ContextNet", "error");
      return;
    }

    if (!contextNetPort.trim()) {
      showSnackbar("Por favor, insira a porta da rede ContextNet", "error");
      return;
    }

    if (!agentUuid.trim()) {
      showSnackbar("Por favor, insira o UUID do agente", "error");
      return;
    }

    if (!userUuid.trim()) {
      showSnackbar("Por favor, insira o UUID do usuário", "error");
      return;
    }

    // Salvar os dados de conexão
    await setConnectionData({
      agentKey: key,
      contextNetIp,
      contextNetPort,
      agentUuid,
      userUuid,
    });

    // Redirecionar para a página de chat
    router.push("/chat");
  };

  const handleQrCodeResult = (result: string) => {
   // ajustar para ler um json com esses dados
    setShowScanner(false);
  };

  // Definindo gradientes diretamente no componente
  const gradientStyle = {
    background:
      theme.palette.mode === "light"
        ? "linear-gradient(to bottom, #0a2463, #1e88e5)"
        : "linear-gradient(to bottom, #0a1929, #1565c0)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <Box sx={gradientStyle}>
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <ModeToggle />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          p: 2,
        }}>
        {showScanner && isMobile ? (
          <Card sx={{ width: "100%", maxWidth: "400px" }}>
            <CardHeader
              title={
                <Typography variant="h6" align="center">
                  Ler QR Code
                </Typography>
              }
              subheader={
                <Typography variant="body2" align="center">
                  Posicione o QR Code no centro da câmera
                </Typography>
              }
            />
            <CardContent>
              <QrScanner
                onResult={handleQrCodeResult}
                onClose={() => setShowScanner(false)}
              />
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ width: "100%", maxWidth: "500px" }}>
            <Box sx={{ textAlign: "center", color: "white", mb: 4 }}>
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                gutterBottom>
                Bem vindo(a) ao APP SMA!
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Este aplicativo permite que você se comunique com um agente
                inteligente para obter informações sobre seus eletrodomésticos.
              </Typography>
            </Box>

            <Card sx={{ borderRadius: 2 }}>
              <CardHeader
                title="Acesse o sistema"
                subheader="Preencha os dados para continuar"
              />
              <CardContent>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mt: 1 }}>
                    Rede ContextNet
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <TextField
                        fullWidth
                        label="IP"
                        value={contextNetIp}
                        onChange={(e) => setContextNetIp(e.target.value)}
                        variant="outlined"
                        placeholder="127.0.0.1"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "4px",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label="Porta"
                        value={contextNetPort}
                        onChange={(e) => setContextNetPort(e.target.value)}
                        variant="outlined"
                        placeholder="5500"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "4px",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="UUID do agente"
                    value={agentUuid}
                    onChange={(e) => setAgentUuid(e.target.value)}
                    variant="outlined"
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="UUID do usuário"
                    value={userUuid}
                    onChange={(e) => setUserUuid(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            size="small"
                            onClick={() => {
                              if (
                                typeof crypto !== "undefined" &&
                                crypto.randomUUID
                              ) {
                                setUserUuid(crypto.randomUUID());
                              }
                            }}>
                            Gerar
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                      },
                    }}
                  />

                  {isMobile && (
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => setShowScanner(true)}
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        "&:hover": { bgcolor: "primary.dark" },
                        borderRadius: "4px",
                      }}>
                      Ler QR Code
                    </Button>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "primary.dark",
                      "&:hover": { bgcolor: "primary.main" },
                      borderRadius: "4px",
                      textTransform: "none",
                      py: 1.2,
                      mt: 1,
                    }}>
                    Acessar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>

      <Footer />
    </Box>
  );
}
