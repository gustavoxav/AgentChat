"use client";

import * as React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function LanguageToggle() {
  const t = useTranslations("language");
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mounted, setMounted] = React.useState(false);
// const currentLocale = hasLocale() ? router.locale : null;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (mounted) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectLocale = (newLocale: "pt" | "en") => {
    router.push(`/${newLocale}`);
    handleClose();
  };

  if (!mounted) {
    return (
      <IconButton size="small" disabled>
        <LanguageIcon />
      </IconButton>
    );
  }

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        aria-label="select language"
        sx={{
          color: "text.primary",
        }}>
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
          }}>
          <MenuItem
            onClick={() => handleSelectLocale("pt")}
            // selected={locale === "pt"}
            >
            <ListItemIcon>🇧🇷</ListItemIcon>
            <ListItemText>{t("portuguese")}</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => handleSelectLocale("en")}
            // selected={locale === "en"}
            >
            <ListItemIcon>🇺🇸</ListItemIcon>
            <ListItemText>{t("english")}</ListItemText>
          </MenuItem>
        </Menu>
      )}
    </>
  );
}
