"use client";

import type React from "react";

import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
} from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { blue, grey } from "@mui/material/colors";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);
  if (!mounted) return null;
  const resolvedTheme = resolveTheme(theme);

  const muiTheme = createTheme({
    palette: {
      mode: resolvedTheme,
      primary: {
        main: blue[700],
        dark: blue[800],
        light: blue[500],
      },
      background: {
        default: resolvedTheme === "light" ? "#f5f5f5" : "#121212",
        paper: resolvedTheme === "light" ? "#ffffff" : "#1e1e1e",
      },
      text: {
        primary: resolvedTheme === "light" ? grey[900] : grey[100],
        secondary: resolvedTheme === "light" ? grey[700] : grey[400],
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "4px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
          },
        },
      },
    },
  });

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      <MUIThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  }
  return theme;
}
