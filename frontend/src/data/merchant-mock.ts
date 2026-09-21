// Merchant/restaurant mock data
export const merchantProfile = {
  restaurant: "Nasi Lemak Village",
  branch: "Bukit Bintang",
  image: "https://images.unsplash.com/photo-1677921755291-c39158477b8e?w=400&q=80",
  owner: "Encik Rahim",
  status: "Open • Accepting orders",
  rating: 4.8,
  todayOrders: 87,
  todayRevenue: 1842.5,
  weekRevenue: 12408.9,
  monthRevenue: 48920.4,
  avgPrepMin: 14,
  acceptRate: 98,
};

export type MerchantOrder = {
  id: string;
  ref: string;
  customer: string;
  type: "Delivery" | "Pickup" | "Dine-in";
  table?: string;
  items: { qty: number; name: string; note?: string }[];
  subtotal: number;
  time: string;
  waitedMin: number;
  status: "new" | "preparing" | "ready" | "handed";
  rider?: string;
};

export const merchantOrders: MerchantOrder[] = [
  {
    id: "m1",
    ref: "#A247",
    customer: "Aisyah R.",
    type: "Delivery",
    items: [
      { qty: 1, name: "Nasi Lemak Ayam Rendang", note: "Extra sambal, no peanuts" },
      { qty: 2, name: "Roti Canai (2 pcs)" },
      { qty: 2, name: "Teh Tarik", note: "Less sweet" },
    ],
    subtotal: 34.4,
    time: "12:32 PM",
    waitedMin: 2,
    status: "new",
    rider: "Farhan Ahmad",
  },
  {
    id: "m2",
    ref: "#A246",
    customer: "Adam R.",
    type: "Pickup",
    items: [
      { qty: 2, name: "Nasi Lemak Sambal Sotong" },
      { qty: 1, name: "Iced Milo" },
    ],
    subtotal: 32.5,
    time: "12:28 PM",
    waitedMin: 6,
    status: "preparing",
  },
  {
    id: "m3",
    ref: "#A245",
    customer: "Table 5",
    type: "Dine-in",
    table: "5",
    items: [
      { qty: 1, name: "Chicken Satay (10 sticks)" },
      { qty: 1, name: "Mee Goreng Mamak", note: "Spicy" },
    ],
    subtotal: 27.9,
    time: "12:22 PM",
    waitedMin: 12,
    status: "ready",
  },
  {
    id: "m4",
    ref: "#A244",
    customer: "Priya S.",
    type: "Delivery",
    items: [
      { qty: 1, name: "Mee Goreng Mamak" },
      { qty: 3, name: "Teh Tarik" },
    ],
    subtotal: 20.4,
    time: "12:10 PM",
    waitedMin: 24,
    status: "handed",
    rider: "Zulaikha B.",
  },
];

export const hourlyRevenue = [
  { h: "9am", v: 45 }, { h: "10am", v: 120 }, { h: "11am", v: 285 },
  { h: "12pm", v: 420, peak: true }, { h: "1pm", v: 380 }, { h: "2pm", v: 220 },
  { h: "3pm", v: 95 }, { h: "4pm", v: 60 }, { h: "5pm", v: 110 },
];

export const merchantMenu = [
  { id: "mm1", name: "Nasi Lemak Ayam Rendang", price: 15.9, category: "Signature", stock: "In stock", sold: 42 },
  { id: "mm2", name: "Nasi Lemak Sambal Sotong", price: 14.5, category: "Signature", stock: "In stock", sold: 28 },
  { id: "mm3", name: "Chicken Satay (10 sticks)", price: 18.0, category: "Grill", stock: "In stock", sold: 19 },
  { id: "mm4", name: "Mee Goreng Mamak", price: 9.9, category: "Mains", stock: "Low stock", sold: 34 },
  { id: "mm5", name: "Roti Canai (2 pcs)", price: 4.5, category: "Breakfast", stock: "Out of stock", sold: 0 },
  { id: "mm6", name: "Teh Tarik", price: 3.5, category: "Drinks", stock: "In stock", sold: 88 },
];
