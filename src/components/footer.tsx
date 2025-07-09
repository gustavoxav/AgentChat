"use client"

import { Box, Typography, Link, useMediaQuery, useTheme, Slide } from "@mui/material"
import { useKeyboardOpen } from "@/hooks/use-keyboard-open"

export function Footer() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isKeyboardOpen = useKeyboardOpen()

  return (
    <Slide direction="up" in={!isKeyboardOpen} mountOnEnter unmountOnExit>
      <Box
        component="footer"
        sx={{
          width: "100%",
          py: isMobile ? 1.5 : 2,
          px: isMobile ? 2 : 3,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
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
            gap: isMobile ? 0.5 : 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography
              variant={isMobile ? "caption" : "body2"}
              className="text-[#bdbdbd]"
              sx={{ fontSize: isMobile ? "0.7rem" : undefined }}
            >
              {new Date().getFullYear()} CEFET-RJ
            </Typography>
            <Typography
              variant={isMobile ? "caption" : "body2"}
              className="text-[#bdbdbd]"
              sx={{
                mx: 0.5,
                fontSize: isMobile ? "0.7rem" : undefined,
              }}
            >
              •
            </Typography>
            <Typography
              variant={isMobile ? "caption" : "body2"}
              className="text-[#bdbdbd]"
              sx={{ fontSize: isMobile ? "0.7rem" : undefined }}
            >
              v1.0.0
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              flexWrap: isMobile ? "wrap" : "nowrap",
              justifyContent: "center",
            }}
          >
            <Typography
              variant={isMobile ? "caption" : "body2"}
              className="text-[#bdbdbd]"
              sx={{ fontSize: isMobile ? "0.7rem" : undefined }}
            >
              Desenvolvido por
            </Typography>
            <Link
              href="https://github.com/gustavoxav"
              rel="noreferrer"
              target="_blank"
              variant={isMobile ? "caption" : "body2"}
              color="#bdbdbd"
              className="cursor-pointer text-[#bdbdbd]"
              sx={{
                fontSize: isMobile ? "0.7rem" : undefined,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Gustavo Xavier
            </Link>
            <Typography
              variant={isMobile ? "caption" : "body2"}
              className="text-[#bdbdbd]"
              sx={{ fontSize: isMobile ? "0.7rem" : undefined }}
            >
              e
            </Typography>
            <Link
              href="https://github.com/Facanhalima"
              rel="noreferrer"
              target="_blank"
              variant={isMobile ? "caption" : "body2"}
              color="#bdbdbd"
              className="cursor-pointer text-[#bdbdbd]"
              sx={{
                fontSize: isMobile ? "0.7rem" : undefined,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Matheus Façanha
            </Link>
          </Box>
        </Box>
      </Box>
    </Slide>
  )
}
