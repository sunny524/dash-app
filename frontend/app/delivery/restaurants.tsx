import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { useTheme, spacing, radius } from "@/src/theme";
import { ScreenHeader } from "@/src/components/ScreenHeader";
import { RestaurantCard } from "@/src/components/RestaurantCard";
import { FilterChipRow } from "@/src/components/FilterChipRow";
import { restaurants } from "@/src/data/mock";

const filters = [
  { id: "all", label: "All", icon: "grid" },
  { id: "top", label: "Top Rated", icon: "star" },
  { id: "fast", label: "Under 20 min", icon: "flash" },
  { id: "promo", label: "Promo", icon: "pricetag" },
  { id: "cheap", label: "$", icon: "cash" },
  { id: "halal", label: "Halal", icon: "leaf" },
  { id: "free", label: "Free Delivery", icon: "bicycle" },
];

export default function DeliveryRestaurants() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [f, setF] = useState("all");

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <ScreenHeader title="Delivery" onBack={() => router.back()} right={
        <Pressable><Ionicons name="options-outline" size={22} color={colors.onSurface} /></Pressable>
      } />

      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm, backgroundColor: colors.surface }}>
        <View style={{
          flexDirection: "row", alignItems: "center", gap: spacing.md,
          backgroundColor: colors.surfaceSecondary,
          paddingHorizontal: spacing.md, height: 44, borderRadius: radius.pill,
        }}>
          <Ionicons name="search" size={16} color={colors.muted} />
          <TextInput placeholder="Nasi lemak, satay, dim sum..." placeholderTextColor={colors.muted} style={{ flex: 1, fontSize: 14, color: colors.onSurface }} />
        </View>
      </View>

      <FilterChipRow items={filters} selected={f} onSelect={setF} />

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: insets.bottom + 24 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md }}>
          <Text style={{ fontSize: 13, color: colors.muted }}>{restaurants.length} restaurants near you</Text>
          <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Ionicons name="swap-vertical" size={14} color={colors.onSurface} />
            <Text style={{ fontSize: 13, fontWeight: "600", color: colors.onSurface }}>Sort: Recommended</Text>
          </Pressable>
        </View>
        {restaurants.map((r) => (
          <RestaurantCard key={r.id} r={r} onPress={() => router.push(`/delivery/restaurant/${r.id}`)} />
        ))}
      </ScrollView>
    </View>
  );
}
