import { View, Text, Pressable, ScrollView, TextInput, Keyboard } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useMemo, useState } from "react";

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
  const [query, setQuery] = useState("");
  const searching = query.trim().length > 0;

  const filtered = useMemo(() => {
    let list = restaurants;
    if (chip !== "all") {
      list = list.filter((r) => r.cuisines.some((c) => c.toLowerCase().includes(chip)));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisines.join(" ").toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q)
      );
    }
    return list;
  }, [chip, query]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Compact header */}
      <View style={{ paddingTop: insets.top, backgroundColor: colors.surface }}>
        <View style={{
          flexDirection: "row", alignItems: "center",
          paddingHorizontal: spacing.lg, paddingVertical: 8,
          gap: spacing.md,
        }}>
          <Pressable style={{ flex: 1 }} testID="location-header">
            <Text style={{ fontSize: 10, color: colors.muted, fontWeight: "700", letterSpacing: 0.4 }}>DELIVER TO</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Ionicons name="location" size={14} color={colors.brandPrimary} />
              <Text style={{ fontSize: 14, fontWeight: "700", color: colors.onSurface }}>Bukit Bintang, KL</Text>
              <Ionicons name="chevron-down" size={14} color={colors.onSurface} />
            </View>
          </Pressable>
          <Pressable testID="notification-button" style={btnIcon(colors.surfaceSecondary)}>
            <Ionicons name="notifications-outline" size={18} color={colors.onSurface} />
            <View style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: 4, backgroundColor: colors.error }} />
          </Pressable>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" }}
            style={{ width: 36, height: 36, borderRadius: 18 }}
          />
        </View>

        {/* Search bar - always sticky under header */}
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: 8 }}>
          <View style={{
            flexDirection: "row", alignItems: "center", gap: spacing.sm,
            backgroundColor: colors.surfaceSecondary,
            paddingHorizontal: spacing.md, height: 42,
            borderRadius: radius.pill,
          }}>
            <Ionicons name="search" size={16} color={colors.muted} />
            <TextInput
              testID="search-input"
              value={query}
              onChangeText={setQuery}
              placeholder="Search restaurants or dishes"
              placeholderTextColor={colors.muted}
              returnKeyType="search"
              style={{ flex: 1, fontSize: 14, color: colors.onSurface, padding: 0 }}
            />
            {searching ? (
              <Pressable testID="clear-search" onPress={() => { setQuery(""); Keyboard.dismiss(); }}>
                <Ionicons name="close-circle" size={18} color={colors.muted} />
              </Pressable>
            ) : (
              <>
                <View style={{ width: 1, height: 18, backgroundColor: colors.border }} />
                <Ionicons name="options-outline" size={18} color={colors.onSurface} />
              </>
            )}
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {searching ? (
          <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md }}>
            <Text style={{ fontSize: 13, color: colors.muted, marginBottom: spacing.sm }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </Text>
            {filtered.length === 0 ? (
              <View style={{ paddingVertical: 40, alignItems: "center" }}>
                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: colors.surfaceSecondary, alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="search" size={24} color={colors.muted} />
                </View>
                <Text style={{ fontSize: 15, fontWeight: "700", color: colors.onSurface, marginTop: spacing.md }}>No matches yet</Text>
                <Text style={{ fontSize: 13, color: colors.muted, marginTop: 4, textAlign: "center" }}>
                  Try a different cuisine, dish or restaurant name
                </Text>
              </View>
            ) : (
              filtered.map((r) => (
                <RestaurantCard key={r.id} r={r} compact onPress={() => router.push(`/delivery/restaurant/${r.id}`)} />
              ))
            )}
          </View>
        ) : (
          <>
            <View style={{ paddingHorizontal: spacing.lg }}>
              {/* Service tiles 2x2 - compact */}
              <View style={{ marginTop: 6, gap: spacing.md }}>
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

              <Text style={sectionTitle(colors)}>Promos for you</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: spacing.md }}
            >
              {promos.map((p) => (
                <Pressable key={p.id} style={{
                  width: 250, height: 110, borderRadius: radius.lg, overflow: "hidden",
                  backgroundColor: p.color, ...shadow.card,
                }}>
                  <Image source={{ uri: p.image }} style={{ width: "100%", height: "100%", opacity: 0.5 }} contentFit="cover" />
                  <LinearGradient
                    colors={[p.color + "E6", p.color + "CC"]}
                    style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, padding: spacing.md, justifyContent: "space-between" }}
                  >
                    <View style={{ backgroundColor: "rgba(255,255,255,0.25)", alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill }}>
                      <Text style={{ color: "#FFFFFF", fontSize: 9, fontWeight: "800" }}>LIMITED TIME</Text>
                    </View>
                    <View>
                      <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "800" }}>{p.title}</Text>
                      <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 12 }}>{p.subtitle}</Text>
                    </View>
                  </LinearGradient>
                </Pressable>
              ))}
            </ScrollView>

            <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md }}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: colors.onSurface, marginBottom: 6 }}>Restaurants near you</Text>
            </View>
            <FilterChipRow items={cuisineChips} selected={chip} onSelect={setChip} />

            <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm }}>
              {filtered.map((r) => (
                <RestaurantCard key={r.id} r={r} onPress={() => router.push(`/delivery/restaurant/${r.id}`)} />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const btnIcon = (bg: string) => ({
  width: 36, height: 36, borderRadius: 18,
  backgroundColor: bg, alignItems: "center" as const, justifyContent: "center" as const,
});
const sectionTitle = (c: any) => ({
  fontSize: 16, fontWeight: "800" as const, color: c.onSurface,
  marginTop: spacing.lg, marginBottom: 8,
});
