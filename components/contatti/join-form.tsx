"use client";

import type { FormEvent } from "react";
import { JOIN_FORM } from "@/constants/contatti";

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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="form-field">
          <label>Età</label>
          <input type="number" min={14} max={80} placeholder="32" />
        </div>
        <div className="form-field">
          <label>Disciplina</label>
          <select defaultValue={JOIN_FORM.disciplines[0]}>
            {JOIN_FORM.disciplines.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-field">
        <label>Esperienza in bici</label>
        <select defaultValue={JOIN_FORM.experience[0]}>
          {JOIN_FORM.experience.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label>Raccontaci qualcosa</label>
        <textarea placeholder={JOIN_FORM.textareaPlaceholder} />
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
        <label>{JOIN_FORM.privacy}</label>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ alignSelf: "flex-start", marginTop: 16 }}
      >
        {JOIN_FORM.submit}{" "}
        <span className="arrow" aria-hidden>
          →
        </span>
      </button>
    </form>
  );
}
