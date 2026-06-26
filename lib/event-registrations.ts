import { cookies } from "next/headers";
import { Resend } from "resend";
import type { BikeEvent } from "@/constants/events";
import {
  createClient as createSupabaseServerClient,
  hasSupabaseConfig,
} from "@/utils/supabase/server";

export type EventRegistrationRecord = {
  event_slug: string;
  event_title: string;
  event_date_label: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  tipologia_iscrizione: string | null;
  percorso: string | null;
  mezzo: string | null;
  societa: string | null;
  custom_fields: Record<string, string>;
  privacy_accepted: boolean;
};

type SaveRegistrationResult =
  | {
      ok: true;
      id?: string;
    }
  | {
      ok: false;
      message: string;
    };

type SendRegistrationEmailResult =
  | {
      ok: true;
      id?: string;
    }
  | {
      ok: false;
      reason: "not_configured" | "send_failed";
      message: string;
    };

const DEFAULT_REGISTRATION_TABLE = "event_registrations";

function readRecipients(value?: string) {
  return (
    value
      ?.split(",")
      .map((recipient) => recipient.trim())
      .filter(Boolean) ?? []
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildTextEmail(
  event: BikeEvent,
  registration: EventRegistrationRecord,
  registrationId?: string
) {
  const customRows = Object.entries(registration.custom_fields)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return [
    "Nuova pre-iscrizione ricevuta.",
    registrationId ? `ID: ${registrationId}` : "",
    `Evento: ${event.title}`,
    `Data: ${event.date.label}`,
    "",
    `Nome: ${registration.first_name}`,
    `Cognome: ${registration.last_name}`,
    `Telefono: ${registration.phone}`,
    `Email: ${registration.email}`,
    customRows ? `\nCampi evento:\n${customRows}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildHtmlEmail(
  event: BikeEvent,
  registration: EventRegistrationRecord,
  registrationId?: string
) {
  const rows = [
    ["Evento", event.title],
    ["Data", event.date.label],
    ["Nome", registration.first_name],
    ["Cognome", registration.last_name],
    ["Telefono", registration.phone],
    ["Email", registration.email],
    ...Object.entries(registration.custom_fields),
  ];

  const bodyRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;font-weight:600;">${escapeHtml(label)}</th>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.5;">
      <h1 style="font-size:22px;margin:0 0 8px;">Nuova pre-iscrizione</h1>
      <p style="margin:0 0 18px;color:#555;">
        ${registrationId ? `ID registrazione: ${escapeHtml(registrationId)}` : "Registrazione salvata nel database Supabase."}
      </p>
      <table style="border-collapse:collapse;width:100%;max-width:680px;border:1px solid #eee;">
        <tbody>${bodyRows}</tbody>
      </table>
    </div>`;
}

export async function saveEventRegistration(
  registration: EventRegistrationRecord
): Promise<SaveRegistrationResult> {
  if (!hasSupabaseConfig()) {
    return {
      ok: false,
      message:
        "Invio non configurato: imposta NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    };
  }

  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const { error } = await supabase
    .from(DEFAULT_REGISTRATION_TABLE)
    .insert(registration);

  if (error) {
    console.error("Supabase registration insert failed", error);
    return {
      ok: false,
      message:
        "Non siamo riusciti a salvare la pre-iscrizione. Riprova tra poco o scrivici dai contatti.",
    };
  }

  return {
    ok: true,
  };
}

export async function sendEventRegistrationEmail({
  event,
  registration,
  registrationId,
}: {
  event: BikeEvent;
  registration: EventRegistrationRecord;
  registrationId?: string;
}): Promise<SendRegistrationEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EVENT_REGISTRATION_EMAIL_FROM;
  const to = readRecipients(process.env.EVENT_REGISTRATION_EMAIL_TO);

  if (!apiKey || !from || to.length === 0) {
    return {
      ok: false,
      reason: "not_configured",
      message:
        "Pre-iscrizione salvata. Notifica email non configurata: imposta RESEND_API_KEY, EVENT_REGISTRATION_EMAIL_FROM e EVENT_REGISTRATION_EMAIL_TO.",
    };
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: registration.email,
    subject: `Nuova pre-iscrizione - ${event.title}`,
    text: buildTextEmail(event, registration, registrationId),
    html: buildHtmlEmail(event, registration, registrationId),
  });

  if (error) {
    console.error("Resend registration email failed", error);
    return {
      ok: false,
      reason: "send_failed",
      message:
        "Pre-iscrizione salvata. Non siamo riusciti a inviare la notifica email automatica.",
    };
  }

  return { ok: true, id: data?.id };
}
