import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useEffect, useState } from "react";

import { spacing, radius } from "@/src/theme";
import { rider as c, incomingOrder, riderProfile, incentives } from "@/src/data/rider-mock";

export default function RiderHome() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [online, setOnline] = useState(true);
  const [showRequest, setShowRequest] = useState(false);
  const [timer, setTimer] = useState(15);

  // simulate incoming order after going online
  useEffect(() => {
    if (!online) { setShowRequest(false); return; }
    const t = setTimeout(() => setShowRequest(true), 800);
    return () => clearTimeout(t);
  }, [online]);

  // request countdown
  useEffect(() => {
    if (!showRequest) { setTimer(15); return; }
    if (timer <= 0) { setShowRequest(false); return; }
    const t = setTimeout(() => setTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [showRequest, timer]);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      {/* Header */}
      <View style={{ paddingTop: insets.top }}>
        <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <Image source={{ uri: riderProfile.avatar }} style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: online ? c.live : c.border }} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: c.textDim, fontSize: 11, fontWeight: "700", letterSpacing: 0.6 }}>GOOD AFTERNOON</Text>
            <Text style={{ color: c.text, fontSize: 16, fontWeight: "800", marginTop: 2 }}>{riderProfile.name}</Text>
          </View>
          <Pressable style={btnDark}>
            <Ionicons name="help-circle-outline" size={22} color={c.text} />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        {/* Online toggle hero */}
        <View style={{ marginHorizontal: spacing.lg, marginTop: spacing.sm }}>
          <LinearGradient
            colors={online ? [c.brand, "#8B1A24"] : [c.bg2, c.bg3]}
            style={{ borderRadius: radius.lg, padding: spacing.lg }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: online ? c.live : c.textMuted }} />
                  <Text style={{ color: online ? "rgba(255,255,255,0.9)" : c.textDim, fontSize: 11, fontWeight: "800", letterSpacing: 0.6 }}>
                    {online ? "YOU'RE ONLINE" : "YOU'RE OFFLINE"}
                  </Text>
                </View>
                <Text style={{ color: online ? "#FFFFFF" : c.text, fontSize: 24, fontWeight: "800", marginTop: 6 }}>
                  {online ? "Ready to ride" : "Go online to start"}
                </Text>
                <Text style={{ color: online ? "rgba(255,255,255,0.85)" : c.textDim, fontSize: 12, marginTop: 4 }}>
                  {online ? "Bukit Bintang zone • Peak hour bonus active" : "Turn on to receive delivery requests"}
                </Text>
              </View>
              <Pressable
                testID="online-toggle"
                onPress={() => setOnline(!online)}
                style={{
                  width: 56, height: 32, borderRadius: 16,
                  backgroundColor: online ? "rgba(255,255,255,0.3)" : c.bg,
                  justifyContent: "center", paddingHorizontal: 4,
                }}
              >
                <View style={{
                  width: 24, height: 24, borderRadius: 12,
                  backgroundColor: online ? "#FFFFFF" : c.textMuted,
                  alignSelf: online ? "flex-end" : "flex-start",
                }} />
              </Pressable>
            </View>

            {/* Quick stats row */}
            <View style={{ flexDirection: "row", marginTop: spacing.lg, gap: spacing.md }}>
              <StatMini label="Today" value={`RM ${riderProfile.todayEarnings.toFixed(2)}`} icon="cash" light={online} />
              <StatMini label="Trips" value={`${riderProfile.todayDeliveries}`} icon="bicycle" light={online} />
              <StatMini label="Hours" value={`${riderProfile.todayHours}h`} icon="time" light={online} />
            </View>
          </LinearGradient>
        </View>

        {/* Incentives */}
        <View style={{ marginTop: spacing.lg }}>
          <View style={{ paddingHorizontal: spacing.lg, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <Text style={{ color: c.text, fontSize: 15, fontWeight: "800" }}>Incentives</Text>
            <Pressable><Text style={{ color: c.brand, fontSize: 12, fontWeight: "700" }}>View all</Text></Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: spacing.md }}>
            {incentives.map((it) => (
              <View key={it.id} style={{
                width: 240, backgroundColor: c.bg2, borderRadius: radius.lg,
                padding: spacing.md, borderWidth: 1, borderColor: c.border,
              }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill, backgroundColor: it.live ? c.brand : c.brandDim, flexDirection: "row", alignItems: "center", gap: 4 }}>
                    {it.live && <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#FFFFFF" }} />}
                    <Text style={{ color: it.live ? "#FFFFFF" : c.brand, fontSize: 10, fontWeight: "800" }}>{it.live ? "LIVE NOW" : "TODAY"}</Text>
                  </View>
                  <Text style={{ color: c.brand, fontSize: 16, fontWeight: "800" }}>{it.reward}</Text>
                </View>
                <Text style={{ color: c.text, fontSize: 14, fontWeight: "800", marginTop: 10 }}>{it.title}</Text>
                <Text style={{ color: c.textDim, fontSize: 11, marginTop: 2 }}>{it.subtitle}</Text>
                {it.goal > 0 && (
                  <>
                    <View style={{ height: 6, backgroundColor: c.bg3, borderRadius: 3, marginTop: 10, overflow: "hidden" }}>
                      <View style={{ width: `${(it.progress / it.goal) * 100}%`, height: "100%", backgroundColor: c.brand }} />
                    </View>
                    <Text style={{ color: c.textDim, fontSize: 10, marginTop: 4 }}>{it.progress}/{it.goal} deliveries • {it.endsAt}</Text>
                  </>
                )}
                {it.goal === 0 && <Text style={{ color: c.textDim, fontSize: 10, marginTop: 10 }}>{it.endsAt}</Text>}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Quick actions */}
        <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.lg }}>
          <Text style={{ color: c.text, fontSize: 15, fontWeight: "800", marginBottom: 8 }}>Quick access</Text>
          <View style={{ flexDirection: "row", gap: spacing.md }}>
            <QuickBtn icon="wallet" label="Cash Out" sub="RM 128 ready" onPress={() => router.push("/rider/(tabs)/earnings")} />
            <QuickBtn icon="analytics" label="Insights" sub="Weekly report" onPress={() => router.push("/rider/(tabs)/earnings")} />
          </View>
          <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.md }}>
            <QuickBtn icon="list" label="History" sub="12 today" onPress={() => router.push("/rider/(tabs)/jobs")} />
            <QuickBtn icon="school" label="Safety Tips" sub="New guide" />
          </View>
        </View>

        {/* Zones */}
        <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.lg }}>
          <Text style={{ color: c.text, fontSize: 15, fontWeight: "800", marginBottom: 8 }}>Hot zones nearby</Text>
          <View style={{ backgroundColor: c.bg2, borderRadius: radius.lg, borderWidth: 1, borderColor: c.border }}>
            {[
              { name: "Bukit Bintang", surge: "1.5×", ordersMin: 22 },
              { name: "KLCC", surge: "1.3×", ordersMin: 14 },
              { name: "Bangsar", surge: "1.2×", ordersMin: 9 },
            ].map((z, i) => (
              <View key={z.name} style={{
                flexDirection: "row", alignItems: "center", gap: spacing.md,
                padding: spacing.md,
                borderTopWidth: i === 0 ? 0 : 1, borderTopColor: c.divider,
              }}>
                <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: c.brandDim, alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="flame" size={18} color={c.warning} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: c.text, fontSize: 14, fontWeight: "700" }}>{z.name}</Text>
                  <Text style={{ color: c.textDim, fontSize: 11, marginTop: 2 }}>{z.ordersMin} orders/min</Text>
                </View>
                <View style={{ paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.pill, backgroundColor: c.brand }}>
                  <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "800" }}>{z.surge}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Incoming order overlay */}
      {showRequest && online && (
        <View style={{
          position: "absolute", inset: 0,
          backgroundColor: c.overlay,
          justifyContent: "flex-end",
        }}>
          <View style={{
            backgroundColor: c.bg2,
            borderTopLeftRadius: 28, borderTopRightRadius: 28,
            padding: spacing.lg,
            paddingBottom: insets.bottom + spacing.lg,
            borderTopWidth: 3, borderTopColor: c.brand,
          }}>
            {/* Timer bar */}
            <View style={{ height: 4, backgroundColor: c.bg3, borderRadius: 2, marginBottom: spacing.md, overflow: "hidden" }}>
              <View style={{ width: `${(timer / 15) * 100}%`, height: "100%", backgroundColor: timer < 5 ? c.error : c.brand, borderRadius: 2 }} />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.md }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c.live }} />
                <Text style={{ color: c.text, fontSize: 14, fontWeight: "800" }}>New delivery request</Text>
              </View>
              <Text style={{ color: timer < 5 ? c.error : c.textDim, fontSize: 13, fontWeight: "800" }}>{timer}s</Text>
            </View>

            {/* Big earning */}
            <View style={{ alignItems: "center", paddingVertical: 8 }}>
              <Text style={{ color: c.textDim, fontSize: 11, fontWeight: "700", letterSpacing: 0.6 }}>YOU EARN</Text>
              <Text style={{ color: c.brand, fontSize: 40, fontWeight: "800", letterSpacing: -1 }}>RM {incomingOrder.earnings.toFixed(2)}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Ionicons name="location-outline" size={12} color={c.textDim} />
                  <Text style={{ color: c.textDim, fontSize: 12 }}>{incomingOrder.totalDistanceKm} km total</Text>
                </View>
                <Text style={{ color: c.textMuted }}>•</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Ionicons name="time-outline" size={12} color={c.textDim} />
                  <Text style={{ color: c.textDim, fontSize: 12 }}>~{incomingOrder.etaMin} min</Text>
                </View>
              </View>
            </View>

            {/* Route */}
            <View style={{ backgroundColor: c.bg3, borderRadius: radius.lg, padding: spacing.md, marginTop: spacing.md, borderWidth: 1, borderColor: c.border }}>
              <RouteRow
                icon="restaurant"
                iconBg={c.brandDim}
                iconColor={c.brand}
                label="PICKUP"
                title={incomingOrder.restaurantName}
                sub={incomingOrder.restaurantAddress}
                distance={`${incomingOrder.distanceToRestaurantKm} km away`}
              />
              <View style={{ marginLeft: 17, height: 20, width: 2, backgroundColor: c.border, marginVertical: 2 }} />
              <RouteRow
                icon="location"
                iconBg={c.bg}
                iconColor={c.warning}
                label="DROP-OFF"
                title={incomingOrder.customerName}
                sub={incomingOrder.customerAddress}
                distance={`${incomingOrder.distanceToCustomerKm} km`}
              />
            </View>

            {/* Actions */}
            <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.lg }}>
              <Pressable
                testID="reject-order"
                onPress={() => setShowRequest(false)}
                style={{
                  flex: 1, height: 52, borderRadius: radius.pill,
                  backgroundColor: c.bg3, borderWidth: 1, borderColor: c.border,
                  alignItems: "center", justifyContent: "center",
                }}
              >
                <Text style={{ color: c.textDim, fontSize: 14, fontWeight: "700" }}>Decline</Text>
              </Pressable>
              <Pressable
                testID="accept-order"
                onPress={() => {
                  setShowRequest(false);
                  router.push("/rider/active");
                }}
                style={{
                  flex: 2, height: 52, borderRadius: radius.pill,
                  backgroundColor: c.brand,
                  alignItems: "center", justifyContent: "center",
                  flexDirection: "row", gap: 8,
                }}
              >
                <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>Accept Delivery</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

function RouteRow({ icon, iconBg, iconColor, label, title, sub, distance }: any) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: iconBg, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: c.textDim, fontSize: 10, fontWeight: "700", letterSpacing: 0.5 }}>{label}</Text>
        <Text style={{ color: c.text, fontSize: 14, fontWeight: "700" }} numberOfLines={1}>{title}</Text>
        <Text style={{ color: c.textDim, fontSize: 11 }} numberOfLines={1}>{sub}</Text>
      </View>
      <Text style={{ color: c.textDim, fontSize: 11, fontWeight: "700" }}>{distance}</Text>
    </View>
  );
}

function StatMini({ label, value, icon, light }: { label: string; value: string; icon: string; light: boolean }) {
  return (
    <View style={{ flex: 1, backgroundColor: light ? "rgba(255,255,255,0.15)" : c.bg3, borderRadius: radius.md, padding: 10 }}>
      <Ionicons name={icon as any} size={13} color={light ? "rgba(255,255,255,0.85)" : c.textDim} />
      <Text style={{ color: light ? "#FFFFFF" : c.text, fontSize: 14, fontWeight: "800", marginTop: 4 }}>{value}</Text>
      <Text style={{ color: light ? "rgba(255,255,255,0.7)" : c.textDim, fontSize: 10 }}>{label}</Text>
    </View>
  );
}

function QuickBtn({ icon, label, sub, onPress }: { icon: string; label: string; sub: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={{
      flex: 1, backgroundColor: c.bg2, borderRadius: radius.lg,
      padding: spacing.md, borderWidth: 1, borderColor: c.border,
    }}>
      <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: c.brandDim, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name={icon as any} size={18} color={c.brand} />
      </View>
      <Text style={{ color: c.text, fontSize: 13, fontWeight: "800", marginTop: 8 }}>{label}</Text>
      <Text style={{ color: c.textDim, fontSize: 11, marginTop: 2 }}>{sub}</Text>
    </Pressable>
  );
}

const btnDark = {
  width: 40, height: 40, borderRadius: 20,
  backgroundColor: c.bg2, borderWidth: 1, borderColor: c.border,
  alignItems: "center" as const, justifyContent: "center" as const,
};
