import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { StatusStepper } from "@/src/components/StatusStepper";

export default function Tracking() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const steps = [
    { title: "Order Confirmed", subtitle: "12:12 PM", done: true, icon: "checkmark-circle" },
    { title: "Preparing your food", subtitle: "12:20 PM", done: true, icon: "restaurant" },
    { title: "Rider picked up order", subtitle: "12:34 PM", done: false, active: true, icon: "bicycle" },
    { title: "Delivered", subtitle: "Estimated 12:45 PM", done: false, icon: "checkmark-done" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      {/* Faux map area */}
      <View style={{ flex: 1, backgroundColor: "#E8F1E9" }}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" }}
          style={{ width: "100%", height: "100%", opacity: 0.6 }}
          contentFit="cover"
        />
        {/* Map overlays */}
        <LinearGradient colors={["rgba(255,255,255,0.4)", "transparent"]} style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120 }} />
        <Pressable testID="tracking-back" onPress={() => router.back()} style={{
          position: "absolute", top: insets.top + 8, left: spacing.lg,
          width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFFFFF",
          alignItems: "center", justifyContent: "center", ...shadow.card,
        }}>
          <Ionicons name="chevron-back" size={22} color={colors.onSurface} />
        </Pressable>
        <View style={{
          position: "absolute", top: insets.top + 8, right: spacing.lg,
          backgroundColor: "#FFFFFF", paddingHorizontal: spacing.md, paddingVertical: 10,
          borderRadius: radius.pill, flexDirection: "row", alignItems: "center", gap: 6, ...shadow.card,
        }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.brandPrimary }} />
          <Text style={{ fontSize: 12, fontWeight: "800", color: colors.onSurface }}>Arriving in 11 min</Text>
        </View>

        {/* Rider pin */}
        <View style={{ position: "absolute", top: "45%", left: "40%" }}>
          <View style={{
            width: 44, height: 44, borderRadius: 22, backgroundColor: colors.brandPrimary,
            alignItems: "center", justifyContent: "center",
            borderWidth: 3, borderColor: "#FFFFFF", ...shadow.card,
          }}>
            <Ionicons name="bicycle" size={22} color="#FFFFFF" />
          </View>
        </View>
        <View style={{ position: "absolute", bottom: "38%", right: "20%" }}>
          <View style={{
            width: 36, height: 36, borderRadius: 18, backgroundColor: colors.onSurface,
            alignItems: "center", justifyContent: "center",
            borderWidth: 3, borderColor: "#FFFFFF", ...shadow.card,
          }}>
            <Ionicons name="home" size={16} color="#FFFFFF" />
          </View>
        </View>
      </View>

      {/* Bottom sheet */}
      <View style={{
        backgroundColor: colors.surface,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        paddingBottom: insets.bottom + spacing.md,
        marginTop: -28, ...shadow.sticky,
      }}>
        <View style={{ alignItems: "center", paddingTop: 10 }}>
          <View style={{ width: 40, height: 5, borderRadius: 3, backgroundColor: colors.border }} />
        </View>
        <ScrollView style={{ maxHeight: 360 }} contentContainerStyle={{ padding: spacing.lg }}>
          {/* Rider row */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.md }}>
            <Image source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" }} style={{ width: 52, height: 52, borderRadius: 26 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface }}>Farhan A.</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
                <Ionicons name="star" size={12} color="#F5A623" />
                <Text style={{ fontSize: 12, color: colors.muted }}>4.9 • Honda Wave • WCF 8829</Text>
              </View>
            </View>
            <Pressable style={roundBtn(colors.brandTertiary)}><Ionicons name="chatbubble" size={18} color={colors.brandPrimary} /></Pressable>
            <Pressable style={roundBtn(colors.brandPrimary)}><Ionicons name="call" size={18} color="#FFFFFF" /></Pressable>
          </View>

          <View style={{ height: 1, backgroundColor: colors.divider, marginBottom: spacing.md }} />

          <StatusStepper steps={steps} />

          <Pressable style={{
            marginTop: spacing.sm, borderRadius: radius.pill, paddingVertical: 12,
            borderWidth: 1.5, borderColor: colors.error,
            alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 6,
          }}>
            <Ionicons name="close-circle-outline" size={16} color={colors.error} />
            <Text style={{ fontSize: 13, fontWeight: "700", color: colors.error }}>Cancel Order</Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}

const roundBtn = (bg: string) => ({
  width: 40, height: 40, borderRadius: 20, backgroundColor: bg,
  alignItems: "center" as const, justifyContent: "center" as const,
});
