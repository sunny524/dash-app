import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useMemo, useState } from "react";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { merchantMenu } from "@/src/data/merchant-mock";

export default function MerchantMenu() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [q, setQ] = useState("");
  const [stocks, setStocks] = useState<Record<string, string>>(
    Object.fromEntries(merchantMenu.map((m) => [m.id, m.stock]))
  );

  const items = useMemo(() => {
    const s = q.toLowerCase();
    return merchantMenu.filter((m) => !s || m.name.toLowerCase().includes(s) || m.category.toLowerCase().includes(s));
  }, [q]);

  const toggleStock = (id: string) => {
    setStocks((prev) => ({ ...prev, [id]: prev[id] === "Out of stock" ? "In stock" : "Out of stock" }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      <View style={{ paddingTop: insets.top, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "800", color: colors.onSurface }}>Menu</Text>
            <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{items.length} items • {Object.values(stocks).filter((s) => s === "Out of stock").length} out of stock</Text>
          </View>
          <Pressable
            testID="add-item"
            style={{
              paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.pill,
              backgroundColor: colors.brandPrimary,
              flexDirection: "row", alignItems: "center", gap: 4,
            }}
          >
            <Ionicons name="add" size={16} color="#FFFFFF" />
            <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "800" }}>Add item</Text>
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}>
          <View style={{
            flexDirection: "row", alignItems: "center", gap: spacing.sm,
            backgroundColor: colors.surfaceSecondary,
            paddingHorizontal: spacing.md, height: 42, borderRadius: radius.pill,
          }}>
            <Ionicons name="search" size={16} color={colors.muted} />
            <TextInput
              testID="menu-search"
              value={q}
              onChangeText={setQ}
              placeholder="Search items or category"
              placeholderTextColor={colors.muted}
              style={{ flex: 1, fontSize: 14, color: colors.onSurface, padding: 0 }}
            />
            {q ? (
              <Pressable onPress={() => setQ("")}>
                <Ionicons name="close-circle" size={18} color={colors.muted} />
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: insets.bottom + 24 }}>
        {items.map((m) => {
          const stock = stocks[m.id];
          const oos = stock === "Out of stock";
          const low = stock === "Low stock";
          return (
            <View key={m.id} style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card, opacity: oos ? 0.7 : 1 }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.md }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <Text style={{ fontSize: 10, fontWeight: "800", color: colors.muted, letterSpacing: 0.5 }}>{m.category.toUpperCase()}</Text>
                  </View>
                  <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface }}>{m.name}</Text>
                  <Text style={{ fontSize: 15, fontWeight: "800", color: colors.brandPrimary, marginTop: 4 }}>RM {m.price.toFixed(2)}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                      <Ionicons name="trending-up" size={12} color={colors.muted} />
                      <Text style={{ fontSize: 11, color: colors.muted }}>{m.sold} sold today</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill, backgroundColor: oos ? "#FEE" : low ? "#FEF3E2" : colors.brandTertiary }}>
                      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: oos ? colors.error : low ? colors.warning : colors.success }} />
                      <Text style={{ fontSize: 10, fontWeight: "800", color: oos ? colors.error : low ? colors.warning : colors.success }}>{stock.toUpperCase()}</Text>
                    </View>
                  </View>
                </View>
                <Pressable
                  testID={`stock-${m.id}`}
                  onPress={() => toggleStock(m.id)}
                  style={{
                    width: 44, height: 26, borderRadius: 13,
                    backgroundColor: !oos ? colors.brandPrimary : colors.surfaceTertiary,
                    justifyContent: "center", paddingHorizontal: 3,
                  }}
                >
                  <View style={{
                    width: 20, height: 20, borderRadius: 10, backgroundColor: "#FFFFFF",
                    alignSelf: !oos ? "flex-end" : "flex-start",
                  }} />
                </Pressable>
              </View>

              <View style={{ flexDirection: "row", gap: 8, marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.divider }}>
                <ActionSmall icon="pencil" label="Edit" />
                <ActionSmall icon="image" label="Photo" />
                <ActionSmall icon="pricetag" label="Discount" />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function ActionSmall({ icon, label }: { icon: string; label: string }) {
  const { colors } = useTheme();
  return (
    <Pressable style={{ flex: 1, height: 36, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4 }}>
      <Ionicons name={icon as any} size={13} color={colors.onSurface} />
      <Text style={{ color: colors.onSurface, fontSize: 12, fontWeight: "700" }}>{label}</Text>
    </Pressable>
  );
}
