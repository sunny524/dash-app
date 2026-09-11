import { Text, View } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useTheme, spacing } from "@/src/theme";

export type Step = { title: string; subtitle?: string; done: boolean; active?: boolean; icon?: string };

export function StatusStepper({ steps }: { steps: Step[] }) {
  const { colors } = useTheme();
  return (
    <View style={{ paddingVertical: spacing.md }}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const dotColor = step.done || step.active ? colors.brandPrimary : colors.surfaceTertiary;
        const lineColor = step.done ? colors.brandPrimary : colors.border;
        return (
          <View key={i} style={{ flexDirection: "row", minHeight: 64 }}>
            <View style={{ alignItems: "center", width: 36 }}>
              <View style={{
                width: 32, height: 32, borderRadius: 16,
                backgroundColor: dotColor,
                alignItems: "center", justifyContent: "center",
                borderWidth: step.active ? 3 : 0,
                borderColor: colors.brandTertiary,
              }}>
                {step.done ? (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                ) : step.active ? (
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.onBrandPrimary }} />
                ) : (
                  <Ionicons name={(step.icon || "ellipse") as any} size={12} color={colors.muted} />
                )}
              </View>
              {!isLast && (
                <View style={{ flex: 1, width: 2, backgroundColor: lineColor, marginVertical: 4 }} />
              )}
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md, paddingBottom: spacing.md }}>
              <Text style={{
                fontSize: 15, fontWeight: step.active ? "700" : "600",
                color: step.done || step.active ? colors.onSurface : colors.muted,
              }}>{step.title}</Text>
              {step.subtitle ? (
                <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{step.subtitle}</Text>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}
