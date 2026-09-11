import { Pressable, Text, View } from "react-native";
import { useTheme, spacing, radius } from "@/src/theme";

export function PillButton({
  label,
  onPress,
  variant = "primary",
  icon,
  testID,
  fullWidth = true,
  disabled,
}: {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: React.ReactNode;
  testID?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}) {
  const { colors } = useTheme();
  const bg =
    variant === "primary" ? colors.brandPrimary
    : variant === "secondary" ? colors.brandSecondary
    : "transparent";
  const fg =
    variant === "primary" ? colors.onBrandPrimary
    : variant === "secondary" ? colors.onBrandSecondary
    : colors.brandPrimary;
  const borderColor = variant === "ghost" ? colors.brandPrimary : "transparent";

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: bg,
        borderColor,
        borderWidth: variant === "ghost" ? 1.5 : 0,
        paddingVertical: 15,
        paddingHorizontal: spacing.xl,
        borderRadius: radius.pill,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
        opacity: disabled ? 0.5 : 1,
        alignSelf: fullWidth ? "stretch" : "flex-start",
      }}
    >
      {icon}
      <Text style={{ color: fg, fontSize: 15, fontWeight: "700" }}>{label}</Text>
    </Pressable>
  );
}

export function StickyCTA({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.xl,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    }}>
      {children}
    </View>
  );
}
