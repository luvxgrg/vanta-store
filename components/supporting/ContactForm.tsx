"use client";
import { useState, type FormEvent } from "react";
import styles from "./supporting.module.css";

export default function ContactForm() {
  const [attempted, setAttempted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
  }
  return <form className={styles.form} onSubmit={submit}>
    <div className={styles.fields}>
      <label htmlFor="contact-name">NAME<input id="contact-name" name="name" autoComplete="name" required maxLength={120} /></label>
      <label htmlFor="contact-email">EMAIL<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      <label htmlFor="contact-subject" className={styles.full}>SUBJECT<input id="contact-subject" name="subject" required maxLength={200} /></label>
      <label htmlFor="contact-message" className={styles.full}>MESSAGE<textarea id="contact-message" name="message" required rows={6} maxLength={5000} /></label>
    </div>
    <button type="submit">SEND MESSAGE →</button>
    <p className={styles.formNote}>Enquiries are not open yet.</p>
    {attempted && <p role="status" className={styles.formNote}>Your message has not been sent. Please check back when enquiries open.</p>}
  </form>;
}
