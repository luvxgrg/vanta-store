export interface CampaignFeatureData {
  id: string;
  eyebrow: string;
  statementLines: string[];
  description: string;
  cta: { label: string; href: string };
  marker: string;
  image: { src: string; alt: string; objectPosition: string };
}

export const formCampaign: CampaignFeatureData = {
  id: "campaign-001-form",
  eyebrow: "CAMPAIGN 001 / FORM",
  statementLines: ["FORM IS", "THE", "STATEMENT."],
  description: "Built around proportion, movement and restraint.",
  cta: { label: "EXPLORE THE CAMPAIGN", href: "#campaign-001-form-photograph" },
  marker: "01 / 26",
  image: {
    src: "/images/vanta/products/image-10.jpg",
    alt: "Hooded figure dressed in black seated on an escalator between metallic rails",
    objectPosition: "50% 40%",
  },
};
