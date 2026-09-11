import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useTheme, spacing, radius, shadow } from "@/src/theme";

export default function BookingConfirmation() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      {/* Success hero */}
      <View style={{ paddingTop: insets.top + spacing.xl, backgroundColor: colors.brandPrimary, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, alignItems: "center", paddingBottom: spacing.xxl }}>
        <View style={{
          width: 88, height: 88, borderRadius: 44,
          backgroundColor: "rgba(255,255,255,0.2)",
          alignItems: "center", justifyContent: "center",
          borderWidth: 4, borderColor: "rgba(255,255,255,0.3)",
        }}>
          <Ionicons name="checkmark" size={44} color="#FFFFFF" />
        </View>
        <Text style={{ fontSize: 24, fontWeight: "800", color: "#FFFFFF", marginTop: spacing.md }}>Booking Confirmed!</Text>
        <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", marginTop: 4 }}>Reference: EE-2024-BK-A247</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, marginTop: -spacing.xl, paddingBottom: insets.bottom + 24, gap: spacing.md }}>
        {/* Booking card */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, overflow: "hidden", ...shadow.card }}>
          <Image source={{ uri: "https://images.unsplash.com/photo-1767298113547-11e95951608b?w=800&q=80" }} style={{ width: "100%", height: 140 }} contentFit="cover" />
          <View style={{ padding: spacing.md }}>
            <Text style={{ fontSize: 18, fontWeight: "800", color: colors.onSurface }}>Dim Sum Palace</Text>
            <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>Pavilion KL, Level 6</Text>

            <View style={{ flexDirection: "row", marginTop: spacing.md, gap: spacing.md }}>
              <Fact icon="calendar" label="Date" value="Sat, 25 May 2025" />
              <Fact icon="time" label="Time" value="7:30 PM" />
            </View>
            <View style={{ flexDirection: "row", marginTop: spacing.md, gap: spacing.md }}>
              <Fact icon="people" label="Party" value="4 people" />
              <Fact icon="restaurant" label="Table" value="Indoor" />
            </View>

            <View style={{ marginTop: spacing.md, padding: spacing.md, backgroundColor: colors.brandTertiary, borderRadius: radius.md }}>
              <Text style={{ fontSize: 11, color: colors.muted, fontWeight: "700" }}>SPECIAL REQUEST</Text>
              <Text style={{ fontSize: 13, color: colors.onSurface, marginTop: 4 }}>Anniversary dinner — window seat please 🎉</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, ...shadow.card, overflow: "hidden" }}>
          <ActionRow icon="calendar-outline" label="Add to Calendar" />
          <ActionRow icon="share-outline" label="Share Booking" />
          <ActionRow icon="pencil-outline" label="Modify or Reschedule" />
          <ActionRow icon="close-circle-outline" label="Cancel Booking" danger noBorder />
        </View>

        {/* Info banner */}
        <View style={{ padding: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, flexDirection: "row", alignItems: "flex-start", gap: 10, ...shadow.card }}>
          <Ionicons name="information-circle" size={18} color={colors.brandPrimary} />
          <Text style={{ flex: 1, fontSize: 12, color: colors.muted, lineHeight: 18 }}>
            Free cancellation up to 2 hours before your booking. We&apos;ll send you a reminder 1 day before.
          </Text>
        </View>

        <Pressable
          testID="done-cta"
          onPress={() => router.replace("/(tabs)/bookings")}
          style={{
            backgroundColor: colors.brandPrimary, paddingVertical: 15,
            borderRadius: radius.pill, alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>View My Bookings</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function Fact({ icon, label, value }: { icon: string; label: string; value: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.brandTertiary, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name={icon as any} size={16} color={colors.brandPrimary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 10, color: colors.muted, fontWeight: "700" }}>{label.toUpperCase()}</Text>
        <Text style={{ fontSize: 13, fontWeight: "700", color: colors.onSurface, marginTop: 2 }}>{value}</Text>
      </View>
    </View>
  );
}

function ActionRow({ icon, label, danger, noBorder }: { icon: string; label: string; danger?: boolean; noBorder?: boolean }) {
  const { colors } = useTheme();
  return (
    <Pressable style={{
      flexDirection: "row", alignItems: "center", gap: spacing.md,
      paddingHorizontal: spacing.md, paddingVertical: spacing.md,
      borderBottomWidth: noBorder ? 0 : 1,
      borderBottomColor: colors.divider,
    }}>
      <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: danger ? "#FEE" : colors.brandTertiary, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name={icon as any} size={18} color={danger ? colors.error : colors.brandPrimary} />
      </View>
      <Text style={{ flex: 1, fontSize: 14, fontWeight: "600", color: danger ? colors.error : colors.onSurface }}>{label}</Text>
      {!danger && <Ionicons name="chevron-forward" size={18} color={colors.muted} />}
    </Pressable>
  );
}
