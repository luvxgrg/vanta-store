import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SupportingHeader from "@/components/supporting/SupportingHeader";
import styles from "@/components/supporting/supporting.module.css";
export const metadata: Metadata = { title: "About", description: "VANTA: a fictional streetwear concept exploring proportion, movement and restraint." };
export default function AboutPage() {
  return <><SupportingHeader eyebrow="ABOUT / VANTA" title="FORM OVER NOISE." description="VANTA is a fictional contemporary streetwear brand and portfolio concept. It explores modern everyday clothing through considered silhouettes, proportion and a quieter visual language." />
    <div className={styles.aboutImage}><Image src="/images/vanta/campaign/hero.jpg" alt="Streetwear campaign model in a concrete architectural setting" fill sizes="100vw" className={styles.image} /></div>
    <div className={styles.philosophy}><section><h2>PROPORTION.</h2><p>Generous shapes and deliberate volume. A wardrobe considered through the relationship between the garment and the body.</p></section><section><h2>MOVEMENT.</h2><p>Everyday forms imagined in motion. Relaxed silhouettes that give the composition room to breathe.</p></section><section><h2>RESTRAINT.</h2><p>A quiet palette, considered details and space for the silhouette to make its statement.</p></section></div>
    <Link href="/collections/drop-001-form" className={styles.link}>EXPLORE DROP 001 — FORM →</Link></>;
}
