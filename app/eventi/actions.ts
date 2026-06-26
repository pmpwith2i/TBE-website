"use server";

import { getEventBySlug, type BikeEvent } from "@/constants/events";
import {
  createRegistrationId,
  saveEventRegistration,
  sendEventRegistrationEmails,
  type EventRegistrationRecord,
} from "@/lib/event-registrations";

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
  const customFieldValues: Record<string, string> = {};

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
    customFieldValues[field.id] = value;
  }

  return { ok: true as const, customFields, customFieldValues };
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

  const registration: EventRegistrationRecord = {
    id: createRegistrationId(),
    event_slug: event.slug,
    event_title: event.title,
    event_date_label: event.date.label,
    first_name: firstName,
    last_name: lastName,
    phone,
    email,
    tipologia_iscrizione:
      customResult.customFieldValues.tipologia_iscrizione || null,
    percorso: customResult.customFieldValues.percorso || null,
    mezzo: customResult.customFieldValues.mezzo || null,
    societa: customResult.customFieldValues.societa || null,
    custom_fields: customResult.customFields,
    privacy_accepted: privacyAccepted,
  };

  const saveResult = await saveEventRegistration(registration);
  if (!saveResult.ok) {
    return { status: "error", message: saveResult.message };
  }

  const emailResult = await sendEventRegistrationEmails({
    event,
    registration,
  });

  if (!emailResult.ok) {
    return { status: "success", message: emailResult.message };
  }

  return {
    status: "success",
    message:
      "Pre-iscrizione inviata. Ti abbiamo mandato una conferma via email.",
  };
}
