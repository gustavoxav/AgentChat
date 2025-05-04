"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import { LightMode, DarkMode, SettingsBrightness } from "@mui/icons-material"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
    handleClose()
  }

  if (!mounted) {
    return (
      <IconButton color="inherit">
        <LightMode />
      </IconButton>
    )
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        color="inherit"
        sx={{
          bgcolor: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
        }}
      >
        {theme === "dark" ? <DarkMode /> : theme === "light" ? <LightMode /> : <SettingsBrightness />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleThemeChange("light")} selected={theme === "light"}>
          <ListItemIcon>
            <LightMode fontSize="small" />
          </ListItemIcon>
          <ListItemText>Claro</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("dark")} selected={theme === "dark"}>
          <ListItemIcon>
            <DarkMode fontSize="small" />
          </ListItemIcon>
          <ListItemText>Escuro</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("system")} selected={theme === "system"}>
          <ListItemIcon>
            <SettingsBrightness fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sistema</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
