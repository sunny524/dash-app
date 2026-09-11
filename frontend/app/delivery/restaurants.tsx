import { View, Text, ScrollView, TextInput, Pressable, Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useMemo, useState } from "react";

import { useTheme, spacing, radius } from "@/src/theme";
import { ScreenHeader } from "@/src/components/ScreenHeader";
import { RestaurantCard } from "@/src/components/RestaurantCard";
import { FilterChipRow } from "@/src/components/FilterChipRow";
import { restaurants } from "@/src/data/mock";

const filters = [
  { id: "all", label: "All", icon: "grid" },
  { id: "top", label: "Top Rated", icon: "star" },
  { id: "fast", label: "Under 25 min", icon: "flash" },
  { id: "promo", label: "Promo", icon: "pricetag" },
  { id: "cheap", label: "$", icon: "cash" },
  { id: "halal", label: "Halal", icon: "leaf" },
];

export default function DeliveryRestaurants() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [f, setF] = useState("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let l = restaurants;
    if (f === "top") l = l.filter((r) => r.rating >= 4.7);
    else if (f === "fast") l = l.filter((r) => r.etaMin < 25);
    else if (f === "promo") l = l.filter((r) => !!r.promo);
    else if (f === "cheap") l = l.filter((r) => r.priceRange === "$");
    else if (f === "halal") l = l.filter((r) => r.cuisines.some((c) => c.toLowerCase() === "halal"));
    if (q.trim()) {
      const s = q.toLowerCase();
      l = l.filter((r) =>
        r.name.toLowerCase().includes(s) ||
        r.cuisines.join(" ").toLowerCase().includes(s)
      );
    }
    return l;
  }, [f, q]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <ScreenHeader title="Delivery" onBack={() => router.back()} right={
        <Pressable><Ionicons name="options-outline" size={22} color={colors.onSurface} /></Pressable>
      } />

      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: 8, backgroundColor: colors.surface }}>
        <View style={{
          flexDirection: "row", alignItems: "center", gap: spacing.sm,
          backgroundColor: colors.surfaceSecondary,
          paddingHorizontal: spacing.md, height: 42, borderRadius: radius.pill,
        }}>
          <Ionicons name="search" size={16} color={colors.muted} />
          <TextInput
            testID="delivery-search"
            value={q}
            onChangeText={setQ}
            placeholder="Nasi lemak, satay, dim sum..."
            placeholderTextColor={colors.muted}
            returnKeyType="search"
            style={{ flex: 1, fontSize: 14, color: colors.onSurface, padding: 0 }}
          />
          {q ? (
            <Pressable onPress={() => { setQ(""); Keyboard.dismiss(); }}>
              <Ionicons name="close-circle" size={18} color={colors.muted} />
            </Pressable>
          ) : null}
        </View>
      </View>

      <FilterChipRow items={filters} selected={f} onSelect={setF} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + 24 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm }}>
          <Text style={{ fontSize: 13, color: colors.muted }}>{list.length} restaurant{list.length !== 1 ? "s" : ""}</Text>
          <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Ionicons name="swap-vertical" size={13} color={colors.onSurface} />
            <Text style={{ fontSize: 12, fontWeight: "600", color: colors.onSurface }}>Recommended</Text>
          </Pressable>
        </View>
        {list.length === 0 ? (
          <View style={{ paddingVertical: 40, alignItems: "center" }}>
            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: colors.surfaceSecondary, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="restaurant-outline" size={24} color={colors.muted} />
            </View>
            <Text style={{ fontSize: 15, fontWeight: "700", color: colors.onSurface, marginTop: spacing.md }}>Nothing matches</Text>
            <Text style={{ fontSize: 13, color: colors.muted, marginTop: 4 }}>Try clearing your filter</Text>
            <Pressable
              testID="clear-filters"
              onPress={() => { setF("all"); setQ(""); }}
              style={{
                marginTop: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: 10,
                borderRadius: radius.pill, backgroundColor: colors.brandPrimary,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "700" }}>Clear filters</Text>
            </Pressable>
          </View>
        ) : (
          list.map((r) => (
            <RestaurantCard key={r.id} r={r} onPress={() => router.push(`/delivery/restaurant/${r.id}`)} />
          ))
        )}
      </ScrollView>
    </View>
  );
}
