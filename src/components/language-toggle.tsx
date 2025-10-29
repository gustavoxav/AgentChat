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
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export function LanguageToggle() {
  const t = useTranslations("language");
  const router = useRouter();
  const locale = useLocale();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mounted, setMounted] = React.useState(false);

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
    if (newLocale === locale) {
      handleClose();
      return;
    }
    //const currentPath = pathname.replace(/^\/(pt|en)/, "");
    const newPath = `/${newLocale}`;
    router.replace(newPath);
    router.refresh();
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
        onClick={handleClick}
        color="inherit"
        aria-label="select language"
        sx={{
          bgcolor: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
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
            selected={locale === "pt"}>
            <ListItemIcon>🇧🇷</ListItemIcon>
            <ListItemText>{t("portuguese")}</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => handleSelectLocale("en")}
            selected={locale === "en"}>
            <ListItemIcon>🇺🇸</ListItemIcon>
            <ListItemText>{t("english")}</ListItemText>
          </MenuItem>
        </Menu>
      )}
    </>
  );
}
