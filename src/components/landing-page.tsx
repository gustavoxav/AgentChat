"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Card, CardContent, CardHeader, TextField, Typography, Box, useTheme } from "@mui/material"
import { QrScanner } from "@/components/qr-scanner"
import { useKey } from "@/contexts/key-context"
import { useMobile } from "@/hooks/use-mobile"
import { ModeToggle } from "@/components/mode-toggle"
import { Footer } from "@/components/footer"
import { useSnackbar } from "@/components/snackbar-provider"

export function LandingPage() {
  const [key, setKey] = useState("")
  const [showScanner, setShowScanner] = useState(false)
  const router = useRouter()
  const { setAgentKey } = useKey()
  const { showSnackbar } = useSnackbar()
  const isMobile = useMobile()
  const theme = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!key.trim()) {
      showSnackbar("Por favor, insira uma chave válida", "error")
      return
    }
    await setAgentKey(key)
    router.push("/chat")
  }

  const handleQrCodeResult = (result: string) => {
    setKey(result)
    setShowScanner(false)
  }

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
  }

  return (
    <Box sx={gradientStyle}>
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <ModeToggle />
      </Box>

      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", p: 2 }}>
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
              <QrScanner onResult={handleQrCodeResult} onClose={() => setShowScanner(false)} />
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ width: "100%", maxWidth: "460px" }}>
            <Box sx={{ textAlign: "center", color: "white" }}>
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                Bem vindo(a) ao APP SMA!
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Este aplicativo permite que você se comunique com um agente inteligente para obter informações sobre
                seus eletrodomésticos.
              </Typography>
            </Box>

            <Card sx={{ borderRadius: 2 }}>
              <CardHeader title="Acesse o sistema" subheader="Insira sua chave de acesso para continuar" />
              <CardContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    fullWidth
                    placeholder="Digite sua chave de acesso"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                        "& fieldset": {
                          borderColor:
                            theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)",
                        },
                        "&:hover fieldset": {
                          borderColor:
                            theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
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
                      }}
                    >
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
                    }}
                  >
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
  )
}
