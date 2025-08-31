"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  IconButton,
  Collapse,
  Chip,
} from "@mui/material";
import { QrScanner } from "@/components/qr-scanner";
import { useKey } from "@/contexts/key-context";
import { useMobile } from "@/hooks/use-mobile";
import { ModeToggle } from "@/components/mode-toggle";
import { Footer } from "@/components/footer";
import { useSnackbar } from "@/components/snackbar-provider";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface QrCodeData {
  ip: string;
  porta: string;
  uuidAgent: string;
  uuidAPP: string;
}

interface UrlParams {
  rede?: string;
  porta?: string;
  UUIDAgente?: string;
  UUIDHumano?: string;
  force?: string;
  message?: string;
}

export function LandingPage() {
  const searchParams = useSearchParams();

  const [contextNetIp, setContextNetIp] = useState(
    process.env.NEXT_PUBLIC_IP ?? ""
  );
  const [contextNetPort, setContextNetPort] = useState(
    process.env.NEXT_PUBLIC_PORT ?? ""
  );
  const [agentUuid, setAgentUuid] = useState("");
  const [userUuid, setUserUuid] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [networkExpanded, setNetworkExpanded] = useState(false);

  const router = useRouter();
  const { setConnectionData } = useKey();
  const { showSnackbar } = useSnackbar();
  const isMobile = useMobile();
  const theme = useTheme();

  const [autoConnecting, setAutoConnecting] = useState(false);
  const [errors, setErrors] = useState({
    contextNetIp: false,
    contextNetPort: false,
    agentUuid: false,
    userUuid: false,
  });

  const processUrlParams = () => {
    if (!searchParams) return null;

    const urlParams: UrlParams = {
      rede: searchParams.get("rede") || undefined,
      porta: searchParams.get("porta") || undefined,
      UUIDAgente: searchParams.get("UUIDAgente") || undefined,
      UUIDHumano: searchParams.get("UUIDHumano") || undefined,
      force: searchParams.get("force") || undefined,
      message: searchParams.get("message") || undefined,
    };

    const hasParams = Object.values(urlParams).some(
      (value) => value !== undefined
    );
    return hasParams ? urlParams : null;
  };

  const applyUrlParams = (params: UrlParams) => {
    console.log("Aplicando parâmetros da URL:", params);
    const obj: Record<string, string> = {};
    if (params.rede) {
      obj.rede = params.rede;
      setContextNetIp(params.rede);
    }

    if (params.porta) {
      obj.porta = params.porta;
      setContextNetPort(params.porta);
    }

    if (params.UUIDAgente) {
      obj.UUIDAgente = params.UUIDAgente;
      setAgentUuid(params.UUIDAgente);
    }

    if (params.UUIDHumano) {
      if (params.UUIDHumano.toLowerCase() === "auto") {
        const newUuid = crypto.randomUUID();
        if (newUuid) {
          obj.UUIDHumano = newUuid;
          setUserUuid(newUuid);
        }
      } else {
        obj.UUIDHumano = params.UUIDHumano;
        setUserUuid(params.UUIDHumano);
      }
    }

    if (params.force) {
      obj.force = params.force;
    }

    if (params.message) {
      obj.message = params.message;
    }

    setErrors({
      contextNetIp: false,
      contextNetPort: false,
      agentUuid: false,
      userUuid: false
    });

    return obj;
  };

  const performAutoConnection = async (data: UrlParams) => {
    setAutoConnecting(true);
    try {
      if (!validateFields(data)) {
        showSnackbar("Parâmetros da URL incompletos", "error");
        setAutoConnecting(false);
        return;
      }
      await setConnectionData({
        contextNetIp,
        contextNetPort,
        agentUuid,
        userUuid,
      });

      showSnackbar("Conectando automaticamente...", "success");

      let chatUrl = data.force ? `/chat?force=${data.force}` : "/chat";
      if (data.message) {
        chatUrl += `&message=${encodeURIComponent(data.message)}`;
      }

      router.push(chatUrl);
    } catch (error) {
      console.error("Erro ao conectar automaticamente:", error);
      showSnackbar("Erro na conexão automática", "error");
      setAutoConnecting(false);
    }
  };

  const validateFields = (data: UrlParams) => {
    console.log("Validando campos com:", data);
    const newErrors = {
      contextNetIp: !data.rede?.trim(),
      contextNetPort: !data.porta?.trim(),
      agentUuid: !data.UUIDHumano?.trim(),
      userUuid: !data.UUIDAgente?.trim(),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  useEffect(() => {
    let alreadyApplied = false;

    const init = async () => {
      if (alreadyApplied) return;
      alreadyApplied = true;

      if (!userUuid) {
        if (typeof crypto !== "undefined" && crypto.randomUUID) {
          setUserUuid(crypto.randomUUID());
        } else {
          const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            (c) => {
              const r = (Math.random() * 16) | 0;
              const v = c === "x" ? r : (r & 0x3) | 0x8;
              return v.toString(16);
            }
          );
          setUserUuid(uuid);
        }
      }

      const urlParams = processUrlParams();

      if (urlParams) {
        console.log("Parâmetros da URL encontrados:", urlParams);
        const obj = applyUrlParams(urlParams);
        showSnackbar("Parâmetros carregados da URL", "success");

        performAutoConnection(obj);
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    await setConnectionData({
      contextNetIp,
      contextNetPort,
      agentUuid,
      userUuid,
    });
    router.push("/chat");
  };

  const handleExpandNetwork = () => {
    setNetworkExpanded(!networkExpanded);
  };

  const handleQrCodeResult = (result: string) => {
    try {
      const qrData: QrCodeData = JSON.parse(result);

      if (qrData.ip && qrData.porta && qrData.uuidAgent && qrData.uuidAPP) {
        setContextNetIp(qrData.ip);
        setContextNetPort(qrData.porta);
        setAgentUuid(qrData.uuidAgent);
        setUserUuid(qrData.uuidAPP);

        showSnackbar("Dados do QR code carregados com sucesso", "success");
      } else {
        showSnackbar("QR code inválido: faltam campos obrigatórios", "error");
      }
    } catch (error) {
      console.error("Erro ao processar QR code:", error);
      showSnackbar("QR code inválido: formato JSON incorreto", "error");
    }

    setShowScanner(false);
  };

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

  const submitButtonText = autoConnecting ? "Conectando..." : "Acessar";

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
                inteligente de forma simples e prática.
              </Typography>
            </Box>

            <Card sx={{ borderRadius: 2 }}>
              <CardHeader
                title="Acesse o sistema"
                subheader="Preencha os dados para continuar"
                sx={{
                  paddingBottom: 0,
                }}
              />
              <CardContent sx={{ paddingTop: 1 }}>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        bgcolor: (theme) =>
                          theme.palette.mode === "light"
                            ? "grey.50"
                            : "grey.900",
                        borderRadius: "8px",
                        border: "1px solid",
                        borderColor: "divider",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: (theme) =>
                            theme.palette.mode === "light"
                              ? "grey.100"
                              : "grey.800",
                        },
                      }}
                      onClick={handleExpandNetwork}>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom>
                          Rede ContextNet
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                          }}>
                          <Chip
                            label={`IP: ${contextNetIp}`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: "0.75rem" }}
                          />
                          <Chip
                            label={`Porta: ${contextNetPort}`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: "0.75rem" }}
                          />
                        </Box>
                      </Box>
                      <IconButton size="small">
                        {networkExpanded ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Box>

                    {/* Seção Expandida da Rede - Inputs Diretos */}
                    <Collapse in={networkExpanded}>
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          sx={{ mb: 2 }}>
                          Configurações da Rede
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid>
                            <TextField
                              fullWidth
                              label="IP"
                              value={contextNetIp}
                              error={errors.contextNetIp}
                              onChange={(e) => {
                                setContextNetIp(e.target.value);
                              }}
                              variant="outlined"
                              placeholder="127.0.0.1"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "4px",
                                },
                              }}
                            />
                          </Grid>
                          <Grid>
                            <TextField
                              fullWidth
                              label="Porta"
                              value={contextNetPort}
                              error={errors.contextNetPort}
                              onChange={(e) => {
                                setContextNetPort(e.target.value);
                              }}
                              variant="outlined"
                              placeholder="5500"
                              inputProps={{ maxLength: 4 }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "4px",
                                },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Collapse>
                  </Box>

                  <TextField
                    fullWidth
                    label="UUID do agente"
                    value={agentUuid}
                    onChange={(e) => setAgentUuid(e.target.value)}
                    variant="outlined"
                    error={errors.agentUuid}
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
                    error={errors.userUuid}
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
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => {
                              setUserUuid("");
                            }}>
                            <span style={{ fontSize: "12px" }}>X</span>
                          </IconButton>
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
                    disabled={autoConnecting}
                    fullWidth
                    sx={{
                      bgcolor: "primary.dark",
                      "&:hover": { bgcolor: "primary.main" },
                      borderRadius: "4px",
                      textTransform: "none",
                      py: 1.2,
                      mt: 1,
                    }}>
                    {submitButtonText}
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
