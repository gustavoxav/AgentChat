"use client";

import { Box, Typography, Link } from "@mui/material";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 2,
        px: 3,
        textAlign: "center",
      }}>
      <Box
        sx={{
          maxWidth: "800px",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography variant="body2" className="text-[#bdbdbd]">
            {new Date().getFullYear()} CEFET-RJ
          </Typography>
          <Typography
            variant="body2"
            className="text-[#bdbdbd]"
            sx={{ mx: 0.5 }}>
            •
          </Typography>
          <Typography variant="body2" className="text-[#bdbdbd]">
            v1.0.0
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography variant="body2" className="text-[#bdbdbd]">
            Desenvolvido por
          </Typography>
          <Link
            href="https://github.com/gustavoxav"
            rel="noreferrer"
            target="_blank"
            variant="body2"
            color="#bdbdbd"
            className="cursor-pointer text-[#bdbdbd]">
            Gustavo Xavier
          </Link>
          <Typography variant="body2" className="text-[#bdbdbd]">
            e
          </Typography>
          <Link
            href="https://github.com/Facanhalima"
            rel="noreferrer"
            target="_blank"
            variant="body2"
            color="#bdbdbd"
            className="cursor-pointer text-[#bdbdbd]">
            Matheus Façanha
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
