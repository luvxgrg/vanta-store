import type { Metadata } from "next";
import SupportingHeader from "@/components/supporting/SupportingHeader";
import InformationSections from "@/components/supporting/InformationSections";
import { shippingSections } from "@/data/supportingPages";
export const metadata: Metadata = { title: "Shipping", description: "Shipping information and future ordering terms for the VANTA concept store." };
export default function ShippingPage() { return <><SupportingHeader eyebrow="VANTA / INFORMATION" title="SHIPPING" description="VANTA is a concept store. The information below outlines the shipping terms that will be confirmed before live commerce begins." /><InformationSections sections={shippingSections} /></>; }
