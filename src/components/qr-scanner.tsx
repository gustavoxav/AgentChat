"use client";

import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Html5Qrcode } from "html5-qrcode";

interface QrScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export function QrScanner({ onResult, onClose }: Readonly<QrScannerProps>) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let html5QrCode: Html5Qrcode;

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode("qr-reader");
        setIsScanning(true);

        const qrCodeSuccessCallback = (decodedText: string) => {
          onResult(decodedText);
          if (html5QrCode.isScanning) {
            html5QrCode.stop();
          }
        };

        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          qrCodeSuccessCallback,
          (errorMessage) => {
            // Ignore errors during scanning
          }
        );
      } catch (err) {
        setError("Não foi possível acessar a câmera. Verifique as permissões.");
        setIsScanning(false);
      }
    };

    startScanner();

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .catch((error) => console.error("Error stopping scanner:", error));
      }
    };
  }, [onResult]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box
        id="qr-reader"
        sx={{ width: "100%", maxWidth: 300, height: 300, mb: 2 }}
      />

      <Button variant="outlined" onClick={onClose} sx={{ mt: 2 }}>
        Cancelar
      </Button>
    </Box>
  );
}
