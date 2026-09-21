import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useTheme, spacing, radius } from "@/src/theme";
import { PillButton } from "@/src/components/Buttons";

export default function MerchantLogin() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [email, setEmail] = useState("rahim@nasilemakvillage.my");
  const [pw, setPw] = useState("••••••••");

  return (
    <View style={{ flex: 1, backgroundColor: colors.brandPrimary }}>
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: 340 }}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80" }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        <LinearGradient
          colors={["rgba(226,55,68,0.85)", "rgba(226,55,68,0.55)", "rgba(226,55,68,0)"]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <Pressable
        testID="merchant-to-customer"
        onPress={() => router.replace("/(tabs)/home")}
        style={{
          position: "absolute", top: insets.top + 8, right: spacing.lg,
          paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill,
          backgroundColor: "rgba(255,255,255,0.2)",
          flexDirection: "row", alignItems: "center", gap: 6, zIndex: 10,
        }}
      >
        <Ionicons name="person" size={14} color="#FFFFFF" />
        <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "700" }}>Switch to Customer</Text>
      </Pressable>

      <View style={{ paddingTop: insets.top + spacing.xxl, paddingHorizontal: spacing.xl }}>
        <View style={{ alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.pill, backgroundColor: "rgba(255,255,255,0.25)", flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Ionicons name="storefront" size={12} color="#FFFFFF" />
          <Text style={{ color: "#FFFFFF", fontSize: 11, fontWeight: "800", letterSpacing: 0.6 }}>MERCHANT PORTAL</Text>
        </View>
        <Text style={{ fontSize: 32, fontWeight: "800", color: "#FFFFFF", marginTop: spacing.md }}>Grow your{"\n"}restaurant with Dash</Text>
        <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", marginTop: 6 }}>Manage orders, menu and revenue in one place.</Text>
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1, marginTop: 200 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
        bottomOffset={20}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ backgroundColor: colors.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: spacing.xl, paddingTop: spacing.xl, paddingBottom: insets.bottom + spacing.xl, gap: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: colors.onSurface }}>Sign in to your kitchen</Text>
          <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 4 }}>Use your merchant credentials to continue.</Text>

          <Field icon="mail" value={email} onChange={setEmail} placeholder="you@restaurant.my" />
          <Field icon="lock-closed" value={pw} onChange={setPw} placeholder="Password" secure />

          <PillButton testID="merchant-signin" label="Sign in as Merchant" onPress={() => router.replace("/merchant/(tabs)/orders")} />

          <Text style={{ textAlign: "center", fontSize: 12, color: colors.muted, marginTop: 6 }}>
            Not partnered yet? <Text style={{ color: colors.brandPrimary, fontWeight: "800" }}>Apply to sell on Dash</Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

function Field({ icon, value, onChange, placeholder, secure }: { icon: string; value: string; onChange: (v: string) => void; placeholder: string; secure?: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={{
      flexDirection: "row", alignItems: "center",
      backgroundColor: colors.surfaceSecondary, borderRadius: radius.lg,
      paddingHorizontal: spacing.lg, height: 52, gap: 10,
    }}>
      <Ionicons name={icon as any} size={18} color={colors.muted} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        secureTextEntry={secure}
        autoCapitalize="none"
        style={{ flex: 1, fontSize: 15, color: colors.onSurface }}
      />
    </View>
  );
}
