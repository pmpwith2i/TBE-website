import { notFound } from "next/navigation";
import { BtnLink } from "@/components/site/buttons";
import { SectionLabel } from "@/components/site/section-label";
import { SiteShell } from "@/components/site/site-shell";
import { getEventRegistrationById } from "@/lib/event-registrations";
import { pageSeo } from "@/lib/seo";

type RegistrationPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata = pageSeo({
  title: "Iscrizione evento",
  description:
    "Riepilogo privato della pre-iscrizione evento Teramo Bike Experience.",
  path: "/iscrizioni",
  index: false,
});

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Rome",
});
const repeatedCustomFieldLabels = new Set([
  "Tipologia iscrizione",
  "Percorso preferito",
  "Mezzo",
  "Societa o gruppo",
]);

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Non disponibile";
  }

  return dateFormatter.format(date);
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) {
    return null;
  }

  return (
    <div className="border-t border-white/10 pt-4">
      <dt className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
        {label}
      </dt>
      <dd className="m-0 text-base leading-relaxed text-white/85">{value}</dd>
    </div>
  );
}

export default async function RegistrationDetailPage({
  params,
}: RegistrationPageProps) {
  const { id } = await params;
  const registration = await getEventRegistrationById(id);

  if (!registration) {
    notFound();
  }

  const customFields = Object.entries(registration.custom_fields ?? {}).filter(
    ([label]) => !repeatedCustomFieldLabels.has(label)
  );

  return (
    <SiteShell theme="dark">
      <section className="bg-tbe-black px-[var(--gutter)] pb-20 pt-[180px] text-tbe-paper">
        <div className="mx-auto w-full max-w-[var(--maxw)]">
          <SectionLabel light>Pre-iscrizione</SectionLabel>
          <h1 className="max-w-[11ch] font-display text-[clamp(48px,9vw,128px)] font-black italic uppercase leading-[0.85] tracking-[-0.01em]">
            Iscrizione
            <br />
            <span className="text-accent">ricevuta.</span>
          </h1>
          <p className="mt-7 max-w-[58ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-80">
            Conserva questa pagina: contiene il riepilogo della tua
            pre-iscrizione e il codice univoco da mostrare in caso di richiesta.
          </p>
        </div>
      </section>

      <section className="bg-tbe-ink py-[clamp(56px,8vw,104px)]">
        <div className="mx-auto grid w-full max-w-[var(--maxw)] items-start gap-[clamp(36px,7vw,96px)] px-[var(--gutter)] min-[901px]:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div>
            <SectionLabel light>Codice</SectionLabel>
            <div className="break-all font-display text-[clamp(26px,4vw,46px)] font-black italic uppercase leading-[0.95] text-accent">
              {registration.id}
            </div>
            <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-white/65">
              Registrazione ricevuta il {formatDate(registration.created_at)}.
            </p>
          </div>

          <dl className="m-0 grid gap-4 border border-white/10 bg-white/5 p-[clamp(22px,4vw,40px)]">
            <InfoRow label="Evento" value={registration.event_title} />
            <InfoRow label="Data evento" value={registration.event_date_label} />
            <InfoRow
              label="Nome"
              value={`${registration.first_name} ${registration.last_name}`}
            />
            <InfoRow label="Telefono" value={registration.phone} />
            <InfoRow label="Email" value={registration.email} />
            <InfoRow
              label="Tipologia iscrizione"
              value={registration.tipologia_iscrizione}
            />
            <InfoRow label="Percorso" value={registration.percorso} />
            <InfoRow label="Mezzo" value={registration.mezzo} />
            <InfoRow label="Societa o gruppo" value={registration.societa} />
            {customFields.map(([label, value]) => (
              <InfoRow key={label} label={label} value={String(value)} />
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-tbe-black px-[var(--gutter)] py-[var(--section)] text-center">
        <div className="mx-auto max-w-[760px]">
          <h2 className="mb-5 font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88]">
            Hai bisogno di
            <br />
            <span className="text-accent">modificare i dati?</span>
          </h2>
          <p className="mx-auto mb-8 max-w-[50ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-85">
            Scrivici indicando il codice iscrizione: aggiorneremo la scheda
            manualmente prima dell&apos;evento.
          </p>
          <BtnLink href="/contatti">Contattaci</BtnLink>
        </div>
      </section>
    </SiteShell>
  );
}
