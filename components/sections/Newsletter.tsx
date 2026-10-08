import styles from "./newsletter.module.css";

export default function Newsletter() {
  return (
    <section className={styles.section} aria-labelledby="newsletter-title">
      <div>
        <h2 id="newsletter-title">STAY IN FORM.</h2>
        <p className={styles.description}>New drops, campaign releases and studio notes.</p>
      </div>
      <div>
        <div>
          <label htmlFor="newsletter-email" className={styles.label}>Email address</label>
          <div className={styles.inputRow}>
            <input id="newsletter-email" name="email" type="email" autoComplete="email" required placeholder="Your email address" />
            <button type="button">JOIN</button>
          </div>
        </div>
      </div>
    </section>
  );
}
