import { View, Text, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { merchantProfile, hourlyRevenue } from "@/src/data/merchant-mock";

export default function Revenue() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [period, setPeriod] = useState<"Today" | "Week" | "Month">("Today");

  const value =
    period === "Today" ? merchantProfile.todayRevenue :
    period === "Week" ? merchantProfile.weekRevenue :
    merchantProfile.monthRevenue;

  const maxVal = Math.max(...hourlyRevenue.map((h) => h.v));

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        {/* Hero */}
        <LinearGradient
          colors={[colors.brandPrimary, "#B32734"]}
          style={{ paddingTop: insets.top + spacing.md, paddingBottom: spacing.xl, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "800" }}>Revenue</Text>
            <Pressable style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
            </Pressable>
          </View>

          <View style={{ flexDirection: "row", marginTop: spacing.md, backgroundColor: "rgba(0,0,0,0.15)", padding: 3, borderRadius: radius.pill }}>
            {(["Today", "Week", "Month"] as const).map((p) => {
              const active = p === period;
              return (
                <Pressable
                  key={p}
                  testID={`rev-period-${p}`}
                  onPress={() => setPeriod(p)}
                  style={{
                    flex: 1, paddingVertical: 8, borderRadius: radius.pill,
                    backgroundColor: active ? "#FFFFFF" : "transparent",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: active ? colors.brandPrimary : "#FFFFFF", fontSize: 12, fontWeight: "800" }}>{p}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={{ marginTop: spacing.lg }}>
            <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: "600" }}>Gross revenue • {period.toLowerCase()}</Text>
            <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 4 }}>
              <Text style={{ color: "#FFFFFF", fontSize: 40, fontWeight: "800", letterSpacing: -1 }}>RM {value.toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 }}>
              <Ionicons name="trending-up" size={14} color="#FFFFFF" />
              <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "700" }}>+14.8% vs last {period.toLowerCase()}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick KPIs */}
        <View style={{ marginHorizontal: spacing.lg, marginTop: -spacing.md, flexDirection: "row", gap: 8 }}>
          <StatCard label="Orders" value={merchantProfile.todayOrders.toString()} icon="receipt" />
          <StatCard label="Avg prep" value={`${merchantProfile.avgPrepMin}min`} icon="time" />
          <StatCard label="Accept" value={`${merchantProfile.acceptRate}%`} icon="checkmark-circle" />
        </View>

        {/* Chart */}
        <View style={{ marginHorizontal: spacing.lg, marginTop: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md }}>
            <Text style={{ color: colors.onSurface, fontSize: 14, fontWeight: "800" }}>Hourly revenue</Text>
            <Text style={{ color: colors.muted, fontSize: 11 }}>Peak: 12–1 PM</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end", height: 140, gap: 6 }}>
            {hourlyRevenue.map((h, i) => {
              const height = Math.max(8, (h.v / maxVal) * 120);
              return (
                <View key={i} style={{ flex: 1, alignItems: "center" }}>
                  <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    {h.peak && <Text style={{ color: colors.brandPrimary, fontSize: 10, fontWeight: "800", marginBottom: 2 }}>RM{h.v}</Text>}
                    <View style={{
                      width: 22, height,
                      borderRadius: 5,
                      backgroundColor: h.peak ? colors.brandPrimary : colors.brandSecondary,
                    }} />
                  </View>
                  <Text style={{ color: h.peak ? colors.brandPrimary : colors.muted, fontSize: 10, marginTop: 6, fontWeight: h.peak ? "800" : "500" }}>{h.h}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Payout */}
        <View style={{ marginHorizontal: spacing.lg, marginTop: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: colors.brandTertiary, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="wallet" size={22} color={colors.brandPrimary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.onSurface, fontSize: 15, fontWeight: "800" }}>RM 1,842.50 pending payout</Text>
            <Text style={{ color: colors.muted, fontSize: 11, marginTop: 2 }}>Next transfer: Tomorrow, 10 AM</Text>
          </View>
          <Pressable style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: colors.brandPrimary }}>
            <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "800" }}>Details</Text>
          </Pressable>
        </View>

        {/* Top items */}
        <View style={{ marginHorizontal: spacing.lg, marginTop: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card }}>
          <Text style={{ color: colors.onSurface, fontSize: 14, fontWeight: "800", marginBottom: spacing.sm }}>Top items today</Text>
          {[
            { name: "Nasi Lemak Ayam Rendang", sold: 42, revenue: 667.8, share: 36 },
            { name: "Teh Tarik", sold: 88, revenue: 308.0, share: 17 },
            { name: "Mee Goreng Mamak", sold: 34, revenue: 336.6, share: 18 },
            { name: "Nasi Lemak Sambal Sotong", sold: 28, revenue: 406.0, share: 22 },
          ].map((t, i) => (
            <View key={t.name} style={{ paddingVertical: 8, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.divider }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ flex: 1, color: colors.onSurface, fontSize: 13, fontWeight: "700" }} numberOfLines={1}>{t.name}</Text>
                <Text style={{ color: colors.onSurface, fontSize: 13, fontWeight: "800" }}>RM {t.revenue.toFixed(2)}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6 }}>
                <View style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: colors.surfaceSecondary, overflow: "hidden" }}>
                  <View style={{ width: `${t.share}%`, height: "100%", backgroundColor: colors.brandPrimary, borderRadius: 3 }} />
                </View>
                <Text style={{ color: colors.muted, fontSize: 10, fontWeight: "700" }}>{t.sold} sold</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg, padding: 12, ...shadow.card }}>
      <Ionicons name={icon as any} size={16} color={colors.brandPrimary} />
      <Text style={{ color: colors.onSurface, fontSize: 18, fontWeight: "800", marginTop: 6 }}>{value}</Text>
      <Text style={{ color: colors.muted, fontSize: 11 }}>{label}</Text>
    </View>
  );
}
