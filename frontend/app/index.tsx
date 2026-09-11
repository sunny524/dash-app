import { View, Text, Pressable, TextInput, StyleSheet, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useTheme, spacing, radius } from "@/src/theme";
import { PillButton } from "@/src/components/Buttons";

export default function Index() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [phone, setPhone] = useState("12 345 6789");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState(["", "", "", ""]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.brandPrimary }}>
      {/* Hero background */}
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: "55%" }}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&q=80" }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        <LinearGradient
          colors={["rgba(0,177,79,0.85)", "rgba(0,177,79,0.55)", "rgba(0,177,79,0)"]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <View style={{ paddingTop: insets.top + spacing.xxxl, paddingHorizontal: spacing.xl, alignItems: "flex-start" }}>
        <View style={{
          width: 68, height: 68, borderRadius: 20,
          backgroundColor: "rgba(255,255,255,0.2)",
          alignItems: "center", justifyContent: "center",
          borderWidth: 1, borderColor: "rgba(255,255,255,0.35)",
        }}>
          <Ionicons name="restaurant" size={32} color="#FFFFFF" />
        </View>
        <Text style={{ fontSize: 40, fontWeight: "800", color: "#FFFFFF", marginTop: spacing.lg }}>EasyEat</Text>
        <Text style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", marginTop: 6 }}>
          Malaysia&apos;s food, delivered.{"\n"}Dine in. Pick up. Book a table.
        </Text>
      </View>

      {/* Bottom sheet card */}
      <View style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        backgroundColor: colors.surface,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
        paddingBottom: insets.bottom + spacing.xl,
        gap: spacing.md,
      }}>
        <Text style={{ fontSize: 22, fontWeight: "800", color: colors.onSurface }}>
          {step === "phone" ? "Welcome back" : "Verify your number"}
        </Text>
        <Text style={{ fontSize: 14, color: colors.muted, marginBottom: spacing.md }}>
          {step === "phone"
            ? "Sign in with your Malaysian phone number to continue."
            : `We sent a 4-digit code to +60 ${phone}`}
        </Text>

        {step === "phone" ? (
          <>
            <View style={{
              flexDirection: "row", alignItems: "center",
              backgroundColor: colors.surfaceSecondary,
              borderRadius: radius.lg,
              paddingHorizontal: spacing.lg, height: 56,
            }}>
              <Text style={{ fontSize: 20, marginRight: spacing.sm }}>🇲🇾</Text>
              <Text style={{ fontSize: 15, fontWeight: "600", color: colors.onSurface }}>+60</Text>
              <View style={{ width: 1, height: 24, backgroundColor: colors.border, marginHorizontal: spacing.md }} />
              <TextInput
                testID="phone-input"
                value={phone}
                onChangeText={setPhone}
                placeholder="12 345 6789"
                placeholderTextColor={colors.muted}
                keyboardType="phone-pad"
                style={{ flex: 1, fontSize: 16, color: colors.onSurface }}
              />
            </View>

            <PillButton testID="send-otp-button" label="Send OTP" onPress={() => setStep("otp")} />

            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: spacing.md }}>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
              <Text style={{ paddingHorizontal: spacing.md, color: colors.muted, fontSize: 12 }}>OR</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
            </View>

            <View style={{ flexDirection: "row", gap: spacing.md }}>
              <SocialBtn icon="logo-apple" label="Apple" />
              <SocialBtn icon="logo-google" label="Google" />
            </View>

            <Text style={{ textAlign: "center", fontSize: 12, color: colors.muted, marginTop: spacing.md }}>
              By continuing you agree to our <Text style={{ color: colors.brandPrimary, fontWeight: "600" }}>Terms</Text> & <Text style={{ color: colors.brandPrimary, fontWeight: "600" }}>Privacy</Text>
            </Text>
          </>
        ) : (
          <>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.md }}>
              {[0, 1, 2, 3].map((i) => (
                <TextInput
                  key={i}
                  testID={`otp-${i}`}
                  value={otp[i]}
                  onChangeText={(t) => { const n = [...otp]; n[i] = t; setOtp(n); }}
                  placeholder="•"
                  placeholderTextColor={colors.muted}
                  maxLength={1}
                  keyboardType="number-pad"
                  style={{
                    width: 64, height: 64, borderRadius: radius.lg,
                    backgroundColor: colors.surfaceSecondary,
                    textAlign: "center", fontSize: 28, fontWeight: "700",
                    color: colors.onSurface,
                    borderWidth: 2,
                    borderColor: otp[i] ? colors.brandPrimary : "transparent",
                  }}
                />
              ))}
            </View>
            <PillButton testID="verify-otp-button" label="Verify & Continue" onPress={() => router.replace("/location")} />
            <Text style={{ textAlign: "center", fontSize: 13, color: colors.muted, marginTop: spacing.md }}>
              Resend code in <Text style={{ color: colors.onSurface, fontWeight: "600" }}>00:29</Text>
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

function SocialBtn({ icon, label }: { icon: string; label: string }) {
  const { colors } = useTheme();
  return (
    <Pressable style={{
      flex: 1, height: 52, flexDirection: "row",
      alignItems: "center", justifyContent: "center",
      backgroundColor: colors.surfaceSecondary,
      borderRadius: radius.pill, gap: 8,
    }}>
      <Ionicons name={icon as any} size={18} color={colors.onSurface} />
      <Text style={{ fontSize: 14, fontWeight: "600", color: colors.onSurface }}>{label}</Text>
    </Pressable>
  );
}
