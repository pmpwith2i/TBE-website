"use client";

import type { FormEvent } from "react";

/**
 * Single contact form for whoever wants to join the team OR become a sponsor —
 * the "Motivo" select routes the request. All copy is inline (it's UI text,
 * not data).
 */
export function JoinForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Form di esempio — collegheremo l'invio in produzione.");
  }

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
      onSubmit={handleSubmit}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="form-field">
          <label>Nome</label>
          <input type="text" placeholder="Mario" required />
        </div>
        <div className="form-field">
          <label>Cognome</label>
          <input type="text" placeholder="Rossi" required />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="form-field">
          <label>Email</label>
          <input type="email" placeholder="mario@esempio.it" required />
        </div>
        <div className="form-field">
          <label>Telefono</label>
          <input type="tel" placeholder="+39 333 123 4567" />
        </div>
      </div>

      <div className="form-field">
        <label>Motivo del contatto</label>
        <select defaultValue="Voglio unirmi al team" required>
          <option>Voglio unirmi al team</option>
          <option>Voglio diventare sponsor</option>
          <option>Altro</option>
        </select>
      </div>

      <div className="form-field">
        <label>Messaggio</label>
        <textarea placeholder="Raccontaci qualcosa di te o della tua azienda." />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          fontSize: 13,
          opacity: 0.75,
          marginTop: 8,
        }}
      >
        <input type="checkbox" required style={{ marginTop: 4 }} />
        <label>
          Acconsento al trattamento dei dati ai sensi del GDPR per essere
          ricontattato/a.
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ alignSelf: "flex-start", marginTop: 16 }}
      >
        Invia messaggio{" "}
        <span className="arrow" aria-hidden>
          →
        </span>
      </button>
    </form>
  );
}
