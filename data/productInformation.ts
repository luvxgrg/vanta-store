export interface SizeGuide {
  title: string;
  columns: string[];
  rows: { size: string; measurements: number[] }[];
  note: string;
}

// Illustrative garment measurements, never presented as verified specifications.
export const sizeGuides: Record<"oversized" | "bottoms", SizeGuide> = {
  oversized: {
    title: "Oversized silhouette / CM",
    columns: ["Chest width", "Body length"],
    rows: [
      { size: "S", measurements: [56, 70] },
      { size: "M", measurements: [59, 72] },
      { size: "L", measurements: [62, 74] },
      { size: "XL", measurements: [65, 76] },
      { size: "XXL", measurements: [68, 78] },
    ],
    note: "Concept-store sizing only. Illustrative flat garment measurements, not verified production specifications. Chest width is measured across the garment, not around the body.",
  },
  bottoms: {
    title: "Relaxed bottoms / CM",
    columns: ["Waist width", "Outseam"],
    rows: [
      { size: "S", measurements: [36, 102] },
      { size: "M", measurements: [38, 104] },
      { size: "L", measurements: [40, 106] },
      { size: "XL", measurements: [42, 108] },
      { size: "XXL", measurements: [44, 110] },
    ],
    note: "Concept-store sizing only. Illustrative flat garment measurements, not verified production specifications. Waist width is measured flat.",
  },
};

export const shippingAndReturns = [
  "VANTA is a concept store. Orders and shipping are not available yet.",
  "Delivery times, shipping charges and return terms will be published before purchases are enabled.",
];
