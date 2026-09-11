import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { ServiceTile } from "@/src/components/ServiceTile";
import { FilterChipRow } from "@/src/components/FilterChipRow";
import { RestaurantCard } from "@/src/components/RestaurantCard";
import { restaurants, cuisineChips, promos } from "@/src/data/mock";

export default function Home() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [chip, setChip] = useState("all");

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Sticky-ish header */}
      <View style={{ paddingTop: insets.top, backgroundColor: colors.surface }}>
        <View style={{
          flexDirection: "row", alignItems: "center",
          paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
          gap: spacing.md,
        }}>
          <Pressable style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: colors.muted, fontWeight: "600" }}>DELIVER TO</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Ionicons name="location" size={16} color={colors.brandPrimary} />
              <Text style={{ fontSize: 15, fontWeight: "700", color: colors.onSurface }}>Bukit Bintang, KL</Text>
              <Ionicons name="chevron-down" size={16} color={colors.onSurface} />
            </View>
          </Pressable>
          <Pressable testID="notification-button" style={btnIcon(colors.surfaceSecondary)}>
            <Ionicons name="notifications-outline" size={20} color={colors.onSurface} />
            <View style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.error }} />
          </Pressable>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        stickyHeaderIndices={[2]}
      >
        {/* Search + service tiles + promos section */}
        <View style={{ paddingHorizontal: spacing.lg }}>
          <View style={{
            flexDirection: "row", alignItems: "center", gap: spacing.md,
            backgroundColor: colors.surfaceSecondary,
            paddingHorizontal: spacing.md, height: 48,
            borderRadius: radius.pill,
          }}>
            <Ionicons name="search" size={18} color={colors.muted} />
            <TextInput
              testID="search-input"
              placeholder="Search restaurants or dishes"
              placeholderTextColor={colors.muted}
              style={{ flex: 1, fontSize: 14, color: colors.onSurface }}
            />
            <View style={{ width: 1, height: 20, backgroundColor: colors.border }} />
            <Ionicons name="options-outline" size={20} color={colors.onSurface} />
          </View>

          {/* Service tiles 2x2 */}
          <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
            <View style={{ flexDirection: "row", gap: spacing.md }}>
              <ServiceTile testID="tile-delivery" icon="bicycle" label="Delivery" subtitle="From RM3.90"
                onPress={() => router.push("/delivery/restaurants")} badge="20% OFF" />
              <ServiceTile testID="tile-dine-in" icon="qr-code" label="Dine-in" subtitle="Scan table QR"
                onPress={() => router.push("/dine-in/scanner")} />
            </View>
            <View style={{ flexDirection: "row", gap: spacing.md }}>
              <ServiceTile testID="tile-pickup" icon="bag-handle" label="Pickup" subtitle="Skip the queue"
                onPress={() => router.push("/pickup/restaurants")} />
              <ServiceTile testID="tile-booking" icon="calendar" label="Book a Table" subtitle="Reserve ahead"
                onPress={() => router.push("/booking/restaurants")} />
            </View>
          </View>

          {/* Promo carousel */}
          <Text style={sectionTitle(colors)}>Promos for you</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: spacing.md }}
        >
          {promos.map((p) => (
            <Pressable key={p.id} style={{
              width: 280, height: 130, borderRadius: radius.lg, overflow: "hidden",
              backgroundColor: p.color, ...shadow.card,
            }}>
              <Image source={{ uri: p.image }} style={{ width: "100%", height: "100%", opacity: 0.5 }} contentFit="cover" />
              <LinearGradient
                colors={[p.color + "E6", p.color + "CC"]}
                style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, padding: spacing.lg, justifyContent: "space-between" }}
              >
                <View style={{ backgroundColor: "rgba(255,255,255,0.25)", alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.pill }}>
                  <Text style={{ color: "#FFFFFF", fontSize: 10, fontWeight: "700" }}>LIMITED TIME</Text>
                </View>
                <View>
                  <Text style={{ color: "#FFFFFF", fontSize: 22, fontWeight: "800" }}>{p.title}</Text>
                  <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, marginTop: 2 }}>{p.subtitle}</Text>
                </View>
              </LinearGradient>
            </Pressable>
          ))}
        </ScrollView>

        {/* Sticky chips */}
        <View>
          <Text style={[sectionTitle(colors), { paddingHorizontal: spacing.lg, backgroundColor: colors.surface }]}>Restaurants near you</Text>
          <FilterChipRow items={cuisineChips} selected={chip} onSelect={setChip} />
        </View>

        {/* Restaurant list */}
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md }}>
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} r={r} onPress={() => router.push(`/delivery/restaurant/${r.id}`)} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const btnIcon = (bg: string) => ({
  width: 40, height: 40, borderRadius: 20,
  backgroundColor: bg, alignItems: "center" as const, justifyContent: "center" as const,
});
const sectionTitle = (c: any) => ({
  fontSize: 17, fontWeight: "800" as const, color: c.onSurface,
  marginTop: spacing.xl, marginBottom: spacing.md,
});
