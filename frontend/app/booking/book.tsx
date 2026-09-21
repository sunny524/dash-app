import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView, KeyboardStickyView } from "react-native-keyboard-controller";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";

import { useTheme, spacing, radius, shadow } from "@/src/theme";
import { ScreenHeader } from "@/src/components/ScreenHeader";

const days = [
  { day: "Fri", date: "23", month: "May" },
  { day: "Sat", date: "24", month: "May" },
  { day: "Sun", date: "25", month: "May" },
  { day: "Mon", date: "26", month: "May" },
  { day: "Tue", date: "27", month: "May" },
  { day: "Wed", date: "28", month: "May" },
  { day: "Thu", date: "29", month: "May" },
];

const times = ["12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

export default function BookForm() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [dayIdx, setDayIdx] = useState(2);
  const [time, setTime] = useState("19:30");
  const [party, setParty] = useState(4);

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceSecondary }}>
      <ScreenHeader title="Book a Table" onBack={() => router.back()} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: 120 + insets.bottom }}
        bottomOffset={100}
        keyboardShouldPersistTaps="handled"
      >
        {/* Restaurant compact card */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md, ...shadow.card }}>
          <Image source={{ uri: "https://images.unsplash.com/photo-1767298113547-11e95951608b?w=200&q=80" }} style={{ width: 60, height: 60, borderRadius: radius.md }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface }}>Dim Sum Palace</Text>
            <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>Chinese • Cantonese • $$$</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
              <Ionicons name="star" size={12} color="#E23744" />
              <Text style={{ fontSize: 12, fontWeight: "700", color: colors.onSurface }}>4.6 (1,560)</Text>
            </View>
          </View>
        </View>

        {/* Date picker */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.md }}>
            <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface }}>Select date</Text>
            <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Ionicons name="calendar-outline" size={14} color={colors.brandPrimary} />
              <Text style={{ fontSize: 12, fontWeight: "700", color: colors.brandPrimary }}>Full calendar</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {days.map((d, i) => {
              const active = i === dayIdx;
              return (
                <Pressable
                  key={i}
                  testID={`day-${d.date}`}
                  onPress={() => setDayIdx(i)}
                  style={{
                    width: 56, paddingVertical: 10, borderRadius: radius.md, alignItems: "center",
                    backgroundColor: active ? colors.brandPrimary : colors.surfaceSecondary,
                    borderWidth: 1, borderColor: active ? colors.brandPrimary : colors.border,
                  }}
                >
                  <Text style={{ fontSize: 10, fontWeight: "700", color: active ? "rgba(255,255,255,0.8)" : colors.muted }}>{d.day.toUpperCase()}</Text>
                  <Text style={{ fontSize: 22, fontWeight: "800", color: active ? "#FFFFFF" : colors.onSurface, marginVertical: 2 }}>{d.date}</Text>
                  <Text style={{ fontSize: 10, color: active ? "rgba(255,255,255,0.8)" : colors.muted }}>{d.month}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Time picker */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card }}>
          <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface, marginBottom: spacing.md }}>Available times</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {times.map((t) => {
              const active = t === time;
              const disabled = t === "12:00" || t === "13:00";
              return (
                <Pressable
                  key={t}
                  testID={`time-${t}`}
                  disabled={disabled}
                  onPress={() => setTime(t)}
                  style={{
                    paddingHorizontal: spacing.md, paddingVertical: 10,
                    borderRadius: radius.pill,
                    backgroundColor: active ? colors.brandPrimary : (disabled ? colors.surfaceSecondary : colors.surface),
                    borderWidth: 1,
                    borderColor: active ? colors.brandPrimary : (disabled ? colors.border : colors.border),
                    opacity: disabled ? 0.4 : 1,
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "700", color: active ? "#FFFFFF" : colors.onSurface }}>
                    {t}{disabled ? " ×" : ""}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Party size */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface }}>Party size</Text>
            <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>Including yourself</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.surfaceSecondary, borderRadius: radius.pill, paddingHorizontal: 8, height: 44 }}>
            <Pressable onPress={() => setParty(Math.max(1, party - 1))} style={{ width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" }}><Ionicons name="remove" size={16} color={colors.onSurface} /></Pressable>
            <Text style={{ fontSize: 16, fontWeight: "800", color: colors.onSurface, minWidth: 24, textAlign: "center" }}>{party}</Text>
            <Pressable onPress={() => setParty(party + 1)} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.brandPrimary, alignItems: "center", justifyContent: "center" }}><Ionicons name="add" size={16} color="#FFFFFF" /></Pressable>
          </View>
        </View>

        {/* Special requests */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card }}>
          <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface, marginBottom: spacing.sm }}>Special requests</Text>
          <TextInput
            placeholder="e.g. Anniversary, window seat, high chair for kids..."
            placeholderTextColor={colors.muted}
            multiline
            style={{
              backgroundColor: colors.surfaceSecondary, borderRadius: radius.md,
              padding: spacing.md, fontSize: 13, color: colors.onSurface,
              minHeight: 80, textAlignVertical: "top",
            }}
          />
        </View>
      </KeyboardAwareScrollView>

      <KeyboardStickyView offset={{ closed: 0, opened: -insets.bottom + 8 }}>
        <View style={{
          paddingHorizontal: spacing.lg, paddingTop: spacing.md,
          paddingBottom: insets.bottom + spacing.md,
          backgroundColor: colors.surface,
          borderTopWidth: 1, borderTopColor: colors.border,
        }}>
          <Pressable
            testID="confirm-booking-cta"
            onPress={() => router.push("/booking/confirmation")}
            style={{
              backgroundColor: colors.brandPrimary, paddingVertical: 14,
              borderRadius: radius.pill, flexDirection: "row", alignItems: "center",
              paddingHorizontal: spacing.lg, gap: 8,
            }}
          >
            <Text style={{ flex: 1, color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>Confirm Booking</Text>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: "700" }}>{days[dayIdx].day} {days[dayIdx].date} • {time} • {party}p</Text>
          </Pressable>
        </View>
      </KeyboardStickyView>
    </View>
  );
}
