import Image from "next/image";
import Link from "next/link";
import type { CampaignFeatureData } from "@/data/campaignFeature";
import styles from "./campaign-feature.module.css";

export default function CampaignFeature({ campaign }: { campaign: CampaignFeatureData }) {
  return (
    <section id={campaign.id} className={styles.section} aria-labelledby={`${campaign.id}-title`}>
      <p className={styles.eyebrow}>{campaign.eyebrow}</p>
      <figure id={`${campaign.id}-photograph`} className={styles.photograph}>
        <Image
          src={campaign.image.src}
          alt={campaign.image.alt}
          fill
          sizes="(min-width: 1024px) 42vw, (min-width: 768px) 60vw, 100vw"
          className={styles.image}
          style={{ objectPosition: campaign.image.objectPosition }}
        />
      </figure>
      <h2 id={`${campaign.id}-title`} className={styles.statement}>
        {campaign.statementLines.map((line, index) => (
          <span key={line}>{index > 0 && " "}{line}</span>
        ))}
      </h2>
      <div className={styles.details}>
        <p className={styles.description}>{campaign.description}</p>
        <Link href={campaign.cta.href} className={styles.cta}>
          {campaign.cta.label} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <p className={styles.marker}>{campaign.marker}</p>
    </section>
  );
}
