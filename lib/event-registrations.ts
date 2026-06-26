import { cookies } from "next/headers";
import { Resend } from "resend";
import type { BikeEvent } from "@/constants/events";
import { SITE } from "@/constants/site";
import {
  createClient as createSupabaseServerClient,
  hasSupabaseConfig,
} from "@/utils/supabase/server";

export type EventRegistrationRecord = {
  id: string;
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

export type PublicEventRegistration = EventRegistrationRecord & {
  created_at: string;
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
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

export function createRegistrationId() {
  return crypto.randomUUID();
}

export function buildRegistrationUrl(registrationId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;
  return new URL(`/iscrizioni/${registrationId}`, baseUrl).toString();
}

function buildTextEmail(
  event: BikeEvent,
  registration: EventRegistrationRecord,
  registrationUrl: string
) {
  const customRows = Object.entries(registration.custom_fields)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return [
    "Nuova pre-iscrizione ricevuta.",
    `Codice iscrizione: ${registration.id}`,
    `Link iscrizione: ${registrationUrl}`,
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
  registrationUrl: string
) {
  const rows = [
    ["Codice iscrizione", registration.id],
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
        Registrazione salvata nel database Supabase.
      </p>
      <p style="margin:0 0 18px;">
        <a href="${escapeHtml(registrationUrl)}" style="color:#c8102e;">Apri scheda iscrizione</a>
      </p>
      <table style="border-collapse:collapse;width:100%;max-width:680px;border:1px solid #eee;">
        <tbody>${bodyRows}</tbody>
      </table>
    </div>`;
}

function buildAttendeeTextEmail(
  event: BikeEvent,
  registration: EventRegistrationRecord,
  registrationUrl: string
) {
  const customRows = Object.entries(registration.custom_fields)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return [
    `Ciao ${registration.first_name},`,
    "",
    `abbiamo ricevuto la tua pre-iscrizione a ${event.title}.`,
    `Codice iscrizione: ${registration.id}`,
    `Puoi rivedere i dati della tua iscrizione qui: ${registrationUrl}`,
    "",
    `Evento: ${event.title}`,
    `Data: ${event.date.label}`,
    customRows ? `\nDati iscrizione:\n${customRows}` : "",
    "",
    "A presto,",
    SITE.name,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildAttendeeHtmlEmail(
  event: BikeEvent,
  registration: EventRegistrationRecord,
  registrationUrl: string
) {
  const rows = [
    ["Codice iscrizione", registration.id],
    ["Evento", event.title],
    ["Data", event.date.label],
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
      <h1 style="font-size:22px;margin:0 0 8px;">Pre-iscrizione ricevuta</h1>
      <p style="margin:0 0 16px;">Ciao ${escapeHtml(registration.first_name)}, abbiamo ricevuto la tua pre-iscrizione a ${escapeHtml(event.title)}.</p>
      <p style="margin:0 0 18px;">
        <a href="${escapeHtml(registrationUrl)}" style="display:inline-block;background:#c8102e;color:#fff;padding:12px 18px;text-decoration:none;font-weight:700;">Rivedi iscrizione</a>
      </p>
      <table style="border-collapse:collapse;width:100%;max-width:680px;border:1px solid #eee;">
        <tbody>${bodyRows}</tbody>
      </table>
      <p style="margin:18px 0 0;color:#555;">A presto,<br>${escapeHtml(SITE.name)}</p>
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
    id: registration.id,
  };
}

export async function sendEventRegistrationEmails({
  event,
  registration,
}: {
  event: BikeEvent;
  registration: EventRegistrationRecord;
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
  const registrationUrl = buildRegistrationUrl(registration.id);
  const [adminEmail, attendeeEmail] = await Promise.all([
    resend.emails.send({
      from,
      to,
      replyTo: registration.email,
      subject: `Nuova pre-iscrizione - ${event.title}`,
      text: buildTextEmail(event, registration, registrationUrl),
      html: buildHtmlEmail(event, registration, registrationUrl),
    }),
    resend.emails.send({
      from,
      to: registration.email,
      replyTo: to[0],
      subject: `Conferma pre-iscrizione - ${event.title}`,
      text: buildAttendeeTextEmail(event, registration, registrationUrl),
      html: buildAttendeeHtmlEmail(event, registration, registrationUrl),
    }),
  ]);

  if (adminEmail.error || attendeeEmail.error) {
    console.error("Resend registration email failed", {
      admin: adminEmail.error,
      attendee: attendeeEmail.error,
    });
    return {
      ok: false,
      reason: "send_failed",
      message:
        "Pre-iscrizione salvata. Non siamo riusciti a inviare una o piu email automatiche.",
    };
  }

  return { ok: true, id: adminEmail.data?.id };
}

export async function getEventRegistrationById(
  id: string
): Promise<PublicEventRegistration | undefined> {
  if (!UUID_RE.test(id) || !hasSupabaseConfig()) {
    return undefined;
  }

  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const { data, error } = await supabase
    .rpc("get_event_registration_by_id", { lookup_id: id })
    .maybeSingle();

  if (error) {
    console.error("Supabase registration lookup failed", error);
    return undefined;
  }

  if (!data) {
    return undefined;
  }

  return data as PublicEventRegistration;
}
