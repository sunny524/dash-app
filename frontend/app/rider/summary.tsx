import { View, Text, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { spacing, radius } from "@/src/theme";
import { rider as c, incomingOrder } from "@/src/data/rider-mock";

export default function Summary() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [tip, setTip] = useState(0);
  const [rating, setRating] = useState(5);

  const base = incomingOrder.earnings;
  const total = base + tip;

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <LinearGradient colors={[c.brand, "#008C3E"]} style={{ paddingTop: insets.top + spacing.md, paddingBottom: spacing.xl, alignItems: "center" }}>
        <View style={{
          width: 84, height: 84, borderRadius: 42,
          backgroundColor: "rgba(255,255,255,0.2)",
          alignItems: "center", justifyContent: "center",
          borderWidth: 3, borderColor: "rgba(255,255,255,0.35)",
        }}>
          <Ionicons name="checkmark" size={40} color="#FFFFFF" />
        </View>
        <Text style={{ color: "#FFFFFF", fontSize: 22, fontWeight: "800", marginTop: spacing.md }}>Delivery Complete!</Text>
        <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, marginTop: 4 }}>Order #A247 • 22 min • {incomingOrder.totalDistanceKm} km</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + 120, gap: spacing.md, marginTop: -spacing.lg }}>
        {/* Earnings */}
        <View style={{ backgroundColor: c.bg2, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: c.border }}>
          <Text style={{ color: c.textDim, fontSize: 11, fontWeight: "800", letterSpacing: 0.6 }}>YOU EARNED</Text>
          <Text style={{ color: c.brand, fontSize: 44, fontWeight: "800", letterSpacing: -1, marginTop: 4 }}>RM {total.toFixed(2)}</Text>
          <View style={{ height: 1, backgroundColor: c.divider, marginVertical: spacing.md }} />
          <SumRow label="Base fare" value={`RM ${(base - 1.5).toFixed(2)}`} />
          <SumRow label="Distance bonus" value="RM 1.50" />
          <SumRow label="Peak hour bonus" value="RM 0.00" />
          <SumRow label="Customer tip" value={`RM ${tip.toFixed(2)}`} accent={tip > 0} />
          <View style={{ height: 1, backgroundColor: c.divider, marginVertical: 6 }} />
          <SumRow label="Total" value={`RM ${total.toFixed(2)}`} bold />
        </View>

        {/* Tip received card (simulated) */}
        {tip > 0 && (
          <View style={{ backgroundColor: c.brandDim, borderRadius: radius.lg, padding: spacing.md, flexDirection: "row", gap: spacing.md, alignItems: "center", borderWidth: 1, borderColor: c.brand }}>
            <Ionicons name="gift" size={20} color={c.brand} />
            <Text style={{ flex: 1, color: c.text, fontSize: 13, fontWeight: "700" }}>
              🎉 {incomingOrder.customerName} tipped you RM {tip.toFixed(2)}!
            </Text>
          </View>
        )}

        {/* Rate customer */}
        <View style={{ backgroundColor: c.bg2, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: c.border }}>
          <Text style={{ color: c.text, fontSize: 14, fontWeight: "800" }}>How was {incomingOrder.customerName}?</Text>
          <Text style={{ color: c.textDim, fontSize: 12, marginTop: 2 }}>Your feedback helps us keep the community safe</Text>
          <View style={{ flexDirection: "row", justifyContent: "center", gap: 12, marginTop: spacing.md }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Pressable key={n} testID={`rate-${n}`} onPress={() => setRating(n)}>
                <Ionicons name={n <= rating ? "star" : "star-outline"} size={34} color={n <= rating ? c.warning : c.textMuted} />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Trip details */}
        <View style={{ backgroundColor: c.bg2, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: c.border }}>
          <Text style={{ color: c.text, fontSize: 14, fontWeight: "800", marginBottom: spacing.md }}>Trip details</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
            <Detail icon="location" label="Distance" value={`${incomingOrder.totalDistanceKm} km`} />
            <Detail icon="time" label="Duration" value="22 min" />
            <Detail icon="cash" label="Order value" value={`RM ${incomingOrder.orderValue.toFixed(2)}`} />
            <Detail icon="bag" label="Items" value={`${incomingOrder.itemsCount}`} />
          </View>
        </View>

        {/* Today so far */}
        <View style={{ backgroundColor: c.bg2, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: c.border }}>
          <Text style={{ color: c.textDim, fontSize: 11, fontWeight: "800", letterSpacing: 0.6 }}>TODAY SO FAR</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
            <View>
              <Text style={{ color: c.text, fontSize: 20, fontWeight: "800" }}>RM 137.00</Text>
              <Text style={{ color: c.textDim, fontSize: 11 }}>13 deliveries</Text>
            </View>
            <View style={{ paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.pill, backgroundColor: c.brandDim, alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Ionicons name="trending-up" size={12} color={c.brand} />
              <Text style={{ color: c.brand, fontSize: 11, fontWeight: "800" }}>+12% vs yesterday</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky bottom */}
      <View style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        backgroundColor: c.bg2,
        borderTopWidth: 1, borderTopColor: c.border,
        paddingHorizontal: spacing.lg, paddingTop: spacing.md,
        paddingBottom: insets.bottom + spacing.md,
        flexDirection: "row", gap: spacing.md,
      }}>
        <Pressable
          onPress={() => router.replace("/rider/(tabs)/home")}
          style={{
            flex: 1, height: 48, borderRadius: radius.pill,
            backgroundColor: c.bg3, borderWidth: 1, borderColor: c.border,
            alignItems: "center", justifyContent: "center",
          }}
        >
          <Text style={{ color: c.text, fontSize: 14, fontWeight: "700" }}>Go Offline</Text>
        </Pressable>
        <Pressable
          testID="continue-driving"
          onPress={() => { setTip(2); setTimeout(() => router.replace("/rider/(tabs)/home"), 600); }}
          style={{
            flex: 2, height: 48, borderRadius: radius.pill,
            backgroundColor: c.brand,
            alignItems: "center", justifyContent: "center",
            flexDirection: "row", gap: 8,
          }}
        >
          <Ionicons name="bicycle" size={16} color="#FFFFFF" />
          <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>Continue Riding</Text>
        </Pressable>
      </View>
    </View>
  );
}

function SumRow({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 }}>
      <Text style={{ color: bold ? c.text : c.textDim, fontSize: bold ? 14 : 13, fontWeight: bold ? "800" : "500" }}>{label}</Text>
      <Text style={{ color: accent ? c.brand : (bold ? c.text : c.text), fontSize: bold ? 16 : 13, fontWeight: bold ? "800" : "700" }}>{value}</Text>
    </View>
  );
}

function Detail({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={{ width: "47%", flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: c.brandDim, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name={icon as any} size={16} color={c.brand} />
      </View>
      <View>
        <Text style={{ color: c.textDim, fontSize: 10 }}>{label}</Text>
        <Text style={{ color: c.text, fontSize: 13, fontWeight: "800" }}>{value}</Text>
      </View>
    </View>
  );
}
