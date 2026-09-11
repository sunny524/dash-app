import { View, Text, Pressable, TextInput } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView, KeyboardStickyView } from "react-native-keyboard-controller";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { useTheme, spacing, radius } from "@/src/theme";
import { menuItems } from "@/src/data/mock";

const spice = [
  { id: "mild", label: "Mild (No spice)", price: 0 },
  { id: "med", label: "Medium spicy", price: 0 },
  { id: "hot", label: "Extra spicy 🌶️", price: 0 },
];
const addons = [
  { id: "egg", label: "Fried Egg", price: 2.0 },
  { id: "sambal", label: "Extra Sambal", price: 1.5 },
  { id: "chicken", label: "Extra Chicken", price: 4.0 },
  { id: "peanut", label: "Extra Peanuts", price: 0.5 },
];

export default function ItemDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [qty, setQty] = useState(1);
  const [spiceSel, setSpiceSel] = useState("med");
  const [addonSel, setAddonSel] = useState<Record<string, boolean>>({ egg: true });

  const m = menuItems.find((x) => x.id === id) ?? menuItems[0];
  const addonPrice = addons.reduce((s, a) => s + (addonSel[a.id] ? a.price : 0), 0);
  const total = (m.price + addonPrice) * qty;

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingBottom: 140 + insets.bottom }}
        bottomOffset={100}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ height: 280 }}>
          <Image source={{ uri: m.image }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          <Pressable testID="item-close" onPress={() => router.back()} style={{
            position: "absolute", top: insets.top + 8, left: spacing.lg,
            width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.95)",
            alignItems: "center", justifyContent: "center",
          }}>
            <Ionicons name="close" size={22} color="#1C1C1E" />
          </Pressable>
        </View>

        <View style={{ padding: spacing.lg }}>
          <Text style={{ fontSize: 22, fontWeight: "800", color: colors.onSurface }}>{m.name}</Text>
          <Text style={{ fontSize: 14, color: colors.muted, marginTop: 6, lineHeight: 20 }}>{m.description}</Text>
          <Text style={{ fontSize: 20, fontWeight: "800", color: colors.brandPrimary, marginTop: spacing.md }}>RM {m.price.toFixed(2)}</Text>

          <Section title="Spice level" required>
            {spice.map((s) => (
              <OptionRow key={s.id} label={s.label} selected={spiceSel === s.id} onPress={() => setSpiceSel(s.id)} radio />
            ))}
          </Section>

          <Section title="Add-ons" hint="Optional • Select any">
            {addons.map((a) => (
              <OptionRow
                key={a.id}
                label={a.label}
                price={`+ RM ${a.price.toFixed(2)}`}
                selected={!!addonSel[a.id]}
                onPress={() => setAddonSel({ ...addonSel, [a.id]: !addonSel[a.id] })}
              />
            ))}
          </Section>

          <Section title="Special instructions">
            <TextInput
              placeholder="e.g. Less salt, no onions..."
              placeholderTextColor={colors.muted}
              multiline
              style={{
                backgroundColor: colors.surfaceSecondary,
                borderRadius: radius.md, padding: spacing.md,
                fontSize: 14, color: colors.onSurface, minHeight: 80, textAlignVertical: "top",
              }}
            />
          </Section>
        </View>
      </KeyboardAwareScrollView>

      <KeyboardStickyView offset={{ closed: 0, opened: -insets.bottom + 8 }}>
        <View style={{
          paddingHorizontal: spacing.lg, paddingTop: spacing.md,
          paddingBottom: insets.bottom + spacing.md,
          backgroundColor: colors.surface,
          borderTopWidth: 1, borderTopColor: colors.border,
        }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <View style={{
              flexDirection: "row", alignItems: "center",
              backgroundColor: colors.surfaceSecondary, borderRadius: radius.pill,
              paddingHorizontal: 6, height: 46,
            }}>
              <Pressable testID="qty-minus" onPress={() => setQty(Math.max(1, qty - 1))} style={qtyBtn(colors.surface)}>
                <Ionicons name="remove" size={18} color={colors.onSurface} />
              </Pressable>
              <Text style={{ minWidth: 22, textAlign: "center", fontSize: 15, fontWeight: "800", color: colors.onSurface }}>{qty}</Text>
              <Pressable testID="qty-plus" onPress={() => setQty(qty + 1)} style={qtyBtn(colors.brandPrimary)}>
                <Ionicons name="add" size={18} color="#FFFFFF" />
              </Pressable>
            </View>
            <Pressable
              testID="add-to-cart-cta"
              onPress={() => router.push("/delivery/cart")}
              style={{
                flex: 1, height: 46, borderRadius: radius.pill,
                backgroundColor: colors.brandPrimary,
                flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                paddingHorizontal: spacing.lg,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "700" }}>Add to Cart</Text>
              <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>RM {total.toFixed(2)}</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardStickyView>
    </View>
  );
}

function Section({ title, hint, required, children }: { title: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={{ marginTop: spacing.xl }}>
      <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginBottom: spacing.md }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Text style={{ fontSize: 16, fontWeight: "800", color: colors.onSurface }}>{title}</Text>
          {required && (
            <View style={{ backgroundColor: colors.error, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 4 }}>
              <Text style={{ color: "#FFFFFF", fontSize: 9, fontWeight: "800" }}>REQUIRED</Text>
            </View>
          )}
        </View>
        {hint && <Text style={{ fontSize: 11, color: colors.muted }}>{hint}</Text>}
      </View>
      {children}
    </View>
  );
}

function OptionRow({ label, price, selected, onPress, radio }: { label: string; price?: string; selected: boolean; onPress: () => void; radio?: boolean }) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} style={{
      flexDirection: "row", alignItems: "center", gap: spacing.md,
      paddingVertical: 12, paddingHorizontal: 12,
      backgroundColor: selected ? colors.brandTertiary : colors.surface,
      borderRadius: radius.md, marginBottom: 6,
      borderWidth: 1, borderColor: selected ? colors.brandPrimary : colors.border,
    }}>
      <View style={{
        width: 22, height: 22,
        borderRadius: radio ? 11 : 6,
        borderWidth: 2, borderColor: selected ? colors.brandPrimary : colors.borderStrong,
        alignItems: "center", justifyContent: "center",
        backgroundColor: selected ? colors.brandPrimary : "transparent",
      }}>
        {selected && (radio
          ? <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#FFFFFF" }} />
          : <Ionicons name="checkmark" size={14} color="#FFFFFF" />)}
      </View>
      <Text style={{ flex: 1, fontSize: 14, fontWeight: "600", color: colors.onSurface }}>{label}</Text>
      {price && <Text style={{ fontSize: 13, fontWeight: "700", color: colors.onSurface }}>{price}</Text>}
    </Pressable>
  );
}

const qtyBtn = (bg: string) => ({
  width: 36, height: 36, borderRadius: 18,
  backgroundColor: bg, alignItems: "center" as const, justifyContent: "center" as const,
});
