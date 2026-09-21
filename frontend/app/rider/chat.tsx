import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView, KeyboardStickyView } from "react-native-keyboard-controller";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRef, useState } from "react";

import { spacing, radius } from "@/src/theme";
import { rider as c, incomingOrder } from "@/src/data/rider-mock";

type Msg = { id: string; from: "me" | "them"; text: string; time: string; system?: boolean };

const initial: Msg[] = [
  { id: "s0", from: "them", text: "Order confirmed — chat opened", time: "12:32", system: true },
  { id: "m1", from: "them", text: "Hi! I've placed my order 🙏", time: "12:32" },
  { id: "m2", from: "me", text: "Hi Aisyah! I'm picking up your order now, be right there.", time: "12:34" },
  { id: "m3", from: "them", text: "Thanks! Building has a red gate, please ring apt 12A intercom.", time: "12:35" },
];

const riderQuick = [
  "I'm on the way",
  "I've arrived at the restaurant",
  "Picking up your order now",
  "I'm 5 min away",
  "I'm at your door",
  "Can you come down please?",
];

export default function RiderChat() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<any>(null);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    const time = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    setMessages((m) => [...m, { id: `n${m.length}`, from: "me", text: t, time }]);
    setDraft("");
    setTimeout(() => scrollRef.current?.scrollToEnd?.({ animated: true }), 100);
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      {/* Header */}
      <View style={{ paddingTop: insets.top, backgroundColor: c.bg2, borderBottomWidth: 1, borderBottomColor: c.border }}>
        <View style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <Pressable testID="chat-back" onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: c.bg3, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </Pressable>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: c.brandDim, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: c.brand }}>
            <Ionicons name="person" size={20} color={c.brand} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: c.text, fontSize: 15, fontWeight: "800" }}>{incomingOrder.customerName}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c.live }} />
              <Text style={{ color: c.textDim, fontSize: 11 }}>Online • Order #A247</Text>
            </View>
          </View>
          <Pressable style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: c.brand, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="call" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      {/* Order summary pill */}
      <Pressable style={{
        marginHorizontal: spacing.lg, marginTop: spacing.md,
        backgroundColor: c.bg2, borderRadius: radius.lg, borderWidth: 1, borderColor: c.border,
        padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md,
      }}>
        <Image source={{ uri: incomingOrder.restaurantImage }} style={{ width: 44, height: 44, borderRadius: radius.md }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: c.text, fontSize: 13, fontWeight: "700" }}>{incomingOrder.restaurantName}</Text>
          <Text style={{ color: c.textDim, fontSize: 11, marginTop: 2 }}>3 items • RM {incomingOrder.orderValue.toFixed(2)} • ETA {incomingOrder.etaMin}min</Text>
        </View>
        <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill, backgroundColor: c.brandDim }}>
          <Text style={{ color: c.brand, fontSize: 10, fontWeight: "800" }}>IN PROGRESS</Text>
        </View>
      </Pressable>

      {/* Messages */}
      <KeyboardAwareScrollView
        ref={scrollRef}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: 60, gap: 8 }}
        bottomOffset={160}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((m, i) => {
          if (m.system) {
            return (
              <View key={m.id} style={{ alignItems: "center", marginVertical: 8 }}>
                <View style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.pill, backgroundColor: c.bg2, borderWidth: 1, borderColor: c.border }}>
                  <Text style={{ color: c.textDim, fontSize: 10, fontWeight: "700" }}>{m.text.toUpperCase()} • {m.time}</Text>
                </View>
              </View>
            );
          }
          const mine = m.from === "me";
          const prev = messages[i - 1];
          const grouped = prev && !prev.system && prev.from === m.from;
          return (
            <View key={m.id} style={{ flexDirection: "row", justifyContent: mine ? "flex-end" : "flex-start", marginTop: grouped ? 2 : 8 }}>
              <View style={{
                maxWidth: "78%",
                paddingHorizontal: 14, paddingVertical: 10,
                borderRadius: 18,
                backgroundColor: mine ? c.brand : c.bg2,
                borderWidth: mine ? 0 : 1,
                borderColor: c.border,
                borderTopLeftRadius: !mine && grouped ? 6 : 18,
                borderTopRightRadius: mine && grouped ? 6 : 18,
              }}>
                <Text style={{ color: mine ? "#FFFFFF" : c.text, fontSize: 14, lineHeight: 20 }}>{m.text}</Text>
                <Text style={{ color: mine ? "rgba(255,255,255,0.75)" : c.textDim, fontSize: 10, marginTop: 4, textAlign: "right" }}>
                  {m.time}{mine ? " · seen" : ""}
                </Text>
              </View>
            </View>
          );
        })}
      </KeyboardAwareScrollView>

      {/* Quick replies + composer */}
      <KeyboardStickyView offset={{ closed: 0, opened: -insets.bottom + 8 }}>
        <View style={{ backgroundColor: c.bg2, borderTopWidth: 1, borderTopColor: c.border }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: spacing.md, gap: 8 }}>
            {riderQuick.map((q) => (
              <Pressable
                key={q}
                testID={`quick-${q.slice(0, 6)}`}
                onPress={() => send(q)}
                style={{
                  height: 32, paddingHorizontal: 12, borderRadius: radius.pill,
                  backgroundColor: c.bg3, borderWidth: 1, borderColor: c.border,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: c.text, fontSize: 12, fontWeight: "600" }}>{q}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={{
            flexDirection: "row", alignItems: "center", gap: 8,
            paddingHorizontal: spacing.md, paddingBottom: insets.bottom + spacing.sm,
          }}>
            <Pressable style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: c.bg3, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: c.border }}>
              <Ionicons name="camera" size={18} color={c.textDim} />
            </Pressable>
            <View style={{
              flex: 1, minHeight: 42, flexDirection: "row", alignItems: "center",
              paddingHorizontal: 14, backgroundColor: c.bg3, borderRadius: radius.pill,
              borderWidth: 1, borderColor: c.border,
            }}>
              <TextInput
                testID="chat-input"
                value={draft}
                onChangeText={setDraft}
                placeholder="Message Aisyah…"
                placeholderTextColor={c.textMuted}
                multiline
                style={{ flex: 1, color: c.text, fontSize: 14, maxHeight: 100, paddingTop: 10, paddingBottom: 10 }}
              />
            </View>
            <Pressable
              testID="chat-send"
              onPress={() => send(draft)}
              disabled={!draft.trim()}
              style={{
                width: 42, height: 42, borderRadius: 21,
                backgroundColor: draft.trim() ? c.brand : c.bg3,
                alignItems: "center", justifyContent: "center",
              }}
            >
              <Ionicons name="send" size={18} color={draft.trim() ? "#FFFFFF" : c.textMuted} />
            </Pressable>
          </View>
        </View>
      </KeyboardStickyView>
    </View>
  );
}
