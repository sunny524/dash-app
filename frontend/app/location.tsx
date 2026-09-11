import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useTheme, spacing, radius } from "@/src/theme";
import { PillButton } from "@/src/components/Buttons";
import { ScreenHeader } from "@/src/components/ScreenHeader";
import { addresses } from "@/src/data/mock";

export default function Location() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <ScreenHeader title="Set your location" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}>
        <View style={{ height: 260, backgroundColor: colors.surfaceSecondary }}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" }}
            style={{ width: "100%", height: "100%", opacity: 0.85 }}
            contentFit="cover"
          />
          <View style={{ position: "absolute", top: "45%", left: "50%", marginLeft: -20 }}>
            <View style={{
              width: 40, height: 40, borderRadius: 20,
              backgroundColor: colors.brandPrimary,
              alignItems: "center", justifyContent: "center",
              borderWidth: 3, borderColor: "#FFFFFF",
            }}>
              <Ionicons name="location" size={20} color="#FFFFFF" />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: spacing.xl, paddingTop: spacing.xl }}>
          <Text style={{ fontSize: 22, fontWeight: "800", color: colors.onSurface }}>
            Where should we deliver?
          </Text>
          <Text style={{ fontSize: 14, color: colors.muted, marginTop: 4 }}>
            Enable location or pick a saved address to see nearby restaurants.
          </Text>

          <Pressable style={{
            flexDirection: "row", alignItems: "center", gap: spacing.md,
            backgroundColor: colors.brandTertiary,
            padding: spacing.lg, borderRadius: radius.lg, marginTop: spacing.xl,
          }}>
            <View style={{
              width: 40, height: 40, borderRadius: 12,
              backgroundColor: colors.brandPrimary,
              alignItems: "center", justifyContent: "center",
            }}>
              <Ionicons name="navigate" size={20} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: "700", color: colors.onSurface }}>Use current location</Text>
              <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>Detected: Jalan Bukit Bintang, KL</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.muted} />
          </Pressable>

          <Text style={{ fontSize: 13, fontWeight: "700", color: colors.muted, marginTop: spacing.xl, marginBottom: spacing.md, letterSpacing: 0.6 }}>
            SAVED ADDRESSES
          </Text>
          {addresses.map((a) => (
            <Pressable key={a.id} style={{
              flexDirection: "row", alignItems: "center", gap: spacing.md,
              paddingVertical: spacing.md,
              borderBottomWidth: 1, borderBottomColor: colors.divider,
            }}>
              <View style={{
                width: 40, height: 40, borderRadius: 12,
                backgroundColor: colors.surfaceSecondary,
                alignItems: "center", justifyContent: "center",
              }}>
                <Ionicons name={a.icon as any} size={18} color={colors.onSurface} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: "600", color: colors.onSurface }}>{a.label}</Text>
                <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }} numberOfLines={1}>{a.address}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.muted} />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        paddingHorizontal: spacing.lg, paddingTop: spacing.md,
        paddingBottom: insets.bottom + spacing.md,
        backgroundColor: colors.surface,
        borderTopWidth: 1, borderTopColor: colors.border,
      }}>
        <PillButton
          testID="continue-button"
          label="Continue"
          onPress={() => router.replace("/(tabs)/home")}
        />
      </View>
    </View>
  );
}
