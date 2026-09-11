import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { menuItems } from "@/src/data/mock";
import { FilterChipRow } from "@/src/components/FilterChipRow";
import { StickyCTA } from "@/src/components/Buttons";

const cats = [
  { id: "signature", label: "Signature" },
  { id: "breakfast", label: "Breakfast" },
  { id: "mains", label: "Mains" },
  { id: "grill", label: "Grill" },
  { id: "drinks", label: "Drinks" },
  { id: "dessert", label: "Dessert" },
];

export default function DineMenu() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [cat, setCat] = useState("signature");

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <View style={{ paddingTop: insets.top, backgroundColor: colors.brandPrimary }}>
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <Pressable testID="dine-back" onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </Pressable>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Ionicons name="location" size={12} color="rgba(255,255,255,0.9)" />
              <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.9)", fontWeight: "600" }}>Nasi Lemak Village</Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: "800", color: "#FFFFFF", marginTop: 2 }}>Table 5 • 2 guests</Text>
          </View>
          <Pressable style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="people" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md }}>
        <View style={{
          backgroundColor: colors.brandTertiary, borderRadius: radius.lg,
          padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md,
          borderWidth: 1, borderColor: colors.brandSecondary,
        }}>
          <Ionicons name="checkmark-circle" size={22} color={colors.brandPrimary} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: "800", color: colors.onSurface }}>You&apos;re seated at Table 5</Text>
            <Text style={{ fontSize: 11, color: colors.muted }}>Orders will go straight to the kitchen</Text>
          </View>
        </View>
      </View>

      <FilterChipRow items={cats} selected={cat} onSelect={setCat} />

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 140 + insets.bottom }}>
        <Text style={{ fontSize: 16, fontWeight: "800", color: colors.onSurface, marginBottom: spacing.md }}>Signature Dishes</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.md }}>
          {menuItems.map((m) => (
            <View key={m.id} style={{ width: "48%", backgroundColor: colors.surface, borderRadius: radius.lg, overflow: "hidden", ...shadow.card }}>
              <Image source={{ uri: m.image }} style={{ width: "100%", height: 120 }} contentFit="cover" />
              <View style={{ padding: spacing.md }}>
                <Text style={{ fontSize: 13, fontWeight: "700", color: colors.onSurface }} numberOfLines={1}>{m.name}</Text>
                <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }} numberOfLines={2}>{m.description}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.sm }}>
                  <Text style={{ fontSize: 13, fontWeight: "800", color: colors.onSurface }}>RM {m.price.toFixed(2)}</Text>
                  <Pressable style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: colors.brandPrimary, alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name="add" size={16} color="#FFFFFF" />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Pressable style={{
        position: "absolute", right: spacing.lg, bottom: 120,
        backgroundColor: colors.onSurface, paddingHorizontal: spacing.md,
        height: 46, borderRadius: 23,
        flexDirection: "row", alignItems: "center", gap: 8,
        ...shadow.card,
      }}>
        <Ionicons name="hand-left" size={18} color="#FFFFFF" />
        <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "700" }}>Call Waiter</Text>
      </Pressable>

      <StickyCTA>
        <Pressable
          testID="view-tab-cta"
          onPress={() => router.push("/dine-in/bill")}
          style={{
            backgroundColor: colors.brandPrimary, paddingVertical: 15,
            borderRadius: radius.pill, flexDirection: "row",
            alignItems: "center", paddingHorizontal: spacing.lg,
          }}
        >
          <View style={{ backgroundColor: "rgba(255,255,255,0.25)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill }}>
            <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "800" }}>4</Text>
          </View>
          <Text style={{ flex: 1, color: "#FFFFFF", fontSize: 15, fontWeight: "800", textAlign: "center" }}>View Tab & Pay</Text>
          <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>RM 62.50</Text>
        </Pressable>
      </StickyCTA>
    </View>
  );
}
