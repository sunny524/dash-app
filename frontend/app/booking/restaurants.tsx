import { View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useTheme, spacing, radius } from "@/src/theme";
import { ScreenHeader } from "@/src/components/ScreenHeader";
import { RestaurantCard } from "@/src/components/RestaurantCard";
import { restaurants } from "@/src/data/mock";

export default function BookingRestaurants() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const list = restaurants.filter((r) => r.bookingAvailable);

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <ScreenHeader title="Book a Table" onBack={() => router.back()} />
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md }}>
        <View style={{
          backgroundColor: colors.brandTertiary, borderRadius: radius.lg,
          padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md,
        }}>
          <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.brandPrimary, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="calendar" size={20} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: "800", color: colors.onSurface }}>Reserve ahead</Text>
            <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>Free cancellation up to 2 hours before</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: insets.bottom + 24 }}>
        <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface, marginBottom: spacing.md }}>Restaurants accepting reservations</Text>
        {list.map((r) => (
          <RestaurantCard key={r.id} r={r} onPress={() => router.push("/booking/book")} />
        ))}
      </ScrollView>
    </View>
  );
}
