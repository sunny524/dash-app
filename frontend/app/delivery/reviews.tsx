import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { ScreenHeader } from "@/src/components/ScreenHeader";
import { reviews, reviewSummary } from "@/src/data/mock";

const filters = [
  { id: "all", label: "All" },
  { id: "5", label: "5 ★" },
  { id: "4", label: "4 ★" },
  { id: "3", label: "3 ★" },
  { id: "photos", label: "With photos" },
  { id: "verified", label: "Verified" },
];

export default function Reviews() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState("all");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const filtered = reviews.filter((r) => {
    if (filter === "all") return true;
    if (filter === "photos") return r.photos.length > 0;
    if (filter === "verified") return r.verified;
    return r.rating === Number(filter);
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      <ScreenHeader
        title="Reviews"
        onBack={() => router.back()}
        right={
          <Pressable testID="write-review-btn">
            <Ionicons name="create-outline" size={22} color={colors.brandPrimary} />
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }} stickyHeaderIndices={[1]}>
        {/* Summary card */}
        <View style={{ padding: spacing.lg, gap: spacing.md }}>
          <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, ...shadow.card }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.xl }}>
              {/* Big score */}
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 44, fontWeight: "800", color: colors.onSurface, letterSpacing: -1 }}>{reviewSummary.average.toFixed(1)}</Text>
                <View style={{ flexDirection: "row", gap: 2, marginTop: 2 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Ionicons key={s} name={s <= Math.round(reviewSummary.average) ? "star" : "star-outline"} size={13} color="#E23744" />
                  ))}
                </View>
                <Text style={{ fontSize: 11, color: colors.muted, marginTop: 4 }}>{reviewSummary.total.toLocaleString()} reviews</Text>
              </View>

              {/* Breakdown bars */}
              <View style={{ flex: 1, gap: 5 }}>
                {reviewSummary.breakdown.map((b) => (
                  <View key={b.stars} style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Text style={{ fontSize: 11, color: colors.onSurfaceSecondary, fontWeight: "600", width: 10 }}>{b.stars}</Text>
                    <Ionicons name="star" size={10} color="#E23744" />
                    <View style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: colors.surfaceTertiary, overflow: "hidden" }}>
                      <View style={{ width: `${b.pct}%`, height: "100%", backgroundColor: b.stars >= 4 ? colors.brandPrimary : (b.stars === 3 ? colors.warning : colors.error), borderRadius: 3 }} />
                    </View>
                    <Text style={{ fontSize: 10, color: colors.muted, minWidth: 30, textAlign: "right" }}>{b.count}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Tags cloud */}
          <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card }}>
            <Text style={{ fontSize: 13, fontWeight: "800", color: colors.onSurface, marginBottom: spacing.sm }}>What customers say</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
              {reviewSummary.tags.map((t) => (
                <View key={t.label} style={{
                  flexDirection: "row", alignItems: "center", gap: 4,
                  paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.pill,
                  backgroundColor: t.positive ? colors.brandTertiary : "#FEE",
                  borderWidth: 1, borderColor: t.positive ? colors.brandSecondary : "#FCC",
                }}>
                  <Ionicons name={t.positive ? "thumbs-up" : "thumbs-down"} size={11} color={t.positive ? colors.brandPrimary : colors.error} />
                  <Text style={{ fontSize: 12, fontWeight: "600", color: t.positive ? colors.onSurface : colors.error }}>{t.label}</Text>
                  <Text style={{ fontSize: 11, color: colors.muted }}>{t.count}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Sticky filter chips */}
        <View style={{ backgroundColor: colors.surfaceSecondary, paddingBottom: spacing.md }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: 8 }}>
            {filters.map((f) => {
              const active = f.id === filter;
              return (
                <Pressable
                  key={f.id}
                  testID={`review-filter-${f.id}`}
                  onPress={() => setFilter(f.id)}
                  style={{
                    height: 36, paddingHorizontal: spacing.md, borderRadius: radius.pill,
                    backgroundColor: active ? colors.onSurface : colors.surface,
                    borderWidth: 1, borderColor: active ? colors.onSurface : colors.border,
                    justifyContent: "center", flexShrink: 0,
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "700", color: active ? "#FFFFFF" : colors.onSurface }}>{f.label}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Reviews list */}
        <View style={{ paddingHorizontal: spacing.lg, gap: spacing.md }}>
          <Text style={{ fontSize: 13, color: colors.muted }}>{filtered.length} reviews • Sorted by Most Helpful</Text>

          {filtered.map((r) => (
            <View key={r.id} style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.sm }}>
                <Image source={{ uri: r.avatar }} style={{ width: 42, height: 42, borderRadius: 21 }} />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Text style={{ fontSize: 14, fontWeight: "800", color: colors.onSurface }}>{r.user}</Text>
                    {r.verified && (
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 2, backgroundColor: colors.brandTertiary, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6 }}>
                        <Ionicons name="checkmark-circle" size={10} color={colors.brandPrimary} />
                        <Text style={{ fontSize: 9, fontWeight: "800", color: colors.brandPrimary }}>VERIFIED</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>{r.date}</Text>
                </View>
                <Pressable style={{ padding: 4 }}>
                  <Ionicons name="ellipsis-horizontal" size={18} color={colors.muted} />
                </Pressable>
              </View>

              {/* Stars */}
              <View style={{ flexDirection: "row", gap: 2, marginBottom: 6 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons key={s} name={s <= r.rating ? "star" : "star-outline"} size={13} color="#E23744" />
                ))}
              </View>

              <Text style={{ fontSize: 14, color: colors.onSurface, lineHeight: 20 }}>{r.text}</Text>

              {/* Photos */}
              {r.photos.length > 0 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: spacing.sm }} contentContainerStyle={{ gap: 6 }}>
                  {r.photos.map((p, i) => (
                    <Image key={i} source={{ uri: p }} style={{ width: 96, height: 96, borderRadius: radius.md }} />
                  ))}
                </ScrollView>
              )}

              {/* Ordered */}
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: spacing.sm, padding: 8, backgroundColor: colors.surfaceSecondary, borderRadius: radius.md }}>
                <Ionicons name="restaurant-outline" size={12} color={colors.muted} />
                <Text style={{ fontSize: 11, color: colors.muted, flex: 1 }} numberOfLines={1}>Ordered: {r.ordered}</Text>
              </View>

              {/* Actions */}
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.sm, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.divider }}>
                <Pressable
                  testID={`like-${r.id}`}
                  onPress={() => setLiked({ ...liked, [r.id]: !liked[r.id] })}
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Ionicons name={liked[r.id] ? "heart" : "heart-outline"} size={16} color={liked[r.id] ? colors.error : colors.onSurfaceSecondary} />
                  <Text style={{ fontSize: 12, color: colors.onSurfaceSecondary, fontWeight: "600" }}>Helpful ({r.likes + (liked[r.id] ? 1 : 0)})</Text>
                </Pressable>
                <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <Ionicons name="chatbubble-outline" size={16} color={colors.onSurfaceSecondary} />
                  <Text style={{ fontSize: 12, color: colors.onSurfaceSecondary, fontWeight: "600" }}>Reply</Text>
                </Pressable>
                <Pressable>
                  <Ionicons name="share-outline" size={16} color={colors.onSurfaceSecondary} />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
