import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { rewards, rewardHistory } from "@/src/data/mock";

const POINTS = 2410;
const NEXT_TIER = 5000;

export default function Rewards() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<"Rewards" | "History">("Rewards");
  const [claimed, setClaimed] = useState<Record<string, boolean>>({});

  const progress = Math.min(100, (POINTS / NEXT_TIER) * 100);
  const remaining = NEXT_TIER - POINTS;

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      {/* Hero */}
      <View style={{ paddingTop: insets.top, backgroundColor: colors.onSurface }}>
        <LinearGradient
          colors={[colors.onSurface, "#0A2E1A"]}
          style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: spacing.md }}>
            <Pressable testID="rewards-back" onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.12)", alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
            </Pressable>
            <Text style={{ flex: 1, textAlign: "center", fontSize: 16, fontWeight: "700", color: "#FFFFFF" }}>EasyPoints</Text>
            <Pressable style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.12)", alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="help-circle-outline" size={22} color="#FFFFFF" />
            </Pressable>
          </View>

          <View style={{ alignItems: "center", marginTop: spacing.md }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill, backgroundColor: "rgba(245,166,35,0.2)" }}>
              <Ionicons name="star" size={12} color="#F5A623" />
              <Text style={{ fontSize: 11, fontWeight: "800", color: "#F5A623", letterSpacing: 0.5 }}>GOLD MEMBER</Text>
            </View>
            <Text style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: spacing.md }}>Your balance</Text>
            <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 2 }}>
              <Text style={{ fontSize: 56, fontWeight: "800", color: "#FFFFFF", letterSpacing: -1 }}>{POINTS.toLocaleString()}</Text>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "rgba(255,255,255,0.8)", marginLeft: 8 }}>pts</Text>
            </View>

            {/* Progress bar */}
            <View style={{ width: "100%", marginTop: spacing.lg }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: "600" }}>GOLD</Text>
                <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: "600" }}>PLATINUM</Text>
              </View>
              <View style={{ height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
                <View style={{ width: `${progress}%`, height: "100%", backgroundColor: colors.brandPrimary, borderRadius: 4 }} />
              </View>
              <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 8, textAlign: "center" }}>
                <Text style={{ fontWeight: "800", color: "#FFFFFF" }}>{remaining.toLocaleString()} pts</Text> to Platinum — free monthly dessert 🎉
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Segmented tabs floating below hero */}
        <View style={{
          marginHorizontal: spacing.lg, marginTop: -20,
          backgroundColor: colors.surface, borderRadius: radius.pill,
          padding: 4, flexDirection: "row", ...shadow.card,
        }}>
          {(["Rewards", "History"] as const).map((t) => {
            const active = tab === t;
            return (
              <Pressable
                key={t}
                testID={`rewards-tab-${t}`}
                onPress={() => setTab(t)}
                style={{
                  flex: 1, paddingVertical: 10, borderRadius: radius.pill,
                  backgroundColor: active ? colors.brandPrimary : "transparent",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: "700", color: active ? "#FFFFFF" : colors.onSurfaceSecondary }}>{t}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + 24, gap: spacing.md }}>
        {tab === "Rewards" ? (
          <>
            {/* Quick redeem row */}
            <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface, marginTop: spacing.sm }}>Redeem now</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md, paddingRight: spacing.sm }}>
              {rewards.slice(0, 3).map((r) => {
                const canRedeem = POINTS >= r.points;
                return (
                  <View key={r.id} style={{ width: 200, backgroundColor: colors.surface, borderRadius: radius.lg, overflow: "hidden", ...shadow.card }}>
                    <View style={{ height: 100, backgroundColor: r.color }}>
                      <Image source={{ uri: r.image }} style={{ width: "100%", height: "100%", opacity: 0.6 }} contentFit="cover" />
                      <LinearGradient colors={[r.color + "CC", r.color + "AA"]} style={{ position: "absolute", inset: 0, padding: spacing.md, justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                          <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name={r.icon as any} size={16} color="#FFFFFF" />
                          </View>
                          {r.hot && (
                            <View style={{ backgroundColor: "rgba(0,0,0,0.35)", paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill }}>
                              <Text style={{ fontSize: 9, fontWeight: "800", color: "#FFFFFF" }}>🔥 HOT</Text>
                            </View>
                          )}
                        </View>
                      </LinearGradient>
                    </View>
                    <View style={{ padding: spacing.md }}>
                      <Text style={{ fontSize: 13, fontWeight: "800", color: colors.onSurface }} numberOfLines={1}>{r.title}</Text>
                      <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }} numberOfLines={1}>{r.subtitle}</Text>
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.sm }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                          <Ionicons name="star" size={12} color={colors.brandPrimary} />
                          <Text style={{ fontSize: 13, fontWeight: "800", color: colors.onSurface }}>{r.points}</Text>
                        </View>
                        <Pressable
                          testID={`quick-redeem-${r.id}`}
                          disabled={!canRedeem || claimed[r.id]}
                          onPress={() => setClaimed({ ...claimed, [r.id]: true })}
                          style={{
                            paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill,
                            backgroundColor: claimed[r.id] ? colors.surfaceSecondary : (canRedeem ? colors.brandPrimary : colors.surfaceSecondary),
                          }}
                        >
                          <Text style={{ fontSize: 11, fontWeight: "800", color: claimed[r.id] ? colors.muted : (canRedeem ? "#FFFFFF" : colors.muted) }}>
                            {claimed[r.id] ? "Claimed" : (canRedeem ? "Redeem" : "Locked")}
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            {/* All rewards vertical */}
            <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface, marginTop: spacing.sm }}>All rewards</Text>
            {rewards.map((r) => {
              const canRedeem = POINTS >= r.points;
              const isClaimed = !!claimed[r.id];
              return (
                <View key={r.id} style={{
                  backgroundColor: colors.surface, borderRadius: radius.lg,
                  padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md,
                  ...shadow.card,
                }}>
                  <View style={{ width: 56, height: 56, borderRadius: radius.md, backgroundColor: r.color + "22", alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name={r.icon as any} size={24} color={r.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: "800", color: colors.onSurface }} numberOfLines={1}>{r.title}</Text>
                    <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }} numberOfLines={1}>{r.subtitle}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
                      <Ionicons name="star" size={12} color={canRedeem ? colors.brandPrimary : colors.muted} />
                      <Text style={{ fontSize: 12, fontWeight: "800", color: canRedeem ? colors.onSurface : colors.muted }}>{r.points} pts</Text>
                      {!canRedeem && (
                        <Text style={{ fontSize: 11, color: colors.muted, marginLeft: 4 }}>• Need {r.points - POINTS} more</Text>
                      )}
                    </View>
                  </View>
                  <Pressable
                    testID={`redeem-${r.id}`}
                    disabled={!canRedeem || isClaimed}
                    onPress={() => setClaimed({ ...claimed, [r.id]: true })}
                    style={{
                      paddingHorizontal: spacing.md, paddingVertical: 10, borderRadius: radius.pill,
                      backgroundColor: isClaimed ? colors.surfaceSecondary : (canRedeem ? colors.brandPrimary : colors.surfaceSecondary),
                      borderWidth: 1,
                      borderColor: isClaimed ? colors.border : (canRedeem ? colors.brandPrimary : colors.border),
                    }}
                  >
                    <Text style={{ fontSize: 12, fontWeight: "800", color: isClaimed ? colors.muted : (canRedeem ? "#FFFFFF" : colors.muted) }}>
                      {isClaimed ? "✓ Claimed" : (canRedeem ? "Redeem" : "Locked")}
                    </Text>
                  </Pressable>
                </View>
              );
            })}

            {/* How it works */}
            <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginTop: spacing.md, ...shadow.card }}>
              <Text style={{ fontSize: 14, fontWeight: "800", color: colors.onSurface, marginBottom: spacing.md }}>How EasyPoints work</Text>
              {[
                { icon: "receipt", title: "Earn 1 pt per RM1 spent", sub: "On delivery, dine-in & pickup" },
                { icon: "calendar", title: "5x points on table bookings", sub: "Every reservation you honour" },
                { icon: "gift", title: "Redeem instantly", sub: "Points never expire" },
              ].map((it, i) => (
                <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 10, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.divider }}>
                  <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.brandTertiary, alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name={it.icon as any} size={16} color={colors.brandPrimary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 13, fontWeight: "700", color: colors.onSurface }}>{it.title}</Text>
                    <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>{it.sub}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface, marginTop: spacing.sm }}>Points activity</Text>
            <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, overflow: "hidden", ...shadow.card }}>
              {rewardHistory.map((h, i) => {
                const isEarned = h.points > 0;
                return (
                  <View key={h.id} style={{
                    flexDirection: "row", alignItems: "center", gap: spacing.md,
                    padding: spacing.md,
                    borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.divider,
                  }}>
                    <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: isEarned ? colors.brandTertiary : colors.surfaceSecondary, alignItems: "center", justifyContent: "center" }}>
                      <Ionicons name={isEarned ? "arrow-up" : "arrow-down"} size={18} color={isEarned ? colors.brandPrimary : colors.muted} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, fontWeight: "700", color: colors.onSurface }} numberOfLines={1}>{h.title}</Text>
                      <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>{h.date} • {h.status}</Text>
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: "800", color: isEarned ? colors.brandPrimary : colors.error }}>
                      {isEarned ? "+" : ""}{h.points}
                    </Text>
                  </View>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
