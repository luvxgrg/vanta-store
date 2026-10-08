import type { Metadata } from "next";
import SupportingHeader from "@/components/supporting/SupportingHeader";
import ContactForm from "@/components/supporting/ContactForm";
import styles from "@/components/supporting/supporting.module.css";
export const metadata: Metadata = { title: "Contact", description: "Questions, project notes and general enquiries for the VANTA concept." };
export default function ContactPage() { return <><SupportingHeader eyebrow="VANTA / ENQUIRIES" title="CONTACT" /><h2 className={styles.contactHeading}>QUESTIONS, PROJECT NOTES OR GENERAL ENQUIRIES.</h2><ContactForm /></>; }
