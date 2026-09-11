import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { ScreenHeader } from "@/src/components/ScreenHeader";
import { StickyCTA } from "@/src/components/Buttons";

const items = [
  { id: "1", name: "Nasi Lemak Ayam Rendang", qty: 1, price: 15.9, addons: "Fried Egg, Medium Spice", image: "https://images.unsplash.com/photo-1677921755291-c39158477b8e?w=300&q=80" },
  { id: "2", name: "Roti Canai (2 pcs)", qty: 2, price: 4.5, addons: "With Dhal & Curry", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=80" },
  { id: "3", name: "Teh Tarik", qty: 2, price: 3.5, addons: "Ice", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&q=80" },
];

export default function Cart() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = 3.9;
  const discount = -6.0;
  const total = subtotal + delivery + discount;

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      <ScreenHeader title="Checkout" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 140 + insets.bottom, gap: spacing.md }}>
        {/* Delivery address */}
        <Card>
          <SectionRow icon="location" title="Deliver to" edit="Change">
            <Text style={{ fontSize: 14, fontWeight: "700", color: colors.onSurface }}>Home</Text>
            <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>12A, Jalan Bukit Bintang, 55100 Kuala Lumpur</Text>
          </SectionRow>
        </Card>

        {/* Delivery time */}
        <Card>
          <SectionRow icon="time" title="Delivery time" edit="Schedule">
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill, backgroundColor: colors.brandTertiary }}>
                <Text style={{ fontSize: 10, fontWeight: "800", color: colors.brandPrimary }}>ASAP</Text>
              </View>
              <Text style={{ fontSize: 14, fontWeight: "700", color: colors.onSurface }}>Arriving in 20-30 min</Text>
            </View>
          </SectionRow>
        </Card>

        {/* Items */}
        <Card>
          <View style={{ padding: spacing.md }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.md }}>
              <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface }}>Nasi Lemak Village</Text>
              <Pressable><Text style={{ fontSize: 13, fontWeight: "700", color: colors.brandPrimary }}>+ Add items</Text></Pressable>
            </View>
            {items.map((it, i) => (
              <View key={it.id} style={{
                flexDirection: "row", alignItems: "center", gap: spacing.md,
                paddingVertical: spacing.md,
                borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.divider,
              }}>
                <Image source={{ uri: it.image }} style={{ width: 56, height: 56, borderRadius: radius.md }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: colors.onSurface }}>{it.name}</Text>
                  <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }} numberOfLines={1}>{it.addons}</Text>
                  <Text style={{ fontSize: 14, fontWeight: "800", color: colors.onSurface, marginTop: 4 }}>RM {(it.price * it.qty).toFixed(2)}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: colors.surfaceSecondary, borderRadius: radius.pill, paddingHorizontal: 6, height: 32 }}>
                  <Pressable style={{ width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name="remove" size={14} color={colors.onSurface} />
                  </Pressable>
                  <Text style={{ fontSize: 13, fontWeight: "800", color: colors.onSurface, minWidth: 14, textAlign: "center" }}>{it.qty}</Text>
                  <Pressable style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.brandPrimary, alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name="add" size={14} color="#FFFFFF" />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </Card>

        {/* Promo code */}
        <Card>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, padding: spacing.md }}>
            <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.brandTertiary, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="pricetag" size={18} color={colors.brandPrimary} />
            </View>
            <TextInput
              placeholder="Enter promo code"
              placeholderTextColor={colors.muted}
              style={{ flex: 1, fontSize: 14, color: colors.onSurface }}
              defaultValue="EASYEAT20"
            />
            <View style={{ backgroundColor: colors.brandTertiary, paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.pill }}>
              <Text style={{ fontSize: 11, fontWeight: "800", color: colors.brandPrimary }}>APPLIED</Text>
            </View>
          </View>
        </Card>

        {/* Payment */}
        <Card>
          <SectionRow icon="card" title="Payment method" edit="Change">
            <Text style={{ fontSize: 14, fontWeight: "700", color: colors.onSurface }}>Touch &apos;n Go eWallet</Text>
            <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>Balance: RM 245.80</Text>
          </SectionRow>
        </Card>

        {/* Summary */}
        <Card>
          <View style={{ padding: spacing.md, gap: 8 }}>
            <SumRow label="Subtotal" value={`RM ${subtotal.toFixed(2)}`} />
            <SumRow label="Delivery fee (0.8 km)" value={`RM ${delivery.toFixed(2)}`} />
            <SumRow label="Promo EASYEAT20" value={`− RM ${Math.abs(discount).toFixed(2)}`} accent />
            <View style={{ height: 1, backgroundColor: colors.divider, marginVertical: 6 }} />
            <SumRow label="Total" value={`RM ${total.toFixed(2)}`} bold />
          </View>
        </Card>
      </ScrollView>

      <StickyCTA>
        <Pressable
          testID="place-order-cta"
          onPress={() => router.push("/delivery/tracking")}
          style={{
            backgroundColor: colors.brandPrimary,
            paddingVertical: 15, borderRadius: radius.pill,
            flexDirection: "row", alignItems: "center", paddingHorizontal: spacing.lg,
          }}
        >
          <Text style={{ flex: 1, color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>Place Order</Text>
          <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>RM {total.toFixed(2)}</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </Pressable>
      </StickyCTA>
    </View>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, ...shadow.card }}>{children}</View>;
}
function SectionRow({ icon, title, edit, children }: { icon: string; title: string; edit?: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.md, padding: spacing.md }}>
      <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.brandTertiary, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name={icon as any} size={18} color={colors.brandPrimary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 11, color: colors.muted, fontWeight: "700", marginBottom: 2 }}>{title.toUpperCase()}</Text>
        {children}
      </View>
      {edit && <Pressable><Text style={{ fontSize: 13, fontWeight: "700", color: colors.brandPrimary }}>{edit}</Text></Pressable>}
    </View>
  );
}
function SumRow({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ fontSize: bold ? 15 : 13, fontWeight: bold ? "800" : "500", color: bold ? colors.onSurface : colors.onSurfaceSecondary }}>{label}</Text>
      <Text style={{ fontSize: bold ? 17 : 13, fontWeight: bold ? "800" : "600", color: accent ? colors.brandPrimary : colors.onSurface }}>{value}</Text>
    </View>
  );
}
