import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
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
  const otpRefs = useRef<(TextInput | null)[]>([]);

  const handleOtp = (i: number, t: string) => {
    const c = t.slice(-1);
    const n = [...otp]; n[i] = c; setOtp(n);
    if (c && i < 3) {
      requestAnimationFrame(() => otpRefs.current[i + 1]?.focus());
    } else if (!c && i > 0) {
      requestAnimationFrame(() => otpRefs.current[i - 1]?.focus());
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.brandPrimary }}>
      {/* Hero background */}
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: 380 }}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80" }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        <LinearGradient
          colors={["rgba(226,55,68,0.88)", "rgba(226,55,68,0.55)", "rgba(226,55,68,0)"]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <View style={{ paddingTop: insets.top + spacing.xl, paddingHorizontal: spacing.xl, alignItems: "flex-start" }}>
        <View style={{
          width: 60, height: 60, borderRadius: 18,
          backgroundColor: "rgba(255,255,255,0.2)",
          alignItems: "center", justifyContent: "center",
          borderWidth: 1, borderColor: "rgba(255,255,255,0.35)",
        }}>
          <Ionicons name="restaurant" size={28} color="#FFFFFF" />
        </View>
        <Text style={{ fontSize: 34, fontWeight: "800", color: "#FFFFFF", marginTop: spacing.md }}>Dash</Text>
        <Text style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", marginTop: 4 }}>
          Malaysia&apos;s food, delivered. Dine in. Pick up. Book a table.
        </Text>
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1, marginTop: 220 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
        bottomOffset={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          backgroundColor: colors.surface,
          borderTopLeftRadius: 28, borderTopRightRadius: 28,
          paddingHorizontal: spacing.xl,
          paddingTop: spacing.lg,
          paddingBottom: insets.bottom + spacing.lg,
          gap: 10,
        }}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: colors.onSurface }}>
            {step === "phone" ? "Welcome back" : "Verify your number"}
          </Text>
          <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 4 }}>
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
                paddingHorizontal: spacing.lg, height: 52,
              }}>
                <Text style={{ fontSize: 20, marginRight: spacing.sm }}>🇲🇾</Text>
                <Text style={{ fontSize: 15, fontWeight: "600", color: colors.onSurface }}>+60</Text>
                <View style={{ width: 1, height: 22, backgroundColor: colors.border, marginHorizontal: spacing.md }} />
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

              <View style={{ flexDirection: "row", alignItems: "center", marginVertical: spacing.sm }}>
                <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
                <Text style={{ paddingHorizontal: spacing.md, color: colors.muted, fontSize: 12 }}>OR</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
              </View>

              <View style={{ flexDirection: "row", gap: spacing.md }}>
                <SocialBtn icon="logo-apple" label="Apple" />
                <SocialBtn icon="logo-google" label="Google" />
              </View>

              <Text style={{ textAlign: "center", fontSize: 12, color: colors.muted, marginTop: 4 }}>
                By continuing you agree to our <Text style={{ color: colors.brandPrimary, fontWeight: "600" }}>Terms</Text> & <Text style={{ color: colors.brandPrimary, fontWeight: "600" }}>Privacy</Text>
              </Text>
            </>
          ) : (
            <>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
                {[0, 1, 2, 3].map((i) => (
                  <TextInput
                    key={i}
                    ref={(r) => { otpRefs.current[i] = r; }}
                    testID={`otp-${i}`}
                    value={otp[i]}
                    onChangeText={(t) => handleOtp(i, t)}
                    placeholder="•"
                    placeholderTextColor={colors.muted}
                    maxLength={1}
                    keyboardType="number-pad"
                    blurOnSubmit={false}
                    autoFocus={i === 0}
                    selectTextOnFocus
                    caretHidden
                    style={{
                      width: 60, height: 60, borderRadius: radius.lg,
                      backgroundColor: colors.surfaceSecondary,
                      textAlign: "center", fontSize: 26, fontWeight: "700",
                      color: colors.onSurface,
                      borderWidth: 2,
                      borderColor: otp[i] ? colors.brandPrimary : "transparent",
                    }}
                  />
                ))}
              </View>
              <PillButton testID="verify-otp-button" label="Verify & Continue" onPress={() => router.replace("/location")} />
              <Pressable onPress={() => setStep("phone")} style={{ alignSelf: "center" }}>
                <Text style={{ textAlign: "center", fontSize: 13, color: colors.muted }}>
                  Resend code in <Text style={{ color: colors.onSurface, fontWeight: "600" }}>00:29</Text>
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

function SocialBtn({ icon, label }: { icon: string; label: string }) {
  const { colors } = useTheme();
  return (
    <Pressable style={{
      flex: 1, height: 48, flexDirection: "row",
      alignItems: "center", justifyContent: "center",
      backgroundColor: colors.surfaceSecondary,
      borderRadius: radius.pill, gap: 8,
    }}>
      <Ionicons name={icon as any} size={18} color={colors.onSurface} />
      <Text style={{ fontSize: 14, fontWeight: "600", color: colors.onSurface }}>{label}</Text>
    </Pressable>
  );
}
