import { View, Text, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { spacing, radius } from "@/src/theme";
import { rider as c, riderProfile, weeklyEarnings, earningsBreakdown } from "@/src/data/rider-mock";

export default function Earnings() {
  const insets = useSafeAreaInsets();
  const [period, setPeriod] = useState<"Day" | "Week" | "Month">("Week");

  const maxVal = Math.max(...weeklyEarnings.map((d) => d.value));
  const weekTotal = weeklyEarnings.reduce((s, d) => s + d.value, 0);
  const value =
    period === "Day" ? riderProfile.todayEarnings :
    period === "Week" ? weekTotal :
    riderProfile.monthEarnings;

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        {/* Hero */}
        <LinearGradient
          colors={[c.brand, "#8B1A24"]}
          style={{ paddingTop: insets.top + spacing.md, paddingBottom: spacing.xl, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "800" }}>Earnings</Text>
            <Pressable style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="download" size={18} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* Segmented control */}
          <View style={{ flexDirection: "row", marginTop: spacing.md, backgroundColor: "rgba(0,0,0,0.2)", padding: 3, borderRadius: radius.pill }}>
            {(["Day", "Week", "Month"] as const).map((p) => {
              const active = p === period;
              return (
                <Pressable
                  key={p}
                  testID={`period-${p}`}
                  onPress={() => setPeriod(p)}
                  style={{
                    flex: 1, paddingVertical: 8, borderRadius: radius.pill,
                    backgroundColor: active ? "#FFFFFF" : "transparent",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: active ? c.brand : "#FFFFFF", fontSize: 12, fontWeight: "800" }}>{p}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={{ marginTop: spacing.lg }}>
            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: "600" }}>
              {period === "Day" ? "Today" : period === "Week" ? "This week" : "This month"}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 4 }}>
              <Text style={{ color: "#FFFFFF", fontSize: 40, fontWeight: "800", letterSpacing: -1 }}>RM {value.toFixed(2)}</Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginLeft: 8 }}>from {riderProfile.todayDeliveries} deliveries</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Cash out */}
        <View style={{ marginHorizontal: spacing.lg, marginTop: -spacing.md, backgroundColor: c.bg2, borderRadius: radius.lg, padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md, borderWidth: 1, borderColor: c.border }}>
          <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: c.brandDim, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="wallet" size={22} color={c.brand} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: c.text, fontSize: 15, fontWeight: "800" }}>RM 128.50 available</Text>
            <Text style={{ color: c.textDim, fontSize: 11, marginTop: 2 }}>Instant transfer to Maybank ••2841</Text>
          </View>
          <Pressable style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: radius.pill, backgroundColor: c.brand }}>
            <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "800" }}>Cash Out</Text>
          </Pressable>
        </View>

        {/* Weekly chart */}
        <View style={{ marginHorizontal: spacing.lg, marginTop: spacing.md, backgroundColor: c.bg2, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: c.border }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md }}>
            <Text style={{ color: c.text, fontSize: 14, fontWeight: "800" }}>Daily earnings</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Ionicons name="trending-up" size={13} color={c.brand} />
              <Text style={{ color: c.brand, fontSize: 12, fontWeight: "800" }}>+18% vs last week</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end", height: 140, gap: 6, marginTop: 4 }}>
            {weeklyEarnings.map((d, i) => {
              const h = d.value > 0 ? Math.max(6, (d.value / maxVal) * 120) : 4;
              return (
                <View key={i} style={{ flex: 1, alignItems: "center" }}>
                  <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    {d.today && (
                      <Text style={{ color: c.brand, fontSize: 10, fontWeight: "800", textAlign: "center", marginBottom: 2 }}>RM{d.value.toFixed(0)}</Text>
                    )}
                    <View style={{
                      width: 26, height: h,
                      borderRadius: 6,
                      backgroundColor: d.today ? c.brand : (d.future ? c.bg3 : c.brandDim),
                      borderWidth: d.today ? 0 : 1,
                      borderColor: c.border,
                    }} />
                  </View>
                  <Text style={{ color: d.today ? c.brand : c.textDim, fontSize: 11, marginTop: 6, fontWeight: d.today ? "800" : "600" }}>{d.day}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Breakdown */}
        <View style={{ marginHorizontal: spacing.lg, marginTop: spacing.md, backgroundColor: c.bg2, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: c.border }}>
          <Text style={{ color: c.text, fontSize: 14, fontWeight: "800", marginBottom: spacing.sm }}>Today&apos;s breakdown</Text>
          {earningsBreakdown.map((b, i) => (
            <View key={b.label} style={{
              flexDirection: "row", alignItems: "center", gap: spacing.md,
              paddingVertical: 10,
              borderTopWidth: i === 0 ? 0 : 1, borderTopColor: c.divider,
            }}>
              <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: c.brandDim, alignItems: "center", justifyContent: "center" }}>
                <Ionicons name={b.icon as any} size={16} color={c.brand} />
              </View>
              <Text style={{ flex: 1, color: c.text, fontSize: 13, fontWeight: "600" }}>{b.label}</Text>
              <Text style={{ color: c.text, fontSize: 14, fontWeight: "800" }}>RM {b.value.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Performance */}
        <View style={{ marginHorizontal: spacing.lg, marginTop: spacing.md, flexDirection: "row", gap: spacing.md }}>
          <MetricCard label="Acceptance rate" value={`${riderProfile.acceptanceRate}%`} good />
          <MetricCard label="Completion rate" value={`${riderProfile.completionRate}%`} good />
        </View>
      </ScrollView>
    </View>
  );
}

function MetricCard({ label, value, good }: { label: string; value: string; good?: boolean }) {
  return (
    <View style={{ flex: 1, backgroundColor: c.bg2, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: c.border }}>
      <Text style={{ color: c.textDim, fontSize: 11 }}>{label}</Text>
      <Text style={{ color: good ? c.brand : c.text, fontSize: 20, fontWeight: "800", marginTop: 4 }}>{value}</Text>
    </View>
  );
}
