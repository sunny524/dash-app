import { Pressable, Text, View } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { makeStyles, spacing, radius } from "@/src/theme";

const useStyles = makeStyles((c) => ({
  tile: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: c.brandTertiary,
    borderRadius: radius.lg,
    padding: spacing.md,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: c.border,
  },
  iconWrap: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: c.surface,
    alignItems: "center", justifyContent: "center",
  },
  label: { fontSize: 15, fontWeight: "700", color: c.onSurface },
  subtitle: { fontSize: 11, color: c.muted, marginTop: 2 },
  badge: {
    position: "absolute",
    top: spacing.sm, right: spacing.sm,
    backgroundColor: c.brandPrimary,
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: radius.pill,
  },
  badgeText: { color: c.onBrandPrimary, fontSize: 10, fontWeight: "700" },
}));

export function ServiceTile({
  icon, label, subtitle, onPress, badge, testID,
}: {
  icon: string; label: string; subtitle: string; onPress?: () => void; badge?: string; testID?: string;
}) {
  const styles = useStyles();
  return (
    <Pressable onPress={onPress} style={styles.tile} testID={testID}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon as any} size={24} color="#00B14F" />
      </View>
      {badge ? (
        <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>
      ) : null}
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}
