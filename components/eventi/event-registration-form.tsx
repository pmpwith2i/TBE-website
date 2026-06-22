"use client";

import { useActionState } from "react";
import type { BikeEvent, EventCustomField } from "@/constants/events";
import {
  submitEventPreRegistration,
  type RegistrationActionState,
} from "@/app/eventi/actions";
import { ButtonArrow } from "@/components/site/buttons";
import { cn } from "@/lib/utils";

const INITIAL_STATE: RegistrationActionState = {
  status: "idle",
  message: "",
};

const fieldClass = "flex flex-col gap-2";
const labelClass =
  "font-mono text-[11px] uppercase tracking-[0.2em] text-white/70";
const inputClass =
  "border border-white/15 bg-white/5 px-[18px] py-3.5 font-body text-[15px] text-white transition focus:border-accent focus:bg-white/[0.08] focus:outline-none placeholder:text-white/40";

function CustomField({ field }: { field: EventCustomField }) {
  const id = `registration-${field.id}`;
  const name = `custom.${field.id}`;

  if (field.type === "select") {
    return (
      <div className={fieldClass}>
        <label className={labelClass} htmlFor={id}>
          {field.label}
        </label>
        <select
          className={inputClass}
          id={id}
          name={name}
          required={field.required}
          defaultValue=""
        >
          <option className="bg-tbe-ink text-white" value="" disabled>
            {field.placeholder ?? "Seleziona"}
          </option>
          {field.options.map((option) => (
            <option className="bg-tbe-ink text-white" key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className={cn(fieldClass, "col-span-full")}>
        <label className={labelClass} htmlFor={id}>
          {field.label}
        </label>
        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          id={id}
          name={name}
          placeholder={field.placeholder}
          required={field.required}
        />
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="col-span-full flex items-start gap-3 text-[13px] leading-[1.45] text-white/80">
        <input
          className="mt-[3px] shrink-0 accent-accent"
          id={id}
          name={name}
          type="checkbox"
          value="on"
          required={field.required}
        />
        <label className="cursor-pointer" htmlFor={id}>
          <span>{field.label}</span>
          {field.help ? (
            <small className="mt-1 block text-white/55">{field.help}</small>
          ) : null}
        </label>
      </div>
    );
  }

  return (
    <div className={fieldClass}>
      <label className={labelClass} htmlFor={id}>
        {field.label}
      </label>
      <input
        className={inputClass}
        id={id}
        name={name}
        type="text"
        placeholder={field.placeholder}
        required={field.required}
      />
    </div>
  );
}

export function EventRegistrationForm({ event }: { event: BikeEvent }) {
  const [state, formAction, pending] = useActionState(
    submitEventPreRegistration,
    INITIAL_STATE
  );

  if (!event.preRegistration.available) {
    return (
      <div
        className="border-l-[3px] border-accent bg-white/5 p-6 text-white/80"
        role="status"
      >
        {event.preRegistration.closedMessage}
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-6 border border-white/10 bg-tbe-ink p-[clamp(24px,4vw,40px)]"
    >
      <input type="hidden" name="eventSlug" value={event.slug} />

      <div>
        <h2 className="font-display text-[clamp(28px,3.4vw,48px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
          {event.preRegistration.formTitle}
        </h2>
        <p className="mt-2.5 text-white/75">{event.preRegistration.intro}</p>
      </div>

      <div className="grid gap-[18px] min-[701px]:grid-cols-2">
        <div className={fieldClass}>
          <label className={labelClass} htmlFor="registration-first-name">
            Nome
          </label>
          <input
            className={inputClass}
            id="registration-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="Mario"
            required
          />
        </div>

        <div className={fieldClass}>
          <label className={labelClass} htmlFor="registration-last-name">
            Cognome
          </label>
          <input
            className={inputClass}
            id="registration-last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Rossi"
            required
          />
        </div>

        <div className={fieldClass}>
          <label className={labelClass} htmlFor="registration-phone">
            Telefono
          </label>
          <input
            className={inputClass}
            id="registration-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+39 333 123 4567"
            required
          />
        </div>

        <div className={fieldClass}>
          <label className={labelClass} htmlFor="registration-email">
            Email
          </label>
          <input
            className={inputClass}
            id="registration-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="mario@esempio.it"
            required
          />
        </div>

        {event.preRegistration.customFields.map((field) => (
          <CustomField key={field.id} field={field} />
        ))}
      </div>

      <div className="flex items-start gap-3 text-[13px] leading-[1.45] text-white/80">
        <input
          className="mt-[3px] shrink-0 accent-accent"
          id="registration-privacy"
          name="privacy"
          type="checkbox"
          required
        />
        <label className="cursor-pointer" htmlFor="registration-privacy">
          <span>
            Acconsento al trattamento dei dati ai sensi del GDPR per essere
            ricontattato/a sulla pre-iscrizione.
          </span>
        </label>
      </div>

      {state.message ? (
        <p
          className={cn(
            "border-l-[3px] border-current px-3.5 py-3 text-sm",
            state.status === "success" && "bg-[#008c451f] text-[#7ee0a1]",
            state.status === "error" && "bg-tbe-red/15 text-[#ffb3bf]"
          )}
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        className="group inline-flex cursor-pointer items-center gap-2.5 self-start border-0 bg-accent px-8 py-4 font-display text-base font-extrabold italic uppercase tracking-[0.1em] text-tbe-white transition-[background,transform] duration-200 [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)] hover:translate-x-1 hover:bg-tbe-amber disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-x-0"
        disabled={pending}
      >
        {pending ? "Invio..." : "Invia pre-iscrizione"}
        <ButtonArrow />
      </button>
    </form>
  );
}
