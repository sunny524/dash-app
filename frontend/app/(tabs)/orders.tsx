import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { orders } from "@/src/data/mock";

const TABS = ["All", "Delivery", "Dine-in", "Pickup"] as const;

export default function OrdersScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");

  const filtered = tab === "All" ? orders : orders.filter((o) => o.type === tab);

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      <View style={{ paddingTop: insets.top, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
          <Text style={{ fontSize: 24, fontWeight: "800", color: colors.onSurface }}>Your Orders</Text>
          <Text style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>Track live orders & reorder past meals</Text>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: spacing.lg, gap: spacing.sm, paddingBottom: spacing.sm }}>
          {TABS.map((t) => {
            const active = t === tab;
            return (
              <Pressable
                key={t}
                testID={`orders-tab-${t}`}
                onPress={() => setTab(t)}
                style={{
                  paddingHorizontal: spacing.md, paddingVertical: 8,
                  borderRadius: radius.pill,
                  backgroundColor: active ? colors.brandPrimary : colors.surfaceSecondary,
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: "700", color: active ? colors.onBrandPrimary : colors.onSurfaceSecondary }}>{t}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: insets.bottom + 24 }}>
        {/* Live order banner */}
        <Pressable
          testID="live-order-card"
          onPress={() => router.push("/delivery/tracking")}
          style={{
            backgroundColor: colors.brandPrimary,
            borderRadius: radius.lg, padding: spacing.lg,
            flexDirection: "row", alignItems: "center", gap: spacing.md, ...shadow.card,
          }}
        >
          <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="bicycle" size={24} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>Order on the way!</Text>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, marginTop: 2 }}>Arriving in 12 min • Nasi Lemak Village</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
        </Pressable>

        {filtered.map((o) => (
          <View key={o.id} style={{
            backgroundColor: colors.surface, borderRadius: radius.lg,
            padding: spacing.md, flexDirection: "row", gap: spacing.md, ...shadow.card,
          }}>
            <Image source={{ uri: o.image }} style={{ width: 72, height: 72, borderRadius: radius.md }} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <View style={{ backgroundColor: statusBg(o.status, colors), paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill }}>
                  <Text style={{ fontSize: 10, fontWeight: "700", color: statusFg(o.status, colors) }}>{o.status.toUpperCase()}</Text>
                </View>
                <Text style={{ fontSize: 11, color: colors.muted }}>{o.type}</Text>
              </View>
              <Text style={{ fontSize: 15, fontWeight: "700", color: colors.onSurface, marginTop: 4 }}>{o.restaurant}</Text>
              <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{o.items} items • RM{o.total.toFixed(2)}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.sm }}>
                <Text style={{ fontSize: 11, color: colors.muted }}>{o.date}</Text>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Pressable style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.brandPrimary }}>
                    <Text style={{ fontSize: 12, fontWeight: "700", color: colors.brandPrimary }}>Reorder</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function statusBg(s: string, c: any) {
  if (s.includes("delivery") || s.includes("Ready")) return c.brandTertiary;
  if (s.includes("Delivered") || s.includes("Paid")) return c.surfaceSecondary;
  return c.surfaceSecondary;
}
function statusFg(s: string, c: any) {
  if (s.includes("delivery") || s.includes("Ready")) return c.brandPrimary;
  return c.onSurfaceSecondary;
}
