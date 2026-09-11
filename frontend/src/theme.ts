// Design tokens for EasyEat. Light theme only.
// Colors match /app/design_guidelines.json.

import { useMemo } from "react";
import { Appearance, StyleSheet, useColorScheme } from "react-native";

export type ColorScheme = "light" | "dark";

const light = {
  // Surfaces
  surface: "#FFFFFF",
  onSurface: "#1C1C1E",
  surfaceSecondary: "#F5F6F8",
  onSurfaceSecondary: "#3A3A3C",
  surfaceTertiary: "#E8EBEF",
  onSurfaceTertiary: "#48484A",
  surfaceInverse: "#1C1C1E",
  onSurfaceInverse: "#FFFFFF",
  muted: "#8E8E93",

  // Brand — Grab-style green
  brand: "#00B14F",
  onBrand: "#FFFFFF",
  brandPrimary: "#00B14F",
  onBrandPrimary: "#FFFFFF",
  brandSecondary: "#E5F7ED",
  onBrandSecondary: "#009040",
  brandTertiary: "#F0FDF4",
  onBrandTertiary: "#00B14F",

  // Status
  success: "#34C759",
  onSuccess: "#FFFFFF",
  warning: "#FF9500",
  onWarning: "#FFFFFF",
  error: "#FF3B30",
  onError: "#FFFFFF",
  info: "#0A84FF",
  onInfo: "#FFFFFF",

  // Lines
  border: "#E8EBEF",
  borderStrong: "#C7C7CC",
  divider: "#F2F2F7",

  // Extras
  star: "#F5A623",
  overlay: "rgba(0,0,0,0.45)",
};

export type ThemeColors = typeof light;

export const defaultScheme = "light" satisfies ColorScheme;
export const themes: { light: ThemeColors; dark?: ThemeColors } = { light };

export function setColorScheme(scheme: ColorScheme | null) {
  Appearance.setColorScheme?.(scheme);
}
setColorScheme?.(themes.dark ? null : defaultScheme);

export function useTheme(): { scheme: ColorScheme; colors: ThemeColors } {
  const system = useColorScheme();
  const scheme: ColorScheme = system && themes[system] ? system : defaultScheme;
  return { scheme, colors: themes[scheme] ?? themes.light };
}

export function makeStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  factory: (colors: ThemeColors) => T & StyleSheet.NamedStyles<any>,
): () => T {
  return function useStyles(): T {
    const { colors } = useTheme();
    return useMemo(() => StyleSheet.create(factory(colors)), [colors]);
  };
}

// Design tokens
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 };
export const radius = { sm: 6, md: 12, lg: 20, pill: 999 };
export const shadow = {
  card: {
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  sticky: {
    shadowColor: "#0F172A",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
};
