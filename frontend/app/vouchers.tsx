import { View, Text, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { ScreenHeader } from "@/src/components/ScreenHeader";

type Voucher = {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  discount: string;
  color: string;
  expires: string;
  restaurant?: string;
  used?: boolean;
};

const vouchers: Voucher[] = [
  {
    id: "v1",
    title: "Free Delivery",
    subtitle: "Any restaurant • Min. RM 15",
    code: "DASHFREE",
    discount: "FREE",
    color: "#E23744",
    expires: "Expires in 7 days",
  },
  {
    id: "v2",
    title: "RM 5 Off Any Order",
    subtitle: "Min. spend RM 25",
    code: "DASH5OFF",
    discount: "RM 5",
    color: "#FF6B35",
    expires: "Expires in 12 days",
  },
  {
    id: "v3",
    title: "Free Teh Tarik",
    subtitle: "At any mamak partner",
    code: "TEHFREE",
    discount: "FREE",
    color: "#8B4513",
    expires: "Expires in 3 days",
    restaurant: "Roti Canai Maju",
  },
  {
    id: "v4",
    title: "20% Off Weekend",
    subtitle: "Sat & Sun • Up to RM 15",
    code: "WEEKEND20",
    discount: "20%",
    color: "#7C6BFF",
    expires: "Expires in 20 days",
  },
];

const used: Voucher[] = [
  {
    id: "u1",
    title: "Free Delivery",
    subtitle: "Any restaurant",
    code: "DASHFREE",
    discount: "FREE",
    color: "#8E8E93",
    expires: "Used 2 days ago",
    used: true,
  },
  {
    id: "u2",
    title: "RM 5 Off",
    subtitle: "Min. RM 25",
    code: "DASH5OFF",
    discount: "RM 5",
    color: "#8E8E93",
    expires: "Used 5 days ago",
    used: true,
  },
];

export default function Vouchers() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<"Active" | "Used">("Active");
  const list = tab === "Active" ? vouchers : used;

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      <ScreenHeader title="My Vouchers" onBack={() => router.back()} />

      {/* Segmented tabs */}
      <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <View style={{ flexDirection: "row", backgroundColor: colors.surfaceSecondary, borderRadius: radius.pill, padding: 4 }}>
          {(["Active", "Used"] as const).map((t) => {
            const active = tab === t;
            const count = t === "Active" ? vouchers.length : used.length;
            return (
              <Pressable
                key={t}
                testID={`voucher-tab-${t}`}
                onPress={() => setTab(t)}
                style={{
                  flex: 1, paddingVertical: 10, borderRadius: radius.pill,
                  backgroundColor: active ? colors.surface : "transparent",
                  alignItems: "center",
                  ...(active ? shadow.card : {}),
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: "700", color: active ? colors.onSurface : colors.muted }}>
                  {t} ({count})
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: insets.bottom + 24 }}>
        {list.length === 0 ? (
          <View style={{ paddingVertical: 60, alignItems: "center" }}>
            <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="pricetag-outline" size={30} color={colors.muted} />
            </View>
            <Text style={{ fontSize: 16, fontWeight: "800", color: colors.onSurface, marginTop: spacing.md }}>
              {tab === "Active" ? "No vouchers yet" : "No used vouchers"}
            </Text>
            <Text style={{ fontSize: 13, color: colors.muted, marginTop: 4, textAlign: "center" }}>
              {tab === "Active" ? "Redeem your DashPoints for tasty perks" : "Claimed vouchers will show up here"}
            </Text>
            {tab === "Active" && (
              <Pressable
                onPress={() => router.push("/rewards")}
                style={{ marginTop: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: 10, borderRadius: radius.pill, backgroundColor: colors.brandPrimary }}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "800" }}>Browse rewards</Text>
              </Pressable>
            )}
          </View>
        ) : (
          list.map((v) => <VoucherCard key={v.id} v={v} onUse={() => router.push("/delivery/cart")} />)
        )}
      </ScrollView>
    </View>
  );
}

function VoucherCard({ v, onUse }: { v: Voucher; onUse: () => void }) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      testID={`voucher-${v.id}`}
      onPress={() => !v.used && setExpanded((x) => !x)}
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        overflow: "hidden",
        opacity: v.used ? 0.6 : 1,
        ...shadow.card,
      }}
    >
      {/* Ticket top */}
      <LinearGradient
        colors={[v.color, v.color + "CC"]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{ padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md }}
      >
        <View style={{
          width: 72, height: 72, borderRadius: 20,
          backgroundColor: "rgba(255,255,255,0.22)",
          alignItems: "center", justifyContent: "center",
          borderWidth: 2, borderColor: "rgba(255,255,255,0.35)",
        }}>
          <Text style={{ color: "#FFFFFF", fontSize: v.discount.length > 3 ? 16 : 22, fontWeight: "800" }}>{v.discount}</Text>
          {v.discount !== "FREE" && <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 9, fontWeight: "700" }}>OFF</Text>}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "800" }}>{v.title}</Text>
          <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, marginTop: 2 }}>{v.subtitle}</Text>
          {v.restaurant && (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6, alignSelf: "flex-start", backgroundColor: "rgba(0,0,0,0.2)", paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill }}>
              <Ionicons name="restaurant" size={10} color="#FFFFFF" />
              <Text style={{ color: "#FFFFFF", fontSize: 10, fontWeight: "700" }}>{v.restaurant}</Text>
            </View>
          )}
        </View>
      </LinearGradient>

      {/* Perforated divider */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 6 }}>
        <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: colors.surfaceSecondary, marginLeft: -8 }} />
        <View style={{ flex: 1, height: 1, borderStyle: "dashed", borderTopWidth: 1, borderColor: colors.border, marginHorizontal: 6 }} />
        <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: colors.surfaceSecondary, marginRight: -8 }} />
      </View>

      {/* Bottom section */}
      <View style={{ padding: spacing.md }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View>
            <Text style={{ color: colors.muted, fontSize: 10, fontWeight: "700", letterSpacing: 0.6 }}>CODE</Text>
            <Text style={{ color: colors.onSurface, fontSize: 15, fontWeight: "800", letterSpacing: 1.5, marginTop: 2 }}>{v.code}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ color: colors.muted, fontSize: 11 }}>{v.expires}</Text>
            {!v.used && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 3, marginTop: 3 }}>
                <Ionicons name="time-outline" size={11} color={v.color} />
                <Text style={{ color: v.color, fontSize: 11, fontWeight: "700" }}>Tap to view QR</Text>
              </View>
            )}
          </View>
        </View>

        {expanded && !v.used && (
          <View style={{ marginTop: spacing.md, alignItems: "center", paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.divider }}>
            <FauxQR color={v.color} />
            <Text style={{ color: colors.onSurface, fontSize: 15, fontWeight: "800", letterSpacing: 3, marginTop: 10 }}>{v.code}</Text>
            <Text style={{ color: colors.muted, fontSize: 11, marginTop: 4 }}>Show this at checkout or scan at the counter</Text>
            <View style={{ flexDirection: "row", gap: 8, marginTop: spacing.md, alignSelf: "stretch" }}>
              <Pressable
                testID={`copy-${v.id}`}
                style={{ flex: 1, height: 42, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 }}
              >
                <Ionicons name="copy-outline" size={14} color={colors.onSurface} />
                <Text style={{ color: colors.onSurface, fontSize: 13, fontWeight: "700" }}>Copy code</Text>
              </Pressable>
              <Pressable
                testID={`use-${v.id}`}
                onPress={onUse}
                style={{ flex: 1.4, height: 42, borderRadius: radius.pill, backgroundColor: v.color, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 }}
              >
                <Ionicons name="cart" size={14} color="#FFFFFF" />
                <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "800" }}>Use now</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
}

// Faux QR code — grid of squares
function FauxQR({ color }: { color: string }) {
  const size = 140;
  const cells = 12;
  const rows = Array.from({ length: cells });
  // deterministic pattern
  const seed = (i: number, j: number) => (i * 31 + j * 17 + i * j) % 5 !== 0;
  return (
    <View style={{ width: size, height: size, backgroundColor: "#FFFFFF", padding: 8, borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB" }}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        {rows.map((_, i) => (
          <View key={i} style={{ flex: 1, flexDirection: "row" }}>
            {rows.map((__, j) => {
              const isCorner = (i < 3 && j < 3) || (i < 3 && j > cells - 4) || (i > cells - 4 && j < 3);
              const on = isCorner ? (i === 0 || i === 2 || j === 0 || j === 2 || (i === 1 && j === 1) || (i === cells - 2 && j === 1) || (i === 1 && j === cells - 2)) : seed(i, j);
              return <View key={j} style={{ flex: 1, backgroundColor: on ? "#1A1A1A" : "transparent", margin: 0.5 }} />;
            })}
          </View>
        ))}
      </View>
      {/* corner marker overlay */}
      {[{ top: 6, left: 6 }, { top: 6, right: 6 }, { bottom: 6, left: 6 }].map((p, i) => (
        <View key={i} style={{ position: "absolute", ...p, width: 24, height: 24, borderWidth: 3, borderColor: color, borderRadius: 3 }} />
      ))}
    </View>
  );
}
