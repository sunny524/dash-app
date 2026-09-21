import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { spacing, radius } from "@/src/theme";
import { rider as c, jobHistory } from "@/src/data/rider-mock";

const filters = ["All", "Today", "Yesterday", "Cancelled"];

export default function Jobs() {
  const insets = useSafeAreaInsets();
  const [f, setF] = useState("All");

  const list = jobHistory.filter((j) => {
    if (f === "All") return true;
    if (f === "Cancelled") return j.status === "Cancelled";
    return j.date === f;
  });

  const totalEarnings = list.reduce((s, j) => s + (j.status === "Delivered" ? j.earnings : 0), 0);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <View style={{ paddingTop: insets.top }}>
        <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
          <Text style={{ color: c.text, fontSize: 22, fontWeight: "800" }}>Job History</Text>
          <Text style={{ color: c.textDim, fontSize: 12, marginTop: 2 }}>{jobHistory.length} deliveries • RM {totalEarnings.toFixed(2)} earned</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: 8, paddingBottom: spacing.md }}>
          {filters.map((t) => {
            const active = t === f;
            return (
              <Pressable
                key={t}
                testID={`jobs-filter-${t}`}
                onPress={() => setF(t)}
                style={{
                  height: 34, paddingHorizontal: 14, borderRadius: radius.pill,
                  backgroundColor: active ? c.brand : c.bg2,
                  borderWidth: 1, borderColor: active ? c.brand : c.border,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: active ? "#FFFFFF" : c.textDim, fontSize: 13, fontWeight: "700" }}>{t}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + 24, gap: spacing.md }}>
        {list.length === 0 ? (
          <View style={{ padding: spacing.xl, alignItems: "center" }}>
            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: c.bg2, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="list" size={24} color={c.textDim} />
            </View>
            <Text style={{ color: c.text, fontSize: 15, fontWeight: "700", marginTop: spacing.md }}>No jobs yet</Text>
            <Text style={{ color: c.textDim, fontSize: 12, marginTop: 4 }}>Go online to start receiving trips</Text>
          </View>
        ) : (
          list.map((j) => (
            <View key={j.id} style={{
              backgroundColor: c.bg2, borderRadius: radius.lg,
              padding: spacing.md, flexDirection: "row", gap: spacing.md,
              borderWidth: 1, borderColor: c.border,
            }}>
              <Image source={{ uri: j.image }} style={{ width: 60, height: 60, borderRadius: radius.md }} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <View style={{
                    paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill,
                    backgroundColor: j.status === "Delivered" ? c.brandDim : "#3B1A1A",
                  }}>
                    <Text style={{ fontSize: 10, fontWeight: "800", color: j.status === "Delivered" ? c.brand : c.error }}>
                      {j.status.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={{ color: c.textDim, fontSize: 11 }}>{j.date} • {j.time}</Text>
                </View>
                <Text style={{ color: c.text, fontSize: 14, fontWeight: "700", marginTop: 4 }} numberOfLines={1}>{j.restaurant}</Text>
                <Text style={{ color: c.textDim, fontSize: 11, marginTop: 2 }}>Delivered to {j.customer}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                      <Ionicons name="location-outline" size={11} color={c.textDim} />
                      <Text style={{ color: c.textDim, fontSize: 11 }}>{j.distanceKm}km</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                      <Ionicons name="time-outline" size={11} color={c.textDim} />
                      <Text style={{ color: c.textDim, fontSize: 11 }}>{j.durationMin}min</Text>
                    </View>
                  </View>
                  <Text style={{ color: j.status === "Delivered" ? c.brand : c.textMuted, fontSize: 15, fontWeight: "800" }}>
                    {j.status === "Delivered" ? `+RM ${j.earnings.toFixed(2)}` : "—"}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
