import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { ScreenHeader } from "@/src/components/ScreenHeader";
import { StatusStepper } from "@/src/components/StatusStepper";

export default function PickupStatus() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const steps = [
    { title: "Order received", subtitle: "12:30 PM", done: true },
    { title: "Kitchen is preparing", subtitle: "12:32 PM", done: true },
    { title: "Ready for pickup!", subtitle: "Est. 12:52 PM", done: false, active: true },
    { title: "Picked up", subtitle: "", done: false },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      <ScreenHeader title="Pickup Order" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + 40, gap: spacing.md }}>
        {/* Order number hero card */}
        <View style={{
          backgroundColor: colors.brandPrimary, borderRadius: radius.lg,
          padding: spacing.xl, alignItems: "center", ...shadow.card,
        }}>
          <View style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.pill, backgroundColor: "rgba(255,255,255,0.25)", flexDirection: "row", alignItems: "center", gap: 6 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#FFFFFF" }} />
            <Text style={{ fontSize: 10, fontWeight: "800", color: "#FFFFFF" }}>PREPARING NOW</Text>
          </View>
          <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", marginTop: spacing.md }}>Order Number</Text>
          <Text style={{ fontSize: 56, fontWeight: "800", color: "#FFFFFF", letterSpacing: 4, marginTop: 4 }}>#A247</Text>
          <View style={{ height: 1, backgroundColor: "rgba(255,255,255,0.25)", alignSelf: "stretch", marginVertical: spacing.md }} />
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", alignSelf: "stretch" }}>
            <View style={{ alignItems: "center" }}>
              <Ionicons name="time-outline" size={18} color="#FFFFFF" />
              <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>Ready by</Text>
              <Text style={{ fontSize: 16, fontWeight: "800", color: "#FFFFFF" }}>12:52 PM</Text>
            </View>
            <View style={{ width: 1, height: 40, backgroundColor: "rgba(255,255,255,0.25)" }} />
            <View style={{ alignItems: "center" }}>
              <Ionicons name="hourglass-outline" size={18} color="#FFFFFF" />
              <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>In</Text>
              <Text style={{ fontSize: 16, fontWeight: "800", color: "#FFFFFF" }}>18 min</Text>
            </View>
          </View>
        </View>

        {/* Restaurant address */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md, ...shadow.card }}>
          <Image source={{ uri: "https://images.unsplash.com/photo-1696385793104-745d4dd65c5a?w=200&q=80" }} style={{ width: 56, height: 56, borderRadius: radius.md }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface }}>Satay Station</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
              <Ionicons name="location-outline" size={12} color={colors.muted} />
              <Text style={{ fontSize: 12, color: colors.muted, flex: 1 }} numberOfLines={1}>Kampung Baru, KL</Text>
            </View>
          </View>
          <Pressable style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTertiary, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="navigate" size={18} color={colors.brandPrimary} />
          </Pressable>
        </View>

        {/* Stepper */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card }}>
          <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface, marginBottom: spacing.sm }}>Progress</Text>
          <StatusStepper steps={steps} />
        </View>

        {/* Order summary compact */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card }}>
          <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface, marginBottom: spacing.sm }}>Order Summary</Text>
          <SumRow label="Chicken Satay x1" value="RM 18.00" />
          <SumRow label="Nasi Lemak x1" value="RM 15.90" />
          <SumRow label="Teh Tarik x2" value="RM 7.00" />
          <View style={{ height: 1, backgroundColor: colors.divider, marginVertical: 6 }} />
          <SumRow label="Total paid" value="RM 40.90" bold />
        </View>

        <View style={{ backgroundColor: colors.brandTertiary, borderRadius: radius.lg, padding: spacing.md, flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons name="notifications" size={18} color={colors.brandPrimary} />
          <Text style={{ flex: 1, fontSize: 12, color: colors.onSurface, fontWeight: "600" }}>
            We&apos;ll notify you the moment it&apos;s ready to pick up.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function SumRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 }}>
      <Text style={{ fontSize: bold ? 14 : 13, color: colors.onSurface, fontWeight: bold ? "800" : "500" }}>{label}</Text>
      <Text style={{ fontSize: bold ? 15 : 13, color: colors.onSurface, fontWeight: bold ? "800" : "700" }}>{value}</Text>
    </View>
  );
}
