import type { ReactNode } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/components/supporting/supporting.module.css";
export default function SupportingLayout({ children }: { children: ReactNode }) {
  return <><header><AnnouncementBar /><Navbar /></header><main className={styles.main}>{children}</main><Footer /></>;
}
