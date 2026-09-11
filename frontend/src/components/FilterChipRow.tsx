import { Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useTheme, spacing, radius } from "@/src/theme";

export function FilterChipRow({
  items,
  selected,
  onSelect,
  testID = "filter-chip-row",
}: {
  items: { id: string; label: string; icon?: string }[];
  selected: string;
  onSelect: (id: string) => void;
  testID?: string;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ height: 56, justifyContent: "center", backgroundColor: colors.surface }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: spacing.sm, paddingHorizontal: spacing.lg, alignItems: "center" }}
        testID={testID}
      >
        {items.map((it) => {
          const active = it.id === selected;
          return (
            <Pressable
              key={it.id}
              onPress={() => onSelect(it.id)}
              testID={`chip-${it.id}`}
              style={[
                s.chip,
                {
                  backgroundColor: active ? colors.brandPrimary : colors.surface,
                  borderColor: active ? colors.brandPrimary : colors.border,
                },
              ]}
            >
              {it.icon ? (
                <Ionicons
                  name={it.icon as any}
                  size={14}
                  color={active ? colors.onBrandPrimary : colors.onSurfaceSecondary}
                />
              ) : null}
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: active ? colors.onBrandPrimary : colors.onSurfaceSecondary,
                }}
              >
                {it.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  chip: {
    height: 36,
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.md + 2,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
});
