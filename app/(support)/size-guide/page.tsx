import type { Metadata } from "next";
import SupportingHeader from "@/components/supporting/SupportingHeader";
import InformationSections from "@/components/supporting/InformationSections";
import SizeGuideContent from "@/components/product/SizeGuideContent";
import { sizeGuides } from "@/data/productInformation";
import styles from "@/components/supporting/supporting.module.css";
export const metadata: Metadata = { title: "Size Guide", description: "Concept sizing reference and measuring guidance for VANTA's relaxed silhouettes." };
export default function SizeGuidePage() {
  return <><SupportingHeader eyebrow="VANTA / FIT REFERENCE" title="SIZE GUIDE" description="VANTA explores oversized and relaxed silhouettes. These existing concept measurements are illustrative references, not verified production specifications." />
    <div className={styles.guides}><section className={styles.guide}><h2>OVERSIZED APPAREL</h2><SizeGuideContent guide={sizeGuides.oversized} /></section><section className={styles.guide}><h2>RELAXED BOTTOMS</h2><SizeGuideContent guide={sizeGuides.bottoms} /></section></div>
    <h2 className={styles.measureHeading}>HOW TO MEASURE</h2><InformationSections sections={[
      { title: "CHEST", copy: "For a body measurement, measure around the fullest part of the chest. The table instead lists flat garment chest width: measure across a laid-flat garment, underarm to underarm." },
      { title: "LENGTH", copy: "Measure the garment from the highest shoulder point to the hem." },
      { title: "SHOULDER", copy: "Measure across the back from shoulder point to shoulder point. Shoulder measurements are not currently specified in the concept tables." },
      { title: "WAIST & OUTSEAM", copy: "Measure waist width across the laid-flat waistband. Measure outseam along the outside of the garment from the waistband to the hem." },
    ]} /></>;
}
