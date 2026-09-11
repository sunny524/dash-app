import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { bookings } from "@/src/data/mock";

export default function BookingsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [tab, setTab] = useState<"Upcoming" | "Past">("Upcoming");

  const upcoming = bookings.filter((b) => b.status === "Confirmed");
  const past = bookings.filter((b) => b.status !== "Confirmed");
  const list = tab === "Upcoming" ? upcoming : past;

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      <View style={{ paddingTop: insets.top, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: "800", color: colors.onSurface }}>My Bookings</Text>
            <Text style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>Manage your table reservations</Text>
          </View>
          <Pressable
            testID="new-booking-button"
            onPress={() => router.push("/booking/restaurants")}
            style={{
              width: 44, height: 44, borderRadius: 22,
              backgroundColor: colors.brandPrimary,
              alignItems: "center", justifyContent: "center",
            }}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </Pressable>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: spacing.lg, paddingBottom: spacing.sm, gap: spacing.sm }}>
          {(["Upcoming", "Past"] as const).map((t) => {
            const active = t === tab;
            return (
              <Pressable
                key={t}
                testID={`bookings-tab-${t}`}
                onPress={() => setTab(t)}
                style={{
                  paddingHorizontal: spacing.lg, paddingVertical: 8,
                  borderRadius: radius.pill,
                  backgroundColor: active ? colors.brandPrimary : colors.surfaceSecondary,
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: "700", color: active ? colors.onBrandPrimary : colors.onSurfaceSecondary }}>{t}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: insets.bottom + 24 }}>
        {list.map((b) => (
          <Pressable
            key={b.id}
            testID={`booking-card-${b.id}`}
            onPress={() => router.push("/booking/confirmation")}
            style={{
              backgroundColor: colors.surface, borderRadius: radius.lg,
              overflow: "hidden", ...shadow.card,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image source={{ uri: b.image }} style={{ width: 110, height: 130 }} />
              <View style={{ flex: 1, padding: spacing.md, justifyContent: "space-between" }}>
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <View style={{
                      width: 8, height: 8, borderRadius: 4,
                      backgroundColor: b.status === "Confirmed" ? colors.brandPrimary : colors.muted,
                    }} />
                    <Text style={{ fontSize: 11, color: colors.muted, fontWeight: "700" }}>{b.status.toUpperCase()}</Text>
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: "800", color: colors.onSurface, marginTop: 4 }} numberOfLines={1}>{b.restaurant}</Text>
                  <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }} numberOfLines={1}>{b.address}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: spacing.md }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Ionicons name="calendar-outline" size={13} color={colors.onSurfaceSecondary} />
                    <Text style={{ fontSize: 12, color: colors.onSurfaceSecondary, fontWeight: "600" }}>{b.date}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Ionicons name="time-outline" size={13} color={colors.onSurfaceSecondary} />
                    <Text style={{ fontSize: 12, color: colors.onSurfaceSecondary, fontWeight: "600" }}>{b.time}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Ionicons name="people-outline" size={13} color={colors.onSurfaceSecondary} />
                    <Text style={{ fontSize: 12, color: colors.onSurfaceSecondary, fontWeight: "600" }}>{b.partySize}</Text>
                  </View>
                </View>
              </View>
            </View>
            {b.status === "Confirmed" && (
              <View style={{
                flexDirection: "row", borderTopWidth: 1, borderTopColor: colors.divider,
              }}>
                <ActionBtn icon="calendar" label="Add to Calendar" />
                <View style={{ width: 1, backgroundColor: colors.divider }} />
                <ActionBtn icon="pencil" label="Reschedule" />
                <View style={{ width: 1, backgroundColor: colors.divider }} />
                <ActionBtn icon="close-circle-outline" label="Cancel" danger />
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function ActionBtn({ icon, label, danger }: { icon: string; label: string; danger?: boolean }) {
  const { colors } = useTheme();
  return (
    <Pressable style={{
      flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
      gap: 6, paddingVertical: spacing.md,
    }}>
      <Ionicons name={icon as any} size={14} color={danger ? colors.error : colors.brandPrimary} />
      <Text style={{ fontSize: 12, fontWeight: "700", color: danger ? colors.error : colors.brandPrimary }}>{label}</Text>
    </Pressable>
  );
}
