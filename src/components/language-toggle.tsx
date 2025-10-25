"use client"

import * as React from "react"
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import { Language as LanguageIcon } from "@mui/icons-material"
import { useLocale } from "@/contexts/locale-context"
import { useTranslations } from "next-intl"

export function LanguageToggle() {
  const { locale, setLocale } = useLocale()
  const t = useTranslations("language")
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mounted, setMounted] = React.useState(false)


  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (mounted) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelectLocale = (newLocale: "pt" | "en") => {
    setLocale(newLocale)
    handleClose()
  }

  if (!mounted) {
    return (
      <IconButton size="small" disabled>
        <LanguageIcon />
      </IconButton>
    )
  }

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        aria-label="select language"
        sx={{
          color: "text.primary",
        }}
      >
        <LanguageIcon />
      </IconButton>
      {mounted && (
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
          <MenuItem onClick={() => handleSelectLocale("pt")} selected={locale === "pt"}>
            <ListItemIcon>🇧🇷</ListItemIcon>
            <ListItemText>{t("portuguese")}</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleSelectLocale("en")} selected={locale === "en"}>
            <ListItemIcon>🇺🇸</ListItemIcon>
            <ListItemText>{t("english")}</ListItemText>
          </MenuItem>
        </Menu>
      )}
    </>
  )
}
