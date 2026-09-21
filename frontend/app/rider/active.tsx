import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { spacing, radius } from "@/src/theme";
import { rider as c, incomingOrder } from "@/src/data/rider-mock";

type Stage = 0 | 1 | 2 | 3;
const stageMeta: { title: string; cta: string; sub: string; icon: string }[] = [
  { title: "Head to restaurant", cta: "I've arrived at restaurant", sub: `${incomingOrder.distanceToRestaurantKm} km • ~5 min`, icon: "restaurant" },
  { title: "Pick up order", cta: "I've picked up the order", sub: "Please verify order #A247", icon: "bag-check" },
  { title: "Head to customer", cta: "I've arrived at customer", sub: `${incomingOrder.distanceToCustomerKm} km • ~4 min`, icon: "navigate" },
  { title: "Deliver order", cta: "Complete delivery", sub: `Handover to ${incomingOrder.customerName}`, icon: "checkmark-done" },
];

export default function ActiveDelivery() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [stage, setStage] = useState<Stage>(0);

  const meta = stageMeta[stage];

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      {/* Map fake */}
      <View style={{ flex: 1, backgroundColor: "#0E1621" }}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" }}
          style={{ width: "100%", height: "100%", opacity: 0.35 }}
          contentFit="cover"
        />
        <LinearGradient colors={["rgba(11,15,20,0.7)", "transparent", "rgba(11,15,20,0.7)"]} style={{ position: "absolute", inset: 0 }} />

        {/* Route line simulation */}
        <View style={{ position: "absolute", left: "12%", top: "52%", right: "18%", height: 4, backgroundColor: c.brand, borderRadius: 2, transform: [{ rotate: "-6deg" }], opacity: 0.85 }} />

        {/* Rider pin */}
        <View style={{ position: "absolute", top: "50%", left: "10%" }}>
          <View style={{
            width: 44, height: 44, borderRadius: 22, backgroundColor: c.brand,
            alignItems: "center", justifyContent: "center",
            borderWidth: 3, borderColor: "#FFFFFF",
          }}>
            <Ionicons name="bicycle" size={20} color="#FFFFFF" />
          </View>
        </View>

        {/* Restaurant pin */}
        <View style={{ position: "absolute", top: "38%", right: "26%" }}>
          <View style={{
            width: 38, height: 38, borderRadius: 19, backgroundColor: stage >= 1 ? c.textMuted : c.warning,
            alignItems: "center", justifyContent: "center",
            borderWidth: 3, borderColor: "#FFFFFF",
          }}>
            <Ionicons name="restaurant" size={16} color="#FFFFFF" />
          </View>
        </View>

        {/* Customer pin */}
        <View style={{ position: "absolute", bottom: "22%", right: "14%" }}>
          <View style={{
            width: 38, height: 38, borderRadius: 19, backgroundColor: stage >= 3 ? c.brand : c.text,
            alignItems: "center", justifyContent: "center",
            borderWidth: 3, borderColor: "#FFFFFF",
          }}>
            <Ionicons name="home" size={16} color={stage >= 3 ? "#FFFFFF" : c.bg} />
          </View>
        </View>

        {/* Top bar */}
        <View style={{ position: "absolute", top: insets.top + 8, left: spacing.lg, right: spacing.lg, flexDirection: "row", justifyContent: "space-between" }}>
          <Pressable testID="active-back" onPress={() => router.back()} style={roundBtn}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </Pressable>
          <View style={{ backgroundColor: c.bg2, paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radius.pill, flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderColor: c.border }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c.brand }} />
            <Text style={{ color: c.text, fontSize: 12, fontWeight: "800" }}>Order #A247</Text>
          </View>
          <Pressable style={roundBtn}><Ionicons name="navigate" size={20} color="#FFFFFF" /></Pressable>
        </View>

        {/* Turn-by-turn banner */}
        <View style={{
          position: "absolute", top: insets.top + 60, left: spacing.lg, right: spacing.lg,
          backgroundColor: c.bg2, borderRadius: radius.lg,
          padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md,
          borderWidth: 1, borderColor: c.border,
        }}>
          <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: c.brand, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name={stage < 2 ? "arrow-forward" : "arrow-up"} size={22} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: c.text, fontSize: 15, fontWeight: "800" }}>
              {stage < 2 ? "Turn right onto Jalan Sultan Ismail" : "Continue straight for 400 m"}
            </Text>
            <Text style={{ color: c.textDim, fontSize: 12, marginTop: 2 }}>{meta.sub}</Text>
          </View>
        </View>
      </View>

      {/* Bottom sheet */}
      <View style={{
        backgroundColor: c.bg2,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        paddingBottom: insets.bottom + spacing.md,
        marginTop: -28,
        borderTopWidth: 1, borderTopColor: c.border,
      }}>
        <View style={{ alignItems: "center", paddingTop: 10 }}>
          <View style={{ width: 40, height: 5, borderRadius: 3, backgroundColor: c.border }} />
        </View>

        <ScrollView style={{ maxHeight: 400 }} contentContainerStyle={{ padding: spacing.lg }}>
          {/* Stage stepper compact */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.md }}>
            {stageMeta.map((s, i) => {
              const done = i < stage;
              const active = i === stage;
              return (
                <View key={i} style={{ flex: 1, alignItems: "center" }}>
                  <View style={{
                    width: 34, height: 34, borderRadius: 17,
                    backgroundColor: done ? c.brand : (active ? c.brandDim : c.bg3),
                    borderWidth: active ? 2 : 0, borderColor: c.brand,
                    alignItems: "center", justifyContent: "center",
                  }}>
                    {done
                      ? <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                      : <Ionicons name={s.icon as any} size={14} color={active ? c.brand : c.textMuted} />
                    }
                  </View>
                  {i < stageMeta.length - 1 && (
                    <View style={{ position: "absolute", top: 17, left: "60%", right: -20, height: 2, backgroundColor: done ? c.brand : c.border }} />
                  )}
                </View>
              );
            })}
          </View>

          {/* Current stage panel */}
          <View style={{ backgroundColor: c.bg3, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: c.border }}>
            <Text style={{ color: c.textDim, fontSize: 10, fontWeight: "800", letterSpacing: 0.6 }}>STEP {stage + 1} OF 4</Text>
            <Text style={{ color: c.text, fontSize: 18, fontWeight: "800", marginTop: 2 }}>{meta.title}</Text>

            {/* Pickup / drop-off info */}
            {stage < 2 ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.md }}>
                <Image source={{ uri: incomingOrder.restaurantImage }} style={{ width: 56, height: 56, borderRadius: radius.md }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: c.text, fontSize: 14, fontWeight: "700" }}>{incomingOrder.restaurantName}</Text>
                  <Text style={{ color: c.textDim, fontSize: 11, marginTop: 2 }} numberOfLines={1}>{incomingOrder.restaurantAddress}</Text>
                  <Text style={{ color: c.brand, fontSize: 11, marginTop: 4, fontWeight: "700" }}>{incomingOrder.itemsCount} items • Order #A247</Text>
                </View>
              </View>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.md }}>
                <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: c.brandDim, alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="person" size={26} color={c.brand} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: c.text, fontSize: 14, fontWeight: "700" }}>{incomingOrder.customerName}</Text>
                  <Text style={{ color: c.textDim, fontSize: 11, marginTop: 2 }} numberOfLines={1}>{incomingOrder.customerAddress}</Text>
                </View>
              </View>
            )}

            {/* Communication */}
            <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.md }}>
              <ActBtn icon="chatbubble" label="Chat" />
              <ActBtn icon="call" label="Call" primary />
              <ActBtn icon="navigate" label="Navigate" />
            </View>
          </View>

          {/* Notes / instructions */}
          <View style={{ backgroundColor: c.bg3, borderRadius: radius.lg, padding: spacing.md, marginTop: spacing.md, flexDirection: "row", gap: 10, borderWidth: 1, borderColor: c.border }}>
            <Ionicons name="information-circle" size={16} color={c.warning} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: c.textDim, fontSize: 10, fontWeight: "800", letterSpacing: 0.5 }}>CUSTOMER NOTE</Text>
              <Text style={{ color: c.text, fontSize: 12, marginTop: 2 }}>
                &ldquo;Please leave at the front door, don&apos;t ring the bell — baby is sleeping 🙏&rdquo;
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Slide-to-confirm CTA */}
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm }}>
          <Pressable
            testID={`stage-cta-${stage}`}
            onPress={() => {
              if (stage < 3) setStage(((stage + 1) as Stage));
              else router.replace("/rider/summary");
            }}
            style={{
              backgroundColor: c.brand,
              height: 52, borderRadius: radius.pill,
              flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            <Ionicons name={stage === 3 ? "checkmark-circle" : "arrow-forward"} size={18} color="#FFFFFF" />
            <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>{meta.cta}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function ActBtn({ icon, label, primary }: { icon: string; label: string; primary?: boolean }) {
  return (
    <Pressable style={{
      flex: 1, height: 42, borderRadius: radius.pill,
      backgroundColor: primary ? c.brand : c.bg2,
      borderWidth: 1, borderColor: primary ? c.brand : c.border,
      flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6,
    }}>
      <Ionicons name={icon as any} size={16} color={primary ? "#FFFFFF" : c.text} />
      <Text style={{ color: primary ? "#FFFFFF" : c.text, fontSize: 13, fontWeight: "700" }}>{label}</Text>
    </Pressable>
  );
}

const roundBtn = {
  width: 40, height: 40, borderRadius: 20,
  backgroundColor: c.bg2, borderWidth: 1, borderColor: c.border,
  alignItems: "center" as const, justifyContent: "center" as const,
};
