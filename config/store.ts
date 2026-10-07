export interface StoreConfig {
  name: string;
  tagline: string;
  description: string;
  locale: string;
  currency: string;
  currencySymbol: string;
  announcement: {
    shipping: string;
    campaign: string;
    market: string;
  };
}

export const storeConfig: StoreConfig = {
  name: "VANTA",
  tagline: "FORM OVER NOISE.",
  description:
    "VANTA is a contemporary streetwear concept exploring modern silhouettes, editorial design and digital fashion commerce.",
  locale: "en-IN",
  currency: "INR",
  currencySymbol: "₹",
  announcement: {
    shipping: "COMPLIMENTARY SHIPPING ON PREPAID ORDERS",
    campaign: "DROP 001 — FORM",
    market: "INDIA / INR",
  },
};
