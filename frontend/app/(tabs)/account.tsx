import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useTheme, spacing, radius, shadow } from "@/src/theme";

const settings = [
  { icon: "location", label: "Saved Addresses", sub: "3 saved" },
  { icon: "card", label: "Payment Methods", sub: "Visa •••• 4821 + 3 more" },
  { icon: "heart", label: "Favorites", sub: "12 restaurants" },
  { icon: "pricetag", label: "Promos & Vouchers", sub: "5 available" },
  { icon: "notifications", label: "Notifications", sub: "Push, Email, SMS" },
  { icon: "language", label: "Language", sub: "English (MY)" },
  { icon: "help-circle", label: "Help Center" },
  { icon: "shield-checkmark", label: "Privacy & Terms" },
  { icon: "log-out", label: "Sign Out", danger: true },
];

export default function AccountScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        <View style={{
          paddingTop: insets.top + spacing.md,
          paddingHorizontal: spacing.lg, paddingBottom: spacing.xl,
          backgroundColor: colors.surface,
          borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
        }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" }}
              style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 3, borderColor: colors.brandTertiary }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "800", color: colors.onSurface }}>Aisyah Rahman</Text>
              <Text style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>+60 12 345 6789</Text>
              <View style={{ flexDirection: "row", gap: 6, marginTop: 6 }}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.pill, backgroundColor: colors.brandTertiary, flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Ionicons name="star" size={11} color={colors.brandPrimary} />
                  <Text style={{ fontSize: 11, fontWeight: "700", color: colors.brandPrimary }}>GOLD MEMBER</Text>
                </View>
              </View>
            </View>
            <Pressable style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceSecondary, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="pencil" size={16} color={colors.onSurface} />
            </Pressable>
          </View>

          {/* Stat cards */}
          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg }}>
            <Stat value="147" label="Orders" />
            <Stat value="12" label="Bookings" />
            <Stat value="RM 2.4k" label="Saved" />
          </View>
        </View>

        {/* Reward banner */}
        <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.lg }}>
          <View style={{
            backgroundColor: colors.onSurface, borderRadius: radius.lg,
            padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md,
            ...shadow.card,
          }}>
            <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: colors.brandPrimary, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="gift" size={22} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "800", color: "#FFFFFF" }}>2,410 EasyPoints</Text>
              <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>590 more to next reward</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
          </View>
        </View>

        {/* Settings list */}
        <View style={{
          marginHorizontal: spacing.lg, marginTop: spacing.lg,
          backgroundColor: colors.surface, borderRadius: radius.lg,
          ...shadow.card, overflow: "hidden",
        }}>
          {settings.map((s, i) => (
            <Pressable
              key={s.label}
              testID={`setting-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
              style={{
                flexDirection: "row", alignItems: "center", gap: spacing.md,
                paddingHorizontal: spacing.md, paddingVertical: spacing.md,
                borderBottomWidth: i === settings.length - 1 ? 0 : 1,
                borderBottomColor: colors.divider,
              }}
            >
              <View style={{
                width: 36, height: 36, borderRadius: 10,
                backgroundColor: s.danger ? "#FEE" : colors.brandTertiary,
                alignItems: "center", justifyContent: "center",
              }}>
                <Ionicons name={s.icon as any} size={18} color={s.danger ? colors.error : colors.brandPrimary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: "600", color: s.danger ? colors.error : colors.onSurface }}>{s.label}</Text>
                {s.sub ? <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{s.sub}</Text> : null}
              </View>
              {!s.danger && <Ionicons name="chevron-forward" size={18} color={colors.muted} />}
            </Pressable>
          ))}
        </View>

        <Text style={{ textAlign: "center", fontSize: 11, color: colors.muted, marginTop: spacing.xl }}>
          EasyEat v1.0.0 • Made in Malaysia 🇲🇾
        </Text>
      </ScrollView>
    </View>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  const { colors } = useTheme();
  return (
    <View style={{
      flex: 1, backgroundColor: colors.surfaceSecondary,
      padding: spacing.md, borderRadius: radius.md,
    }}>
      <Text style={{ fontSize: 18, fontWeight: "800", color: colors.onSurface }}>{value}</Text>
      <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>{label}</Text>
    </View>
  );
}
