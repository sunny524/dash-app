// Rider app dark theme colors + mock data

export const rider = {
  bg: "#0B0F14",           // primary dark canvas
  bg2: "#141A21",          // cards
  bg3: "#1D242D",          // deeper surfaces
  border: "#242C36",
  divider: "#1B222B",
  text: "#FFFFFF",
  textDim: "#9AA4B1",
  textMuted: "#66707C",
  brand: "#E23744",
  brandDim: "#3A1519",
  warning: "#F5A623",
  error: "#FF453A",
  live: "#FF5C6C",
  overlay: "rgba(0,0,0,0.6)",
};

// Incoming order matches the customer-side order o1 (Nasi Lemak Village)
export const incomingOrder = {
  id: "REQ-A247",
  restaurantName: "Nasi Lemak Village",
  restaurantAddress: "Jalan Bukit Bintang, KL",
  restaurantImage: "https://images.unsplash.com/photo-1677921755291-c39158477b8e?w=400&q=80",
  customerName: "Aisyah R.",
  customerAddress: "12A, Jalan Bukit Bintang, 55100 KL",
  distanceToRestaurantKm: 1.2,
  distanceToCustomerKm: 0.8,
  totalDistanceKm: 2.0,
  etaMin: 22,
  itemsCount: 3,
  orderValue: 34.4,
  earnings: 8.5,
  tip: 2.0,
  timestamp: "12:32 PM",
};

export const riderProfile = {
  name: "Farhan Ahmad",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  rating: 4.92,
  totalDeliveries: 1284,
  memberSince: "Mar 2023",
  vehicle: {
    type: "Motorcycle",
    model: "Honda Wave 125",
    plate: "WCF 8829",
  },
  todayEarnings: 128.5,
  todayDeliveries: 12,
  todayHours: 5.2,
  weekEarnings: 842.3,
  monthEarnings: 3210.75,
  acceptanceRate: 94,
  completionRate: 99,
};

export const jobHistory = [
  {
    id: "j1",
    restaurant: "Nasi Lemak Village",
    customer: "Aisyah R.",
    time: "12:52 PM",
    earnings: 10.5,
    distanceKm: 2.0,
    durationMin: 20,
    status: "Delivered",
    date: "Today",
    image: "https://images.unsplash.com/photo-1677921755291-c39158477b8e?w=200&q=80",
  },
  {
    id: "j2",
    restaurant: "Roti Canai Maju",
    customer: "Adam R.",
    time: "12:15 PM",
    earnings: 7.2,
    distanceKm: 1.4,
    durationMin: 15,
    status: "Delivered",
    date: "Today",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&q=80",
  },
  {
    id: "j3",
    restaurant: "Satay Station",
    customer: "Priya S.",
    time: "11:40 AM",
    earnings: 12.8,
    distanceKm: 3.1,
    durationMin: 25,
    status: "Delivered",
    date: "Today",
    image: "https://images.unsplash.com/photo-1696385793104-745d4dd65c5a?w=200&q=80",
  },
  {
    id: "j4",
    restaurant: "Ah Kau Char Kway Teow",
    customer: "Kevin T.",
    time: "8:20 PM",
    earnings: 9.5,
    distanceKm: 2.4,
    durationMin: 22,
    status: "Delivered",
    date: "Yesterday",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=200&q=80",
  },
  {
    id: "j5",
    restaurant: "Dim Sum Palace",
    customer: "Sarah L.",
    time: "7:05 PM",
    earnings: 15.4,
    distanceKm: 4.2,
    durationMin: 32,
    status: "Delivered",
    date: "Yesterday",
    image: "https://images.unsplash.com/photo-1767298113547-11e95951608b?w=200&q=80",
  },
  {
    id: "j6",
    restaurant: "Laksa Sarawak",
    customer: "Zulaikha",
    time: "1:15 PM",
    earnings: 8.2,
    distanceKm: 2.1,
    durationMin: 18,
    status: "Cancelled",
    date: "Yesterday",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=200&q=80",
  },
];

export const weeklyEarnings = [
  { day: "Mon", value: 118.5 },
  { day: "Tue", value: 152.4 },
  { day: "Wed", value: 89.2 },
  { day: "Thu", value: 165.7 },
  { day: "Fri", value: 188.3 },
  { day: "Sat", value: 128.5, today: true },
  { day: "Sun", value: 0, future: true },
];

export const earningsBreakdown = [
  { label: "Delivery fees", value: 92.4, icon: "bicycle" },
  { label: "Distance bonus", value: 18.6, icon: "location" },
  { label: "Peak hour bonus", value: 12.0, icon: "flame" },
  { label: "Tips", value: 5.5, icon: "gift" },
];

export const incentives = [
  {
    id: "in1",
    title: "5 more deliveries",
    subtitle: "Complete 5 more to earn RM 30 bonus",
    progress: 12,
    goal: 17,
    reward: "RM 30",
    endsAt: "Ends today 11:59 PM",
  },
  {
    id: "in2",
    title: "Weekend Surge",
    subtitle: "Sat & Sun • 1.5× on all trips",
    progress: 0,
    goal: 0,
    reward: "1.5×",
    endsAt: "Sun 11:59 PM",
    live: true,
  },
];
