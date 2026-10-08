import type { Metadata } from "next";
import SupportingHeader from "@/components/supporting/SupportingHeader";
import InformationSections from "@/components/supporting/InformationSections";
import { returnsSections } from "@/data/supportingPages";
export const metadata: Metadata = { title: "Returns & Exchanges", description: "The structure of future return and exchange information for VANTA." };
export default function ReturnsPage() { return <><SupportingHeader eyebrow="VANTA / INFORMATION" title="RETURNS & EXCHANGES" description="VANTA is a concept store. These information categories outline future purchase terms; no operational returns policy is currently in effect." /><InformationSections sections={returnsSections} /></>; }
