"use client";

import { useActionState } from "react";
import type { BikeEvent, EventCustomField } from "@/constants/events";
import {
  submitEventPreRegistration,
  type RegistrationActionState,
} from "@/app/eventi/actions";

const INITIAL_STATE: RegistrationActionState = {
  status: "idle",
  message: "",
};

function CustomField({ field }: { field: EventCustomField }) {
  const id = `registration-${field.id}`;
  const name = `custom.${field.id}`;

  if (field.type === "select") {
    return (
      <div className="form-field">
        <label htmlFor={id}>{field.label}</label>
        <select id={id} name={name} required={field.required} defaultValue="">
          <option value="" disabled>
            {field.placeholder ?? "Seleziona"}
          </option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="form-field registration-grid-full">
        <label htmlFor={id}>{field.label}</label>
        <textarea
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
      <div className="registration-check registration-grid-full">
        <input
          id={id}
          name={name}
          type="checkbox"
          value="on"
          required={field.required}
        />
        <label htmlFor={id}>
          <span>{field.label}</span>
          {field.help ? <small>{field.help}</small> : null}
        </label>
      </div>
    );
  }

  return (
    <div className="form-field">
      <label htmlFor={id}>{field.label}</label>
      <input
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
      <div className="registration-closed" role="status">
        {event.preRegistration.closedMessage}
      </div>
    );
  }

  return (
    <form action={formAction} className="registration-form">
      <input type="hidden" name="eventSlug" value={event.slug} />

      <div>
        <h2 className="display display-m">{event.preRegistration.formTitle}</h2>
        <p>{event.preRegistration.intro}</p>
      </div>

      <div className="registration-grid">
        <div className="form-field">
          <label htmlFor="registration-first-name">Nome</label>
          <input
            id="registration-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="Mario"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="registration-last-name">Cognome</label>
          <input
            id="registration-last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Rossi"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="registration-phone">Telefono</label>
          <input
            id="registration-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+39 333 123 4567"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="registration-email">Email</label>
          <input
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

      <div className="registration-check">
        <input id="registration-privacy" name="privacy" type="checkbox" required />
        <label htmlFor="registration-privacy">
          <span>
            Acconsento al trattamento dei dati ai sensi del GDPR per essere
            ricontattato/a sulla pre-iscrizione.
          </span>
        </label>
      </div>

      {state.message ? (
        <p className={`registration-status ${state.status}`} aria-live="polite">
          {state.message}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Invio..." : "Invia pre-iscrizione"}
        <span className="arrow" aria-hidden>
          →
        </span>
      </button>
    </form>
  );
}
