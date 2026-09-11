import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { ScreenHeader } from "@/src/components/ScreenHeader";
import { StickyCTA } from "@/src/components/Buttons";

const items = [
  { name: "Nasi Lemak Ayam Rendang", qty: 2, price: 15.9 },
  { name: "Chicken Satay (10 sticks)", qty: 1, price: 18.0 },
  { name: "Roti Canai (2 pcs)", qty: 2, price: 4.5 },
  { name: "Teh Tarik", qty: 2, price: 3.5 },
];

const payMethods = [
  { id: "duitnow", label: "DuitNow QR", icon: "qr-code", sub: "Instant" },
  { id: "tng", label: "Touch 'n Go eWallet", icon: "wallet", sub: "RM 245.80" },
  { id: "card", label: "Visa •••• 4821", icon: "card", sub: "Debit" },
  { id: "cash", label: "Pay in Cash", icon: "cash", sub: "At counter" },
];

export default function Bill() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [split, setSplit] = useState(false);
  const [splitCount, setSplitCount] = useState(2);
  const [pay, setPay] = useState("duitnow");

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const sst = subtotal * 0.06;
  const service = subtotal * 0.1;
  const total = subtotal + sst + service;
  const perPerson = total / splitCount;

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      <ScreenHeader title="Table 5 • Bill" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: 140 + insets.bottom }}>
        {/* Items */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card }}>
          <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface, marginBottom: spacing.md }}>Your Order</Text>
          {items.map((it, i) => (
            <View key={i} style={{
              flexDirection: "row", justifyContent: "space-between", alignItems: "center",
              paddingVertical: 10,
              borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.divider,
            }}>
              <View style={{ flex: 1, flexDirection: "row", gap: 8, alignItems: "center" }}>
                <Text style={{ fontSize: 13, fontWeight: "700", color: colors.brandPrimary, minWidth: 20 }}>{it.qty}x</Text>
                <Text style={{ fontSize: 13, color: colors.onSurface, flex: 1 }} numberOfLines={1}>{it.name}</Text>
              </View>
              <Text style={{ fontSize: 13, fontWeight: "700", color: colors.onSurface }}>RM {(it.price * it.qty).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Split bill */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
              <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.brandTertiary, alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="people" size={18} color={colors.brandPrimary} />
              </View>
              <View>
                <Text style={{ fontSize: 14, fontWeight: "800", color: colors.onSurface }}>Split the bill</Text>
                <Text style={{ fontSize: 11, color: colors.muted }}>Divide equally with your table</Text>
              </View>
            </View>
            <Pressable
              testID="split-toggle"
              onPress={() => setSplit(!split)}
              style={{
                width: 44, height: 26, borderRadius: 13,
                backgroundColor: split ? colors.brandPrimary : colors.surfaceTertiary,
                justifyContent: "center", paddingHorizontal: 3,
              }}
            >
              <View style={{
                width: 20, height: 20, borderRadius: 10, backgroundColor: "#FFFFFF",
                alignSelf: split ? "flex-end" : "flex-start",
              }} />
            </Pressable>
          </View>
          {split && (
            <View style={{ marginTop: spacing.md, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md }}>
              <Text style={{ fontSize: 13, color: colors.onSurface, fontWeight: "600" }}>Split between</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.surfaceSecondary, borderRadius: radius.pill, paddingHorizontal: 6, height: 36 }}>
                <Pressable onPress={() => setSplitCount(Math.max(2, splitCount - 1))} style={{ width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center" }}><Ionicons name="remove" size={14} color={colors.onSurface} /></Pressable>
                <Text style={{ fontSize: 14, fontWeight: "800", color: colors.onSurface, minWidth: 18, textAlign: "center" }}>{splitCount}</Text>
                <Pressable onPress={() => setSplitCount(splitCount + 1)} style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: colors.brandPrimary, alignItems: "center", justifyContent: "center" }}><Ionicons name="add" size={14} color="#FFFFFF" /></Pressable>
              </View>
            </View>
          )}
        </View>

        {/* Payment method */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card }}>
          <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface, marginBottom: spacing.md }}>Pay with</Text>
          {payMethods.map((p) => (
            <Pressable
              key={p.id}
              onPress={() => setPay(p.id)}
              style={{
                flexDirection: "row", alignItems: "center", gap: spacing.md,
                paddingVertical: 10, paddingHorizontal: 10,
                borderRadius: radius.md, marginBottom: 6,
                backgroundColor: pay === p.id ? colors.brandTertiary : "transparent",
                borderWidth: 1, borderColor: pay === p.id ? colors.brandPrimary : colors.border,
              }}
            >
              <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.surfaceSecondary, alignItems: "center", justifyContent: "center" }}>
                <Ionicons name={p.icon as any} size={18} color={colors.onSurface} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: "700", color: colors.onSurface }}>{p.label}</Text>
                <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>{p.sub}</Text>
              </View>
              <View style={{
                width: 20, height: 20, borderRadius: 10,
                borderWidth: 2, borderColor: pay === p.id ? colors.brandPrimary : colors.borderStrong,
                backgroundColor: pay === p.id ? colors.brandPrimary : "transparent",
                alignItems: "center", justifyContent: "center",
              }}>
                {pay === p.id && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
              </View>
            </Pressable>
          ))}
        </View>

        {/* Summary */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, gap: 6, ...shadow.card }}>
          <Row label="Subtotal" value={`RM ${subtotal.toFixed(2)}`} />
          <Row label="Service charge (10%)" value={`RM ${service.toFixed(2)}`} />
          <Row label="SST (6%)" value={`RM ${sst.toFixed(2)}`} />
          <View style={{ height: 1, backgroundColor: colors.divider, marginVertical: 4 }} />
          <Row label="Total" value={`RM ${total.toFixed(2)}`} bold />
          {split && <Row label={`You pay (1 of ${splitCount})`} value={`RM ${perPerson.toFixed(2)}`} accent bold />}
        </View>
      </ScrollView>

      <StickyCTA>
        <Pressable
          testID="pay-bill-cta"
          onPress={() => router.push("/(tabs)/orders")}
          style={{
          backgroundColor: colors.brandPrimary, paddingVertical: 15,
          borderRadius: radius.pill, flexDirection: "row",
          alignItems: "center", paddingHorizontal: spacing.lg,
        }}>
          <Ionicons name="lock-closed" size={16} color="#FFFFFF" />
          <Text style={{ flex: 1, color: "#FFFFFF", fontSize: 15, fontWeight: "800", textAlign: "center" }}>
            Pay {split ? `RM ${perPerson.toFixed(2)}` : `RM ${total.toFixed(2)}`}
          </Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </Pressable>
      </StickyCTA>
    </View>
  );
}

function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ fontSize: bold ? 14 : 13, fontWeight: bold ? "800" : "500", color: accent ? colors.brandPrimary : (bold ? colors.onSurface : colors.onSurfaceSecondary) }}>{label}</Text>
      <Text style={{ fontSize: bold ? 16 : 13, fontWeight: bold ? "800" : "600", color: accent ? colors.brandPrimary : colors.onSurface }}>{value}</Text>
    </View>
  );
}
