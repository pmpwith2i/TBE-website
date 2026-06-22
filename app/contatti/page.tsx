import { SiteShell } from "@/components/site/site-shell";
import { pageSeo } from "@/lib/seo";
import { Eyebrow, SectionLabel } from "@/components/site/section-label";
import { SocialIcon } from "@/components/site/social-icons";
import { MainSponsor } from "@/components/site/main-sponsor";
import { JoinForm } from "@/components/contatti/join-form";
import { SOCIALS } from "@/constants/site";

export const metadata = pageSeo({
  title: "Contatti",
  description:
    "Vuoi pedalare con noi o sostenere la squadra? Contatta Teramo Bike Experience su Instagram, Facebook o dal form: ti rispondiamo presto.",
  path: "/contatti",
  keywords: [
    "contatti Teramo Bike Experience",
    "unirsi squadra ciclismo Teramo",
    "iscriversi squadra bici Teramo",
    "diventare sponsor ciclismo Teramo",
  ],
});

const CHANNEL_NOTE: Record<
  "instagram" | "facebook",
  { handle: string; note: string }
> = {
  instagram: {
    handle: "@teramobikeexperience",
    note: "Foto e racconti delle nostre uscite",
  },
  facebook: {
    handle: "Teramo Bike Experience",
    note: "Aggiornamenti ed eventi della squadra",
  },
};

export default function ContattiPage() {
  return (
    <SiteShell theme="dark">
      <section className="bg-tbe-black px-[var(--gutter)] pb-[60px] pt-[180px] text-tbe-paper">
        <div className="mx-auto w-full max-w-[var(--maxw)]">
          <Eyebrow num="/06" light className="mb-8">
            Contatti
          </Eyebrow>
          <h1 className="font-display text-[clamp(60px,12vw,200px)] font-black italic uppercase leading-[0.85] tracking-[-0.01em]">
            Seguici
            <br />
            <span className="text-accent">sui social.</span>
          </h1>
          <p className="mt-8 max-w-[60ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-80">
            Il modo migliore per restare in contatto è sui social: ci trovi su
            Instagram e Facebook, scrivici un messaggio quando vuoi. Oppure
            compila il form qui sotto.
          </p>
        </div>
      </section>

      <section className="bg-tbe-black px-[var(--gutter)] pb-20">
        <div className="mx-auto w-full max-w-[var(--maxw)]">
          <div className="grid gap-1 min-[701px]:grid-cols-2">
            {SOCIALS.map((s) => {
              const meta = CHANNEL_NOTE[s.platform];
              return (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-3 border-t-[3px] border-accent bg-tbe-ink p-8 transition-colors hover:bg-[#1f1f22]"
                >
                  <div className="font-display text-[40px] font-black italic leading-none text-accent [&_svg]:block">
                    <SocialIcon platform={s.platform} size={40} />
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                    {s.label}
                  </div>
                  <div className="font-display text-[22px] font-extrabold italic uppercase leading-[1.1]">
                    {meta.handle}
                  </div>
                  <div className="mt-1 text-[13px] opacity-60">{meta.note}</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-tbe-black px-[var(--gutter)] pb-[100px]">
        <div className="mx-auto w-full max-w-[var(--maxw)]">
          <div className="grid items-center gap-[clamp(40px,8vw,100px)] min-[901px]:grid-cols-2">
            <div>
              <SectionLabel light>Chi ci sostiene</SectionLabel>
              <h2 className="mb-6 font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
                Dietro la squadra,
                <br />
                <span className="text-accent">il territorio.</span>
              </h2>
            </div>

            <MainSponsor />
          </div>
        </div>
      </section>

      <section id="form" className="bg-tbe-ink px-[var(--gutter)] py-[var(--section)]">
        <div className="mx-auto w-full max-w-[var(--maxw)]">
          <div className="grid gap-[clamp(40px,8vw,100px)] min-[901px]:grid-cols-[1fr_1.4fr]">
            <div>
              <SectionLabel light>Scrivici</SectionLabel>
              <h2 className="mb-8 font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
                Unisciti a noi
                <br />
                <span className="text-accent">o diventa sponsor.</span>
              </h2>
              <p className="mb-8 max-w-[42ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-80">
                Che tu voglia correre con noi o sostenere la squadra come
                sponsor, compila il form: ti ricontattiamo il prima possibile.
              </p>
            </div>

            <JoinForm />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
