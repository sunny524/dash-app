// Mock data for EasyEat static prototype (Malaysian market)

export type Restaurant = {
  id: string;
  name: string;
  image: string;
  cuisines: string[];
  rating: number;
  reviews: number;
  distanceKm: number;
  etaMin: number;
  priceRange: "$" | "$$" | "$$$";
  promo?: string;
  pickupAvailable?: boolean;
  bookingAvailable?: boolean;
  address: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
};

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Nasi Lemak Village",
    image: "https://images.unsplash.com/photo-1677921755291-c39158477b8e?w=800&q=80",
    cuisines: ["Malay", "Halal", "Local"],
    rating: 4.8,
    reviews: 1240,
    distanceKm: 0.8,
    etaMin: 20,
    priceRange: "$",
    promo: "20% OFF",
    pickupAvailable: true,
    bookingAvailable: true,
    address: "Jalan Bukit Bintang, KL",
  },
  {
    id: "r2",
    name: "Ah Kau Char Kway Teow",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&q=80",
    cuisines: ["Chinese", "Hawker", "Noodles"],
    rating: 4.7,
    reviews: 890,
    distanceKm: 1.2,
    etaMin: 25,
    priceRange: "$",
    pickupAvailable: true,
    address: "Petaling Street, KL",
  },
  {
    id: "r3",
    name: "Satay Station",
    image: "https://images.unsplash.com/photo-1696385793104-745d4dd65c5a?w=800&q=80",
    cuisines: ["Malay", "BBQ", "Halal"],
    rating: 4.9,
    reviews: 2103,
    distanceKm: 2.4,
    etaMin: 30,
    priceRange: "$$",
    promo: "Free Delivery",
    pickupAvailable: true,
    bookingAvailable: true,
    address: "Kampung Baru, KL",
  },
  {
    id: "r4",
    name: "Dim Sum Palace",
    image: "https://images.unsplash.com/photo-1767298113547-11e95951608b?w=800&q=80",
    cuisines: ["Chinese", "Dim Sum", "Cantonese"],
    rating: 4.6,
    reviews: 1560,
    distanceKm: 3.1,
    etaMin: 35,
    priceRange: "$$$",
    bookingAvailable: true,
    address: "Pavilion KL",
  },
  {
    id: "r5",
    name: "Roti Canai Maju",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
    cuisines: ["Mamak", "Indian", "Halal"],
    rating: 4.5,
    reviews: 720,
    distanceKm: 0.5,
    etaMin: 15,
    priceRange: "$",
    pickupAvailable: true,
    address: "Jalan Ampang, KL",
  },
  {
    id: "r6",
    name: "Laksa Sarawak Corner",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&q=80",
    cuisines: ["Malay", "Soup", "Local"],
    rating: 4.7,
    reviews: 430,
    distanceKm: 4.0,
    etaMin: 40,
    priceRange: "$$",
    bookingAvailable: true,
    address: "Bangsar, KL",
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "m1",
    name: "Nasi Lemak Ayam Rendang",
    description: "Fragrant coconut rice, spicy sambal, crispy anchovies, peanuts, egg & tender chicken rendang.",
    price: 15.9,
    image: "https://images.unsplash.com/photo-1677921755291-c39158477b8e?w=800&q=80",
    category: "Signature",
    popular: true,
  },
  {
    id: "m2",
    name: "Nasi Lemak Sambal Sotong",
    description: "Classic nasi lemak with sweet & spicy squid sambal.",
    price: 14.5,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80",
    category: "Signature",
    popular: true,
  },
  {
    id: "m3",
    name: "Roti Canai (2 pcs)",
    description: "Flaky flatbread served with dhal and curry.",
    price: 4.5,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
    category: "Breakfast",
  },
  {
    id: "m4",
    name: "Teh Tarik",
    description: "Pulled milk tea, the Malaysian way.",
    price: 3.5,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80",
    category: "Drinks",
  },
  {
    id: "m5",
    name: "Chicken Satay (10 sticks)",
    description: "Grilled chicken skewers with peanut sauce, ketupat & cucumber.",
    price: 18.0,
    image: "https://images.unsplash.com/photo-1696385793104-745d4dd65c5a?w=800&q=80",
    category: "Grill",
    popular: true,
  },
  {
    id: "m6",
    name: "Mee Goreng Mamak",
    description: "Stir-fried yellow noodles with prawns, egg & spicy chili paste.",
    price: 9.9,
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&q=80",
    category: "Mains",
  },
];

export const cuisineChips = [
  { id: "all", label: "All", icon: "grid" },
  { id: "halal", label: "Halal", icon: "leaf" },
  { id: "malay", label: "Malay", icon: "restaurant" },
  { id: "chinese", label: "Chinese", icon: "restaurant" },
  { id: "indian", label: "Indian", icon: "restaurant" },
  { id: "western", label: "Western", icon: "pizza" },
  { id: "drinks", label: "Drinks", icon: "cafe" },
  { id: "dessert", label: "Dessert", icon: "ice-cream" },
];

export const promos = [
  {
    id: "p1",
    title: "Free Delivery",
    subtitle: "On orders above RM25",
    color: "#00B14F",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
  },
  {
    id: "p2",
    title: "50% OFF Lunch",
    subtitle: "Weekdays 11am–2pm",
    color: "#FF6B35",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
  {
    id: "p3",
    title: "RM10 Cashback",
    subtitle: "Book a table this week",
    color: "#4A90E2",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  },
];

export const orders = [
  {
    id: "o1",
    restaurant: "Nasi Lemak Village",
    image: "https://images.unsplash.com/photo-1677921755291-c39158477b8e?w=400&q=80",
    items: 3,
    total: 34.4,
    status: "Out for delivery",
    date: "Today, 12:30 PM",
    type: "Delivery",
  },
  {
    id: "o2",
    restaurant: "Satay Station",
    image: "https://images.unsplash.com/photo-1696385793104-745d4dd65c5a?w=400&q=80",
    items: 2,
    total: 22.0,
    status: "Ready for pickup",
    date: "Today, 1:15 PM",
    type: "Pickup",
  },
  {
    id: "o3",
    restaurant: "Ah Kau Char Kway Teow",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&q=80",
    items: 4,
    total: 28.9,
    status: "Delivered",
    date: "Yesterday, 7:20 PM",
    type: "Delivery",
  },
  {
    id: "o4",
    restaurant: "Dim Sum Palace",
    image: "https://images.unsplash.com/photo-1767298113547-11e95951608b?w=400&q=80",
    items: 6,
    total: 82.5,
    status: "Paid",
    date: "Mon, 8:45 PM",
    type: "Dine-in",
  },
];

export const bookings = [
  {
    id: "b1",
    restaurant: "Dim Sum Palace",
    image: "https://images.unsplash.com/photo-1767298113547-11e95951608b?w=400&q=80",
    date: "Sat, 25 May",
    time: "7:30 PM",
    partySize: 4,
    status: "Confirmed",
    address: "Pavilion KL, Level 6",
  },
  {
    id: "b2",
    restaurant: "Satay Station",
    image: "https://images.unsplash.com/photo-1696385793104-745d4dd65c5a?w=400&q=80",
    date: "Sun, 26 May",
    time: "6:00 PM",
    partySize: 2,
    status: "Confirmed",
    address: "Kampung Baru, KL",
  },
  {
    id: "b3",
    restaurant: "Laksa Sarawak Corner",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400&q=80",
    date: "Fri, 17 May",
    time: "1:00 PM",
    partySize: 3,
    status: "Completed",
    address: "Bangsar, KL",
  },
];

export const addresses = [
  { id: "a1", label: "Home", address: "12A, Jalan Bukit Bintang, 55100 Kuala Lumpur", icon: "home" },
  { id: "a2", label: "Work", address: "Menara KL, Jalan Puncak, 50250 Kuala Lumpur", icon: "briefcase" },
  { id: "a3", label: "Parents", address: "45, Jalan Ampang Hilir, 55000 KL", icon: "heart" },
];

export const paymentMethods = [
  { id: "pm1", label: "Visa •••• 4821", type: "card", icon: "card" },
  { id: "pm2", label: "Touch 'n Go eWallet", type: "wallet", icon: "wallet" },
  { id: "pm3", label: "DuitNow QR", type: "qr", icon: "qr-code" },
  { id: "pm4", label: "Cash on Delivery", type: "cash", icon: "cash" },
];
