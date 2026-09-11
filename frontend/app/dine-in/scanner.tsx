import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useTheme, spacing, radius } from "@/src/theme";

export default function Scanner() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      {/* Camera viewport background */}
      <LinearGradient
        colors={["#1a1a1a", "#000000"]}
        style={{ position: "absolute", inset: 0 }}
      />
      {/* Fake QR viewfinder area */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{
          width: 260, height: 260, borderRadius: 24,
          backgroundColor: "rgba(255,255,255,0.03)",
          alignItems: "center", justifyContent: "center",
        }}>
          {/* Corner accents */}
          {[
            { top: -2, left: -2, br: [24, 0, 0, 0] },
            { top: -2, right: -2, br: [0, 24, 0, 0] },
            { bottom: -2, left: -2, br: [0, 0, 0, 24] },
            { bottom: -2, right: -2, br: [0, 0, 24, 0] },
          ].map((c, i) => (
            <View key={i} style={{
              position: "absolute",
              width: 36, height: 36,
              borderColor: colors.brandPrimary,
              borderTopWidth: c.top !== undefined ? 4 : 0,
              borderBottomWidth: c.bottom !== undefined ? 4 : 0,
              borderLeftWidth: c.left !== undefined ? 4 : 0,
              borderRightWidth: c.right !== undefined ? 4 : 0,
              borderTopLeftRadius: c.br[0],
              borderTopRightRadius: c.br[1],
              borderBottomRightRadius: c.br[2],
              borderBottomLeftRadius: c.br[3],
              top: c.top as any, bottom: c.bottom as any, left: c.left as any, right: c.right as any,
            }} />
          ))}

          {/* QR icon */}
          <Ionicons name="qr-code-outline" size={140} color="rgba(255,255,255,0.15)" />
          {/* Scan line */}
          <View style={{ position: "absolute", left: 20, right: 20, height: 3, backgroundColor: colors.brandPrimary, borderRadius: 2, top: "50%", shadowColor: colors.brandPrimary, shadowOpacity: 0.8, shadowRadius: 8 }} />
        </View>

        <Text style={{ marginTop: spacing.xl, fontSize: 20, fontWeight: "800", color: "#FFFFFF" }}>Point at the table QR</Text>
        <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6, textAlign: "center", paddingHorizontal: spacing.xl }}>
          Find the QR sticker on your table to view the menu and order.
        </Text>
      </View>

      {/* Top bar */}
      <View style={{ position: "absolute", top: insets.top + 8, left: spacing.lg, right: spacing.lg, flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable testID="scanner-back" onPress={() => router.back()} style={topBtn}>
          <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
        </Pressable>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable style={topBtn}><Ionicons name="flashlight" size={20} color="#FFFFFF" /></Pressable>
          <Pressable style={topBtn}><Ionicons name="images" size={20} color="#FFFFFF" /></Pressable>
        </View>
      </View>

      {/* Bottom actions */}
      <View style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg, paddingTop: spacing.lg,
        gap: spacing.md,
      }}>
        <Pressable
          testID="simulate-scan-cta"
          onPress={() => router.push("/dine-in/menu")}
          style={{
            backgroundColor: colors.brandPrimary,
            borderRadius: radius.pill, paddingVertical: 14,
            alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8,
          }}
        >
          <Ionicons name="scan" size={18} color="#FFFFFF" />
          <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>Simulate Scan (Table 5)</Text>
        </Pressable>
        <Pressable style={{
          borderRadius: radius.pill, paddingVertical: 14,
          backgroundColor: "rgba(255,255,255,0.1)",
          alignItems: "center",
        }}>
          <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "700" }}>Enter Table Code Manually</Text>
        </Pressable>
      </View>
    </View>
  );
}

const topBtn = {
  width: 40, height: 40, borderRadius: 20,
  backgroundColor: "rgba(255,255,255,0.15)",
  alignItems: "center" as const, justifyContent: "center" as const,
};
