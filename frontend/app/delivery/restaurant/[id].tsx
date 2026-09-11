import { View, Text, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { restaurants, menuItems } from "@/src/data/mock";
import { StickyCTA } from "@/src/components/Buttons";
import { FilterChipRow } from "@/src/components/FilterChipRow";

const categories = [
  { id: "signature", label: "Signature" },
  { id: "breakfast", label: "Breakfast" },
  { id: "mains", label: "Mains" },
  { id: "grill", label: "Grill" },
  { id: "drinks", label: "Drinks" },
];

export default function RestaurantDetail() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [cat, setCat] = useState("signature");

  const r = restaurants.find((x) => x.id === id) ?? restaurants[0];

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 + insets.bottom }} showsVerticalScrollIndicator={false}>
        {/* Parallax-ish hero */}
        <View style={{ height: 260, backgroundColor: colors.surfaceTertiary }}>
          <Image source={{ uri: r.image }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          <LinearGradient colors={["rgba(0,0,0,0.3)", "transparent", "rgba(0,0,0,0.7)"]} style={{ position: "absolute", inset: 0 }} />
          <View style={{ position: "absolute", top: insets.top + spacing.sm, left: spacing.lg, right: spacing.lg, flexDirection: "row", justifyContent: "space-between" }}>
            <Pressable testID="restaurant-back" onPress={() => router.back()} style={roundBtn}>
              <Ionicons name="chevron-back" size={22} color="#1C1C1E" />
            </Pressable>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Pressable style={roundBtn}><Ionicons name="share-outline" size={20} color="#1C1C1E" /></Pressable>
              <Pressable style={roundBtn}><Ionicons name="heart-outline" size={20} color="#1C1C1E" /></Pressable>
            </View>
          </View>
          <View style={{ position: "absolute", bottom: spacing.lg, left: spacing.lg, right: spacing.lg }}>
            <View style={{ flexDirection: "row", gap: 6, marginBottom: 6 }}>
              {r.cuisines.map((c) => (
                <View key={c} style={{ backgroundColor: "rgba(255,255,255,0.25)", paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill }}>
                  <Text style={{ fontSize: 10, color: "#FFFFFF", fontWeight: "700" }}>{c.toUpperCase()}</Text>
                </View>
              ))}
            </View>
            <Text style={{ fontSize: 26, fontWeight: "800", color: "#FFFFFF" }}>{r.name}</Text>
            <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", marginTop: 2 }}>{r.address}</Text>
          </View>
        </View>

        {/* Info card */}
        <View style={{ marginHorizontal: spacing.lg, marginTop: -32, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, flexDirection: "row", ...shadow.card }}>
          <Pressable testID="view-reviews-btn" onPress={() => router.push("/delivery/reviews")} style={{ flex: 1 }}>
            <Info icon="star" value={r.rating.toFixed(1)} label={`${r.reviews}+ reviews`} accent />
          </Pressable>
          <Divider />
          <Info icon="time-outline" value={`${r.etaMin} min`} label="ETA" />
          <Divider />
          <Info icon="bicycle" value="RM 3.90" label="Delivery" />
        </View>

        {/* Highlight promo */}
        <View style={{ margin: spacing.lg, backgroundColor: colors.brandTertiary, borderRadius: radius.lg, padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md, borderWidth: 1, borderColor: colors.brandSecondary }}>
          <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.brandPrimary, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="pricetag" size={18} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: "800", color: colors.onSurface }}>20% OFF up to RM10</Text>
            <Text style={{ fontSize: 11, color: colors.muted }}>Use code EASYEAT20 • Min. spend RM25</Text>
          </View>
        </View>

        {/* Category chips */}
        <FilterChipRow items={categories} selected={cat} onSelect={setCat} />

        {/* Menu items */}
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md }}>
          <Text style={{ fontSize: 18, fontWeight: "800", color: colors.onSurface, marginBottom: spacing.md }}>Popular</Text>
          {menuItems.map((m) => (
            <Pressable
              key={m.id}
              testID={`menu-item-${m.id}`}
              onPress={() => router.push(`/delivery/item?id=${m.id}`)}
              style={{
                flexDirection: "row", gap: spacing.md,
                paddingVertical: spacing.md,
                borderBottomWidth: 1, borderBottomColor: colors.divider,
              }}
            >
              <View style={{ flex: 1 }}>
                {m.popular && (
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 4 }}>
                    <Ionicons name="flame" size={12} color={colors.warning} />
                    <Text style={{ fontSize: 10, fontWeight: "800", color: colors.warning }}>POPULAR</Text>
                  </View>
                )}
                <Text style={{ fontSize: 15, fontWeight: "700", color: colors.onSurface }}>{m.name}</Text>
                <Text style={{ fontSize: 12, color: colors.muted, marginTop: 4, lineHeight: 16 }} numberOfLines={2}>{m.description}</Text>
                <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface, marginTop: 8 }}>RM {m.price.toFixed(2)}</Text>
              </View>
              <View style={{ width: 100, height: 100, borderRadius: radius.md, overflow: "hidden", position: "relative" }}>
                <Image source={{ uri: m.image }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                <Pressable style={{
                  position: "absolute", bottom: -8, right: -8,
                  width: 32, height: 32, borderRadius: 16,
                  backgroundColor: colors.brandPrimary,
                  alignItems: "center", justifyContent: "center",
                  borderWidth: 2, borderColor: colors.surface,
                }}>
                  <Ionicons name="add" size={20} color="#FFFFFF" />
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <StickyCTA>
        <Pressable
          testID="view-cart-cta"
          onPress={() => router.push("/delivery/cart")}
          style={{
            backgroundColor: colors.brandPrimary,
            paddingVertical: 14, paddingHorizontal: spacing.lg,
            borderRadius: radius.pill,
            flexDirection: "row", alignItems: "center", gap: spacing.md,
          }}
        >
          <View style={{ backgroundColor: "rgba(255,255,255,0.25)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill }}>
            <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "800" }}>2</Text>
          </View>
          <Text style={{ flex: 1, color: "#FFFFFF", fontSize: 15, fontWeight: "700", textAlign: "center" }}>View Cart</Text>
          <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>RM 30.40</Text>
        </Pressable>
      </StickyCTA>
    </View>
  );
}

const roundBtn = {
  width: 40, height: 40, borderRadius: 20,
  backgroundColor: "rgba(255,255,255,0.95)",
  alignItems: "center" as const, justifyContent: "center" as const,
};

function Info({ icon, value, label, accent }: { icon: string; value: string; label: string; accent?: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Ionicons name={icon as any} size={14} color={accent ? colors.brandPrimary : colors.onSurface} />
        <Text style={{ fontSize: 14, fontWeight: "800", color: colors.onSurface }}>{value}</Text>
      </View>
      <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>{label}</Text>
    </View>
  );
}
function Divider() {
  const { colors } = useTheme();
  return <View style={{ width: 1, backgroundColor: colors.border, marginHorizontal: spacing.sm }} />;
}
