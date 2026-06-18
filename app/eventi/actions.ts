"use server";

import { getEventBySlug, type BikeEvent } from "@/constants/events";

export type RegistrationActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function readCustomFields(event: BikeEvent, formData: FormData) {
  const customFields: Record<string, string> = {};

  for (const field of event.preRegistration.customFields) {
    const fieldName = `custom.${field.id}`;
    const rawValue = formData.get(fieldName);
    const value =
      field.type === "checkbox" ? (rawValue ? "Si" : "") : readText(rawValue);

    if (field.required && !value) {
      return {
        ok: false as const,
        message: `Compila il campo "${field.label}".`,
      };
    }

    customFields[field.label] = value || "Non indicato";
  }

  return { ok: true as const, customFields };
}

function formatMessage({
  event,
  firstName,
  lastName,
  phone,
  email,
  customFields,
}: {
  event: BikeEvent;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  customFields: Record<string, string>;
}) {
  const customRows = Object.entries(customFields)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return [
    `Evento: ${event.title}`,
    `Data: ${event.date.label}`,
    `Nome: ${firstName}`,
    `Cognome: ${lastName}`,
    `Telefono: ${phone}`,
    `Email: ${email}`,
    customRows ? `\nCampi evento:\n${customRows}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function submitEventPreRegistration(
  _prevState: RegistrationActionState,
  formData: FormData
): Promise<RegistrationActionState> {
  const eventSlug = readText(formData.get("eventSlug"));
  const event = getEventBySlug(eventSlug);

  if (!event) {
    return {
      status: "error",
      message: "Evento non trovato. Ricarica la pagina e riprova.",
    };
  }

  if (!event.preRegistration.available) {
    return {
      status: "error",
      message: event.preRegistration.closedMessage,
    };
  }

  const firstName = readText(formData.get("firstName"));
  const lastName = readText(formData.get("lastName"));
  const phone = readText(formData.get("phone"));
  const email = readText(formData.get("email"));
  const privacyAccepted = formData.get("privacy") === "on";

  if (!firstName || !lastName || !phone || !email) {
    return {
      status: "error",
      message: "Compila nome, cognome, telefono e email.",
    };
  }

  if (!EMAIL_RE.test(email)) {
    return {
      status: "error",
      message: "Inserisci un indirizzo email valido.",
    };
  }

  if (!privacyAccepted) {
    return {
      status: "error",
      message: "Devi accettare il trattamento dei dati per inviare il form.",
    };
  }

  const customResult = readCustomFields(event, formData);
  if (!customResult.ok) {
    return { status: "error", message: customResult.message };
  }

  const endpoint = process.env.EVENT_PREREGISTRATION_ENDPOINT;
  if (!endpoint) {
    return {
      status: "error",
      message:
        "Invio non configurato: imposta EVENT_PREREGISTRATION_ENDPOINT con l'endpoint Formspree del sito.",
    };
  }

  const message = formatMessage({
    event,
    firstName,
    lastName,
    phone,
    email,
    customFields: customResult.customFields,
  });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: `Pre-iscrizione - ${event.title}`,
      event: event.title,
      eventSlug: event.slug,
      date: event.date.label,
      firstName,
      lastName,
      phone,
      email,
      _replyto: email,
      customFields: customResult.customFields,
      message,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      status: "error",
      message:
        "Non siamo riusciti a inviare la pre-iscrizione. Riprova tra poco o scrivici dai contatti.",
    };
  }

  return {
    status: "success",
    message:
      "Pre-iscrizione inviata. Ti ricontatteremo con conferma e dettagli dell'evento.",
  };
}
