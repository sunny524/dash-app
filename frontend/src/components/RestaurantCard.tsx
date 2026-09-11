import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";

import { makeStyles, spacing, radius, shadow } from "@/src/theme";
import type { Restaurant } from "@/src/data/mock";

const useStyles = makeStyles((c) => ({
  card: {
    backgroundColor: c.surface,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
    overflow: "hidden",
    ...shadow.card,
  },
  imageWrap: { width: "100%", height: 160, backgroundColor: c.surfaceTertiary },
  image: { width: "100%", height: "100%" },
  promoTag: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    backgroundColor: c.brandPrimary,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  promoText: { color: c.onBrandPrimary, fontSize: 12, fontWeight: "700" },
  favBtn: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center", justifyContent: "center",
  },
  body: { padding: spacing.lg },
  name: { fontSize: 17, fontWeight: "700", color: c.onSurface, marginBottom: 4 },
  metaRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: spacing.sm },
  metaChip: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 13, color: c.onSurfaceSecondary, fontWeight: "500" },
  dot: { fontSize: 13, color: c.muted, marginHorizontal: 2 },
  cuisines: { fontSize: 13, color: c.muted, marginTop: 4 },
  ratingBadge: {
    flexDirection: "row", alignItems: "center", gap: 3,
    backgroundColor: c.brandTertiary,
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: radius.pill,
  },
  ratingText: { fontSize: 12, fontWeight: "700", color: c.onBrandTertiary },
}));

export function RestaurantCard({ r, onPress, compact = false }: { r: Restaurant; onPress?: () => void; compact?: boolean }) {
  const styles = useStyles();
  return (
    <Pressable onPress={onPress} testID={`restaurant-card-${r.id}`} style={styles.card}>
      <View style={[styles.imageWrap, compact && { height: 130 }]}>
        <Image source={{ uri: r.image }} style={styles.image} contentFit="cover" />
        {r.promo ? (
          <View style={styles.promoTag}><Text style={styles.promoText}>{r.promo}</Text></View>
        ) : null}
        <View style={styles.favBtn}>
          <Ionicons name="heart-outline" size={18} color="#1C1C1E" />
        </View>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.15)"]}
          style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 50 }}
        />
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Text style={styles.name} numberOfLines={1}>{r.name}</Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="#00B14F" />
            <Text style={styles.ratingText}>{r.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.cuisines} numberOfLines={1}>{r.cuisines.join(" • ")}  •  {r.priceRange}</Text>
        <View style={[styles.metaRow, { marginTop: spacing.sm }]}>
          <View style={styles.metaChip}>
            <Ionicons name="time-outline" size={14} color="#3A3A3C" />
            <Text style={styles.metaText}>{r.etaMin} min</Text>
          </View>
          <Text style={styles.dot}>•</Text>
          <View style={styles.metaChip}>
            <Ionicons name="location-outline" size={14} color="#3A3A3C" />
            <Text style={styles.metaText}>{r.distanceKm} km</Text>
          </View>
          <Text style={styles.dot}>•</Text>
          <View style={styles.metaChip}>
            <Ionicons name="chatbubble-ellipses-outline" size={14} color="#3A3A3C" />
            <Text style={styles.metaText}>{r.reviews}+</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
