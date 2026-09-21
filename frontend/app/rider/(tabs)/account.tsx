import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";

import { spacing, radius } from "@/src/theme";
import { rider as c, riderProfile } from "@/src/data/rider-mock";

const settings = [
  { icon: "bicycle", label: "Vehicle & Documents", sub: `${riderProfile.vehicle.model} • ${riderProfile.vehicle.plate}` },
  { icon: "card", label: "Bank & Cash Out", sub: "Maybank ••2841" },
  { icon: "shield-checkmark", label: "Safety & Insurance", sub: "All coverage active" },
  { icon: "trophy", label: "Achievements", sub: "8 badges earned" },
  { icon: "notifications", label: "Notifications", sub: "Push, SMS" },
  { icon: "school", label: "Training Center", sub: "3 new modules" },
  { icon: "help-circle", label: "Help Center" },
  { icon: "language", label: "Language", sub: "Bahasa Malaysia" },
  { icon: "log-out", label: "Sign Out", danger: true },
];

export default function Account() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        <View style={{ paddingTop: insets.top + spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, backgroundColor: c.bg2, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, borderBottomWidth: 1, borderBottomColor: c.border }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <Image
              source={{ uri: riderProfile.avatar }}
              style={{ width: 68, height: 68, borderRadius: 34, borderWidth: 3, borderColor: c.brand }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ color: c.text, fontSize: 20, fontWeight: "800" }}>{riderProfile.name}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
                <Ionicons name="star" size={13} color={c.warning} />
                <Text style={{ color: c.text, fontSize: 13, fontWeight: "700" }}>{riderProfile.rating}</Text>
                <Text style={{ color: c.textDim, fontSize: 12 }}>• {riderProfile.totalDeliveries} trips</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 6, marginTop: 6 }}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.pill, backgroundColor: c.brandDim, flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Ionicons name="ribbon" size={11} color={c.brand} />
                  <Text style={{ color: c.brand, fontSize: 10, fontWeight: "800" }}>ELITE RIDER</Text>
                </View>
              </View>
            </View>
            <Pressable style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: c.bg3, borderWidth: 1, borderColor: c.border, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="pencil" size={16} color={c.text} />
            </Pressable>
          </View>

          {/* Vehicle summary */}
          <View style={{ marginTop: spacing.lg, flexDirection: "row", backgroundColor: c.bg3, borderRadius: radius.lg, padding: spacing.md, gap: spacing.md, borderWidth: 1, borderColor: c.border }}>
            <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: c.brandDim, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="bicycle" size={22} color={c.brand} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: c.textDim, fontSize: 10, fontWeight: "800", letterSpacing: 0.5 }}>MY VEHICLE</Text>
              <Text style={{ color: c.text, fontSize: 14, fontWeight: "800", marginTop: 2 }}>{riderProfile.vehicle.model}</Text>
              <Text style={{ color: c.textDim, fontSize: 12 }}>Plate {riderProfile.vehicle.plate}</Text>
            </View>
            <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: c.brandDim, alignSelf: "flex-start" }}>
              <Text style={{ color: c.brand, fontSize: 10, fontWeight: "800" }}>ACTIVE</Text>
            </View>
          </View>

          {/* Perf metrics */}
          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
            <Metric label="Accept" value={`${riderProfile.acceptanceRate}%`} />
            <Metric label="Complete" value={`${riderProfile.completionRate}%`} />
            <Metric label="Since" value={riderProfile.memberSince.split(" ")[1]} />
          </View>
        </View>

        {/* Switch to customer */}
        <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.lg }}>
          <Pressable
            testID="switch-to-customer"
            onPress={() => router.replace("/(tabs)/home")}
            style={{
              backgroundColor: c.bg2, borderRadius: radius.lg,
              padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md,
              borderWidth: 1, borderColor: c.border,
            }}
          >
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: c.brandDim, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="swap-horizontal" size={18} color={c.brand} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: c.text, fontSize: 14, fontWeight: "800" }}>Switch to Customer app</Text>
              <Text style={{ color: c.textDim, fontSize: 11, marginTop: 2 }}>Order food, book tables, dine-in</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={c.textDim} />
          </Pressable>
        </View>

        {/* Settings list */}
        <View style={{
          marginHorizontal: spacing.lg, marginTop: spacing.md,
          backgroundColor: c.bg2, borderRadius: radius.lg, overflow: "hidden",
          borderWidth: 1, borderColor: c.border,
        }}>
          {settings.map((s, i) => (
            <Pressable
              key={s.label}
              testID={`rider-setting-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
              style={{
                flexDirection: "row", alignItems: "center", gap: spacing.md,
                paddingHorizontal: spacing.md, paddingVertical: spacing.md,
                borderBottomWidth: i === settings.length - 1 ? 0 : 1,
                borderBottomColor: c.divider,
              }}
            >
              <View style={{
                width: 36, height: 36, borderRadius: 10,
                backgroundColor: s.danger ? "#3B1A1A" : c.brandDim,
                alignItems: "center", justifyContent: "center",
              }}>
                <Ionicons name={s.icon as any} size={18} color={s.danger ? c.error : c.brand} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: s.danger ? c.error : c.text, fontSize: 14, fontWeight: "600" }}>{s.label}</Text>
                {s.sub ? <Text style={{ color: c.textDim, fontSize: 11, marginTop: 2 }}>{s.sub}</Text> : null}
              </View>
              {!s.danger && <Ionicons name="chevron-forward" size={16} color={c.textDim} />}
            </Pressable>
          ))}
        </View>

        <Text style={{ textAlign: "center", color: c.textMuted, fontSize: 11, marginTop: spacing.lg }}>
          Dash Rider v1.0.0 • Ride safe 🛵
        </Text>
      </ScrollView>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flex: 1, backgroundColor: c.bg3, borderRadius: radius.md, padding: 10, borderWidth: 1, borderColor: c.border }}>
      <Text style={{ color: c.text, fontSize: 16, fontWeight: "800" }}>{value}</Text>
      <Text style={{ color: c.textDim, fontSize: 10, marginTop: 2 }}>{label}</Text>
    </View>
  );
}
