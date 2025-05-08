"use client"

import { Box, Typography, Link } from "@mui/material"

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 2,
        px: 3,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "800px",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} ContextNet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mx: 0.5 }}>
            •
          </Typography>
          <Typography variant="body2" color="text.secondary">
            v1.0.0
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Desenvolvido por
          </Typography>
          <Link href="https://github.com/gustavoxav" rel="noreferrer" target="_blank" variant="body2" color="text.secondary" className="cursor-pointer">
            Gustavo Xavier
          </Link>
          <Typography variant="body2" color="text.secondary">
            e
          </Typography>
          <Link href="https://github.com/gustavoxav" rel="noreferrer" target="_blank" variant="body2" color="text.secondary" className="cursor-pointer">
            Matheus Façanha
          </Link>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="#" underline="hover" color="text.secondary" variant="body2">
            Termos
          </Link>
          <Link href="#" underline="hover" color="text.secondary" variant="body2">
            Privacidade
          </Link>
          <Link href="#" underline="hover" color="text.secondary" variant="body2">
            Ajuda
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
