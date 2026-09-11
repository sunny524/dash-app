import { Pressable, Text, View } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, spacing } from "@/src/theme";

export function ScreenHeader({
  title,
  onBack,
  right,
  transparent = false,
  testID,
}: {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  transparent?: boolean;
  testID?: string;
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      testID={testID}
      style={{
        paddingTop: insets.top,
        backgroundColor: transparent ? "transparent" : colors.surface,
        borderBottomWidth: transparent ? 0 : 1,
        borderBottomColor: colors.border,
      }}
    >
      <View style={{
        height: 52, flexDirection: "row", alignItems: "center", paddingHorizontal: spacing.md,
      }}>
        {onBack ? (
          <Pressable testID="header-back-button" onPress={onBack} style={{
            width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center",
            backgroundColor: transparent ? "rgba(255,255,255,0.9)" : colors.surfaceSecondary,
          }}>
            <Ionicons name="chevron-back" size={22} color={colors.onSurface} />
          </Pressable>
        ) : <View style={{ width: 40 }} />}
        <Text style={{
          flex: 1, textAlign: "center", fontSize: 16, fontWeight: "700",
          color: transparent ? "transparent" : colors.onSurface,
        }} numberOfLines={1}>{title}</Text>
        <View style={{ width: 40, alignItems: "flex-end" }}>{right}</View>
      </View>
    </View>
  );
}
