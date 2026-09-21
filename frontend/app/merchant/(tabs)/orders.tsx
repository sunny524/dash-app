import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useMemo, useState } from "react";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { merchantOrders, merchantProfile, type MerchantOrder } from "@/src/data/merchant-mock";

const filters: { id: MerchantOrder["status"] | "all"; label: string; color?: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "preparing", label: "Preparing" },
  { id: "ready", label: "Ready" },
  { id: "handed", label: "Handed off" },
];

const statusMeta: Record<MerchantOrder["status"], { color: string; label: string; next?: MerchantOrder["status"]; cta?: string }> = {
  new: { color: "#E23744", label: "NEW", next: "preparing", cta: "Accept & start preparing" },
  preparing: { color: "#FF9500", label: "PREPARING", next: "ready", cta: "Mark as Ready" },
  ready: { color: "#34C759", label: "READY", next: "handed", cta: "Hand off to rider / customer" },
  handed: { color: "#8E8E93", label: "HANDED OFF", cta: undefined },
};

export default function MerchantOrders() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [statuses, setStatuses] = useState<Record<string, MerchantOrder["status"]>>(
    Object.fromEntries(merchantOrders.map((o) => [o.id, o.status]))
  );
  const [autoAccept, setAutoAccept] = useState(false);

  const orders = useMemo(() => {
    return merchantOrders
      .map((o) => ({ ...o, status: statuses[o.id] }))
      .filter((o) => filter === "all" ? true : o.status === filter)
      .sort((a, b) => statusRank(a.status) - statusRank(b.status));
  }, [filter, statuses]);

  const counts = useMemo(() => ({
    new: Object.values(statuses).filter((s) => s === "new").length,
    preparing: Object.values(statuses).filter((s) => s === "preparing").length,
    ready: Object.values(statuses).filter((s) => s === "ready").length,
  }), [statuses]);

  const advance = (id: string) => {
    const cur = statuses[id];
    const next = statusMeta[cur]?.next;
    if (next) setStatuses({ ...statuses, [id]: next });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      {/* Header */}
      <View style={{ paddingTop: insets.top, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <Image source={{ uri: merchantProfile.image }} style={{ width: 44, height: 44, borderRadius: radius.md }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface }}>{merchantProfile.restaurant}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success }} />
              <Text style={{ fontSize: 11, color: colors.muted }}>Open • {merchantProfile.branch}</Text>
            </View>
          </View>
          <Pressable
            testID="auto-accept-toggle"
            onPress={() => setAutoAccept((v) => !v)}
            style={{
              paddingHorizontal: 10, paddingVertical: 6, borderRadius: radius.pill,
              backgroundColor: autoAccept ? colors.brandTertiary : colors.surfaceSecondary,
              borderWidth: 1, borderColor: autoAccept ? colors.brandPrimary : colors.border,
              flexDirection: "row", alignItems: "center", gap: 4,
            }}
          >
            <Ionicons name={autoAccept ? "flash" : "flash-outline"} size={12} color={autoAccept ? colors.brandPrimary : colors.muted} />
            <Text style={{ fontSize: 11, fontWeight: "800", color: autoAccept ? colors.brandPrimary : colors.muted }}>
              AUTO
            </Text>
          </Pressable>
        </View>

        {/* KPI strip */}
        <View style={{ flexDirection: "row", paddingHorizontal: spacing.lg, paddingBottom: spacing.md, gap: 8 }}>
          <KPI value={counts.new.toString()} label="New" color={colors.error} />
          <KPI value={counts.preparing.toString()} label="Preparing" color={colors.warning} />
          <KPI value={counts.ready.toString()} label="Ready" color={colors.success} />
          <KPI value={merchantProfile.todayOrders.toString()} label="Today" color={colors.brandPrimary} />
        </View>

        {/* Filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: 8, paddingBottom: spacing.md }}>
          {filters.map((f) => {
            const active = f.id === filter;
            return (
              <Pressable
                key={f.id}
                testID={`m-filter-${f.id}`}
                onPress={() => setFilter(f.id)}
                style={{
                  height: 34, paddingHorizontal: 14, borderRadius: radius.pill,
                  backgroundColor: active ? colors.onSurface : colors.surface,
                  borderWidth: 1, borderColor: active ? colors.onSurface : colors.border,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: active ? "#FFFFFF" : colors.onSurface, fontSize: 13, fontWeight: "700" }}>{f.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: insets.bottom + 24 }}>
        {orders.length === 0 ? (
          <View style={{ paddingVertical: 60, alignItems: "center" }}>
            <Ionicons name="checkmark-done-circle" size={48} color={colors.success} />
            <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface, marginTop: spacing.md }}>All caught up!</Text>
            <Text style={{ fontSize: 13, color: colors.muted, marginTop: 4 }}>No {filter === "all" ? "" : filter + " "}orders right now</Text>
          </View>
        ) : (
          orders.map((o) => {
            const meta = statusMeta[o.status];
            return (
              <View key={o.id} style={{ backgroundColor: colors.surface, borderRadius: radius.lg, ...shadow.card, overflow: "hidden", borderLeftWidth: 4, borderLeftColor: meta.color }}>
                <View style={{ padding: spacing.md }}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                      <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill, backgroundColor: meta.color }}>
                        <Text style={{ fontSize: 10, fontWeight: "800", color: "#FFFFFF" }}>{meta.label}</Text>
                      </View>
                      <Text style={{ fontSize: 13, fontWeight: "800", color: colors.onSurface }}>{o.ref}</Text>
                      <View style={{ paddingHorizontal: 6, paddingVertical: 1, borderRadius: 4, backgroundColor: colors.surfaceSecondary }}>
                        <Text style={{ fontSize: 10, fontWeight: "700", color: colors.onSurfaceSecondary }}>{o.type.toUpperCase()}{o.table ? ` · T${o.table}` : ""}</Text>
                      </View>
                    </View>
                    <Text style={{ fontSize: 11, color: colors.muted }}>{o.waitedMin} min ago</Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: spacing.sm }}>
                    <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.brandTertiary, alignItems: "center", justifyContent: "center" }}>
                      <Ionicons name={o.type === "Delivery" ? "bicycle" : o.type === "Pickup" ? "bag-handle" : "restaurant"} size={14} color={colors.brandPrimary} />
                    </View>
                    <Text style={{ flex: 1, fontSize: 13, color: colors.onSurface, fontWeight: "700" }}>{o.customer}</Text>
                    <Text style={{ fontSize: 14, fontWeight: "800", color: colors.onSurface }}>RM {o.subtotal.toFixed(2)}</Text>
                  </View>

                  {o.rider && (
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.brandTertiary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: radius.md, alignSelf: "flex-start", marginBottom: spacing.sm }}>
                      <Ionicons name="bicycle" size={11} color={colors.brandPrimary} />
                      <Text style={{ fontSize: 11, fontWeight: "700", color: colors.brandPrimary }}>Rider: {o.rider}</Text>
                    </View>
                  )}

                  {/* Items */}
                  <View style={{ backgroundColor: colors.surfaceSecondary, borderRadius: radius.md, padding: spacing.sm }}>
                    {o.items.map((it, i) => (
                      <View key={i} style={{ flexDirection: "row", paddingVertical: 4, alignItems: "flex-start", gap: 8 }}>
                        <Text style={{ fontSize: 13, fontWeight: "800", color: colors.brandPrimary, minWidth: 22 }}>{it.qty}×</Text>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 13, color: colors.onSurface, fontWeight: "600" }}>{it.name}</Text>
                          {it.note && (
                            <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 3, marginTop: 2 }}>
                              <Ionicons name="chatbox-outline" size={10} color={colors.warning} style={{ marginTop: 2 }} />
                              <Text style={{ fontSize: 11, color: colors.warning, fontStyle: "italic", flex: 1 }}>{it.note}</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>

                  {/* Actions */}
                  {meta.cta && (
                    <View style={{ flexDirection: "row", gap: 8, marginTop: spacing.md }}>
                      {o.status === "new" && (
                        <Pressable style={{ flex: 1, height: 44, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.error, alignItems: "center", justifyContent: "center" }}>
                          <Text style={{ color: colors.error, fontSize: 13, fontWeight: "700" }}>Reject</Text>
                        </Pressable>
                      )}
                      <Pressable
                        testID={`advance-${o.id}`}
                        onPress={() => advance(o.id)}
                        style={{
                          flex: o.status === "new" ? 2 : 1,
                          height: 44, borderRadius: radius.pill,
                          backgroundColor: meta.color,
                          alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 6,
                        }}
                      >
                        <Ionicons
                          name={o.status === "new" ? "checkmark-circle" : o.status === "preparing" ? "flame" : "checkmark-done"}
                          size={16} color="#FFFFFF"
                        />
                        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "800" }}>{meta.cta}</Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

function KPI({ value, label, color }: { value: string; label: string; color: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary, borderRadius: radius.md, padding: 10, borderLeftWidth: 3, borderLeftColor: color }}>
      <Text style={{ fontSize: 18, fontWeight: "800", color: colors.onSurface }}>{value}</Text>
      <Text style={{ fontSize: 10, color: colors.muted, marginTop: 2, fontWeight: "700" }}>{label.toUpperCase()}</Text>
    </View>
  );
}

function statusRank(s: MerchantOrder["status"]) {
  return { new: 0, preparing: 1, ready: 2, handed: 3 }[s] ?? 4;
}
