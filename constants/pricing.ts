export const PRICING_PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: 49,
    billingCycle: "month",
    description: "For solo recruiters or small teams starting out",
    features: [
      "Store up to 1,000 CVs",
      "AI-assisted matching (basic keyword matching)",
      "3 user account",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 79,
    billingCycle: "month",
    description: "For small-to-medium agencies",
    features: [
      "Store up to 10,000 CVs",
      "Improved AI matching (context-aware filtering)",
      "Up to 5 users",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 149,
    billingCycle: "month",
    description: "For growing or multi-agent teams",
    features: [
      "Store up to 50,000 CVs",
      "Priority AI matching (faster + smarter)",
      "Up to 10 users",
    ],
  },
];
