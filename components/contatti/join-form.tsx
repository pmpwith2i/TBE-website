"use client";

import type { FormEvent } from "react";
import { ButtonArrow } from "@/components/site/buttons";

const fieldClass = "flex flex-col gap-2";
const labelClass =
  "font-mono text-[11px] uppercase tracking-[0.2em] text-white/70";
const inputClass =
  "border border-white/15 bg-white/5 px-[18px] py-3.5 font-body text-[15px] text-white transition focus:border-accent focus:bg-white/[0.08] focus:outline-none placeholder:text-white/40";

export function JoinForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Form di esempio — collegheremo l'invio in produzione.");
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 min-[701px]:grid-cols-2">
        <div className={fieldClass}>
          <label className={labelClass}>Nome</label>
          <input className={inputClass} type="text" placeholder="Mario" required />
        </div>
        <div className={fieldClass}>
          <label className={labelClass}>Cognome</label>
          <input className={inputClass} type="text" placeholder="Rossi" required />
        </div>
      </div>

      <div className="grid gap-5 min-[701px]:grid-cols-2">
        <div className={fieldClass}>
          <label className={labelClass}>Email</label>
          <input
            className={inputClass}
            type="email"
            placeholder="mario@esempio.it"
            required
          />
        </div>
        <div className={fieldClass}>
          <label className={labelClass}>Telefono</label>
          <input className={inputClass} type="tel" placeholder="+39 333 123 4567" />
        </div>
      </div>

      <div className={fieldClass}>
        <label className={labelClass}>Motivo del contatto</label>
        <select className={inputClass} defaultValue="Voglio unirmi al team" required>
          <option className="bg-tbe-ink text-white">Voglio unirmi al team</option>
          <option className="bg-tbe-ink text-white">Voglio diventare sponsor</option>
          <option className="bg-tbe-ink text-white">Altro</option>
        </select>
      </div>

      <div className={fieldClass}>
        <label className={labelClass}>Messaggio</label>
        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          placeholder="Raccontaci qualcosa di te o della tua azienda."
        />
      </div>

      <div className="mt-2 flex items-start gap-3 text-[13px] leading-normal opacity-75">
        <input className="mt-1 accent-accent" type="checkbox" required />
        <label>
          Acconsento al trattamento dei dati ai sensi del GDPR per essere
          ricontattato/a.
        </label>
      </div>

      <button
        type="submit"
        className="group mt-4 inline-flex cursor-pointer items-center gap-2.5 self-start border-0 bg-accent px-8 py-4 font-display text-base font-extrabold italic uppercase tracking-[0.1em] text-tbe-white transition-[background,transform] duration-200 [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)] hover:translate-x-1 hover:bg-tbe-amber"
      >
        Invia messaggio <ButtonArrow />
      </button>
    </form>
  );
}
