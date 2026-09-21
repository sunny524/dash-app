import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Ionicons from "@react-native-vector-icons/ionicons";

import { spacing, radius } from "@/src/theme";
import { rider as c } from "@/src/data/rider-mock";

export default function RiderLogin() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [phone, setPhone] = useState("12 388 4720");

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: 400 }}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=1200&q=80" }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        <LinearGradient
          colors={["rgba(11,15,20,0.4)", "rgba(11,15,20,0.85)", c.bg]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <Pressable
        testID="rider-back-customer"
        onPress={() => router.replace("/(tabs)/home")}
        style={{
          position: "absolute", top: insets.top + 8, right: spacing.lg,
          paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill,
          backgroundColor: "rgba(255,255,255,0.12)",
          flexDirection: "row", alignItems: "center", gap: 6, zIndex: 10,
        }}
      >
        <Ionicons name="person" size={14} color="#FFFFFF" />
        <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "700" }}>Switch to Customer</Text>
      </Pressable>

      <View style={{ paddingTop: insets.top + spacing.xxxl, paddingHorizontal: spacing.xl }}>
        <View style={{
          alignSelf: "flex-start",
          paddingHorizontal: 10, paddingVertical: 5,
          borderRadius: radius.pill,
          backgroundColor: c.brand,
          flexDirection: "row", alignItems: "center", gap: 6,
        }}>
          <Ionicons name="bicycle" size={12} color="#FFFFFF" />
          <Text style={{ color: "#FFFFFF", fontSize: 11, fontWeight: "800", letterSpacing: 0.6 }}>RIDER APP</Text>
        </View>
        <Text style={{ fontSize: 34, fontWeight: "800", color: "#FFFFFF", marginTop: spacing.md }}>Ride. Earn.{"\n"}Repeat.</Text>
        <Text style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 6 }}>
          Deliver food across KL, choose your hours, keep 100% of your tips.
        </Text>
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1, marginTop: 260 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
        bottomOffset={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          backgroundColor: c.bg2,
          borderTopLeftRadius: 28, borderTopRightRadius: 28,
          paddingHorizontal: spacing.xl,
          paddingTop: spacing.lg,
          paddingBottom: insets.bottom + spacing.lg,
          gap: 12,
          borderTopWidth: 1, borderTopColor: c.border,
        }}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: c.text }}>Welcome back, rider</Text>
          <Text style={{ fontSize: 13, color: c.textDim, marginBottom: 4 }}>Sign in with your registered phone number.</Text>

          <View style={{
            flexDirection: "row", alignItems: "center",
            backgroundColor: c.bg3, borderRadius: radius.lg,
            paddingHorizontal: spacing.lg, height: 52,
            borderWidth: 1, borderColor: c.border,
          }}>
            <Text style={{ fontSize: 20, marginRight: spacing.sm }}>🇲🇾</Text>
            <Text style={{ fontSize: 15, fontWeight: "600", color: c.text }}>+60</Text>
            <View style={{ width: 1, height: 22, backgroundColor: c.border, marginHorizontal: spacing.md }} />
            <TextInput
              testID="rider-phone-input"
              value={phone}
              onChangeText={setPhone}
              placeholder="12 345 6789"
              placeholderTextColor={c.textMuted}
              keyboardType="phone-pad"
              style={{ flex: 1, fontSize: 16, color: c.text }}
            />
          </View>

          <Pressable
            testID="rider-signin-btn"
            onPress={() => router.replace("/rider/(tabs)/home")}
            style={{
              backgroundColor: c.brand,
              paddingVertical: 14, borderRadius: radius.pill,
              alignItems: "center", marginTop: 4,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>Sign in as Rider</Text>
          </Pressable>

          <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 6, gap: spacing.md }}>
            <Stat icon="bicycle" label="1,284" sub="Total trips" />
            <View style={{ width: 1, backgroundColor: c.border }} />
            <Stat icon="star" label="4.92" sub="Rating" />
            <View style={{ width: 1, backgroundColor: c.border }} />
            <Stat icon="cash" label="RM 3.2k" sub="This month" />
          </View>

          <Pressable style={{ marginTop: 4, alignItems: "center", paddingVertical: 8 }}>
            <Text style={{ color: c.textDim, fontSize: 13 }}>
              New here?{" "}<Text style={{ color: c.brand, fontWeight: "700" }}>Sign up to ride</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

function Stat({ icon, label, sub }: { icon: string; label: string; sub: string }) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Ionicons name={icon as any} size={14} color={c.textDim} />
      <Text style={{ color: c.text, fontSize: 15, fontWeight: "800", marginTop: 4 }}>{label}</Text>
      <Text style={{ color: c.textDim, fontSize: 10 }}>{sub}</Text>
    </View>
  );
}
