import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { merchantProfile } from "@/src/data/merchant-mock";

const settings = [
  { icon: "time", label: "Opening Hours", sub: "Daily 7 AM – 10 PM" },
  { icon: "restaurant", label: "Menu Categories", sub: "6 categories" },
  { icon: "card", label: "Payout Account", sub: "Maybank ••4210" },
  { icon: "megaphone", label: "Promotions", sub: "2 active campaigns" },
  { icon: "chatbubbles", label: "Customer Feedback", sub: "12 new reviews" },
  { icon: "notifications", label: "Notifications", sub: "Sound + banner" },
  { icon: "print", label: "Printer & POS", sub: "Epson TM-T82 connected" },
  { icon: "help-circle", label: "Help Center" },
  { icon: "log-out", label: "Sign Out", danger: true },
];

export default function MerchantAccount() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [open, setOpen] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        <View style={{ paddingTop: insets.top + spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, backgroundColor: colors.surface, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <Image source={{ uri: merchantProfile.image }} style={{ width: 64, height: 64, borderRadius: radius.md, borderWidth: 2, borderColor: colors.brandPrimary }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "800", color: colors.onSurface }}>{merchantProfile.restaurant}</Text>
              <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{merchantProfile.branch} • Owned by {merchantProfile.owner}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 }}>
                <Ionicons name="star" size={12} color={colors.star} />
                <Text style={{ fontSize: 12, fontWeight: "700", color: colors.onSurface }}>{merchantProfile.rating}</Text>
                <Text style={{ fontSize: 11, color: colors.muted }}>• Elite partner</Text>
              </View>
            </View>
          </View>

          {/* Open toggle card */}
          <View style={{ marginTop: spacing.lg, backgroundColor: open ? colors.brandTertiary : colors.surfaceSecondary, borderRadius: radius.lg, padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md, borderWidth: 1, borderColor: open ? colors.brandPrimary : colors.border }}>
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: open ? colors.brandPrimary : colors.surfaceTertiary, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name={open ? "storefront" : "moon"} size={20} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "800", color: colors.onSurface }}>{open ? "Currently open" : "Currently closed"}</Text>
              <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>{open ? "Accepting new orders • Auto-close at 10 PM" : "New orders paused"}</Text>
            </View>
            <Pressable
              testID="open-toggle"
              onPress={() => setOpen(!open)}
              style={{
                width: 44, height: 26, borderRadius: 13,
                backgroundColor: open ? colors.brandPrimary : colors.surfaceTertiary,
                justifyContent: "center", paddingHorizontal: 3,
              }}
            >
              <View style={{
                width: 20, height: 20, borderRadius: 10, backgroundColor: "#FFFFFF",
                alignSelf: open ? "flex-end" : "flex-start",
              }} />
            </Pressable>
          </View>

          {/* Stats */}
          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
            <Metric label="Orders" value={merchantProfile.todayOrders.toString()} />
            <Metric label="Prep avg" value={`${merchantProfile.avgPrepMin}m`} />
            <Metric label="Accept" value={`${merchantProfile.acceptRate}%`} />
            <Metric label="Rating" value={merchantProfile.rating.toString()} />
          </View>
        </View>

        {/* Switch to Customer */}
        <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.lg }}>
          <Pressable
            testID="switch-to-customer-merchant"
            onPress={() => router.replace("/(tabs)/home")}
            style={{
              backgroundColor: colors.surface, borderRadius: radius.lg,
              padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md,
              ...shadow.card,
            }}
          >
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.brandTertiary, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="swap-horizontal" size={18} color={colors.brandPrimary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "800", color: colors.onSurface }}>Switch to Customer app</Text>
              <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>Browse restaurants, order food</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>
        </View>

        <View style={{
          marginHorizontal: spacing.lg, marginTop: spacing.md,
          backgroundColor: colors.surface, borderRadius: radius.lg,
          ...shadow.card, overflow: "hidden",
        }}>
          {settings.map((s, i) => (
            <Pressable
              key={s.label}
              style={{
                flexDirection: "row", alignItems: "center", gap: spacing.md,
                paddingHorizontal: spacing.md, paddingVertical: spacing.md,
                borderBottomWidth: i === settings.length - 1 ? 0 : 1,
                borderBottomColor: colors.divider,
              }}
            >
              <View style={{
                width: 36, height: 36, borderRadius: 10,
                backgroundColor: s.danger ? "#FEE" : colors.brandTertiary,
                alignItems: "center", justifyContent: "center",
              }}>
                <Ionicons name={s.icon as any} size={18} color={s.danger ? colors.error : colors.brandPrimary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: s.danger ? colors.error : colors.onSurface }}>{s.label}</Text>
                {s.sub ? <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>{s.sub}</Text> : null}
              </View>
              {!s.danger && <Ionicons name="chevron-forward" size={16} color={colors.muted} />}
            </Pressable>
          ))}
        </View>

        <Text style={{ textAlign: "center", color: colors.muted, fontSize: 11, marginTop: spacing.lg }}>
          Dash Merchant v1.0.0 • Serving Malaysia 🇲🇾
        </Text>
      </ScrollView>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary, borderRadius: radius.md, padding: 10 }}>
      <Text style={{ color: colors.onSurface, fontSize: 15, fontWeight: "800" }}>{value}</Text>
      <Text style={{ color: colors.muted, fontSize: 10, marginTop: 2, fontWeight: "700" }}>{label.toUpperCase()}</Text>
    </View>
  );
}
