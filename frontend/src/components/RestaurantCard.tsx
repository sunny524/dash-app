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
    marginBottom: spacing.md,
    overflow: "hidden",
    ...shadow.card,
  },
  imageWrap: { width: "100%", height: 140, backgroundColor: c.surfaceTertiary },
  image: { width: "100%", height: "100%" },
  promoTag: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: c.brandPrimary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  promoText: { color: c.onBrandPrimary, fontSize: 11, fontWeight: "700" },
  favBtn: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center", justifyContent: "center",
  },
  body: { paddingHorizontal: spacing.md, paddingVertical: 10 },
  name: { fontSize: 15, fontWeight: "700", color: c.onSurface, marginBottom: 2 },
  metaRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 6 },
  metaChip: { flexDirection: "row", alignItems: "center", gap: 3 },
  metaText: { fontSize: 12, color: c.onSurfaceSecondary, fontWeight: "500" },
  dot: { fontSize: 12, color: c.muted },
  cuisines: { fontSize: 12, color: c.muted, marginTop: 2 },
  ratingBadge: {
    flexDirection: "row", alignItems: "center", gap: 3,
    backgroundColor: c.brandTertiary,
    paddingHorizontal: 7, paddingVertical: 2,
    borderRadius: radius.pill,
  },
  ratingText: { fontSize: 11, fontWeight: "700", color: c.onBrandTertiary },
  // compact list row
  row: {
    flexDirection: "row",
    backgroundColor: c.surface,
    borderRadius: radius.lg,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    gap: spacing.md,
    alignItems: "center",
    ...shadow.card,
  },
  rowImg: { width: 76, height: 76, borderRadius: radius.md, backgroundColor: c.surfaceTertiary },
}));

export function RestaurantCard({ r, onPress, compact = false }: { r: Restaurant; onPress?: () => void; compact?: boolean }) {
  const styles = useStyles();

  if (compact) {
    return (
      <Pressable onPress={onPress} testID={`restaurant-card-${r.id}`} style={styles.row}>
        <Image source={{ uri: r.image }} style={styles.rowImg} contentFit="cover" />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={styles.name} numberOfLines={1}>{r.name}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={11} color="#E23744" />
              <Text style={styles.ratingText}>{r.rating.toFixed(1)}</Text>
            </View>
          </View>
          <Text style={styles.cuisines} numberOfLines={1}>{r.cuisines.join(" • ")} • {r.priceRange}</Text>
          <View style={[styles.metaRow, { marginTop: 6 }]}>
            <View style={styles.metaChip}>
              <Ionicons name="time-outline" size={12} color="#3A3A3C" />
              <Text style={styles.metaText}>{r.etaMin}min</Text>
            </View>
            <Text style={styles.dot}>•</Text>
            <View style={styles.metaChip}>
              <Ionicons name="location-outline" size={12} color="#3A3A3C" />
              <Text style={styles.metaText}>{r.distanceKm}km</Text>
            </View>
            {r.promo ? (
              <>
                <Text style={styles.dot}>•</Text>
                <Text style={[styles.metaText, { color: "#E23744", fontWeight: "700" }]}>{r.promo}</Text>
              </>
            ) : null}
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} testID={`restaurant-card-${r.id}`} style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: r.image }} style={styles.image} contentFit="cover" />
        {r.promo ? (
          <View style={styles.promoTag}><Text style={styles.promoText}>{r.promo}</Text></View>
        ) : null}
        <View style={styles.favBtn}>
          <Ionicons name="heart-outline" size={16} color="#1C1C1E" />
        </View>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.12)"]}
          style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 40 }}
        />
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={styles.name} numberOfLines={1}>{r.name}</Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={11} color="#E23744" />
            <Text style={styles.ratingText}>{r.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.cuisines} numberOfLines={1}>{r.cuisines.join(" • ")} • {r.priceRange}</Text>
        <View style={[styles.metaRow, { marginTop: 6 }]}>
          <View style={styles.metaChip}>
            <Ionicons name="time-outline" size={12} color="#3A3A3C" />
            <Text style={styles.metaText}>{r.etaMin} min</Text>
          </View>
          <Text style={styles.dot}>•</Text>
          <View style={styles.metaChip}>
            <Ionicons name="location-outline" size={12} color="#3A3A3C" />
            <Text style={styles.metaText}>{r.distanceKm} km</Text>
          </View>
          <Text style={styles.dot}>•</Text>
          <View style={styles.metaChip}>
            <Ionicons name="chatbubble-ellipses-outline" size={12} color="#3A3A3C" />
            <Text style={styles.metaText}>{r.reviews}+</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
