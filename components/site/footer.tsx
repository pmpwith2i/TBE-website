import Link from "next/link";
import { SITE, FOOTER_COLUMNS, SOCIALS } from "@/constants/site";
import { BrandMark } from "./brand-mark";
import { SocialIcon } from "./social-icons";

export function Footer() {
  return (
    <footer className="mt-[var(--section)] bg-tbe-black px-[var(--gutter)] pb-8 pt-20 text-tbe-paper">
      <div className="mx-auto grid max-w-[var(--maxw)] grid-cols-1 gap-12 border-b border-white/10 pb-14 min-[801px]:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <BrandMark />
          <p className="max-w-[36ch] text-sm opacity-70">
            {SITE.legalName} · {SITE.affiliation}
            <br />
            {SITE.address}
            <br />
            {SITE.vat}
          </p>
          <p className="mt-3 max-w-[42ch] text-xs leading-normal opacity-55">
            {SITE.affiliationDetail}
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 font-display text-sm font-extrabold italic uppercase tracking-[0.15em] text-accent">
              {col.title}
            </h4>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link className="text-sm opacity-80 transition hover:text-accent hover:opacity-100" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 font-display text-sm font-extrabold italic uppercase tracking-[0.15em] text-accent">
            Seguici
          </h4>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {SOCIALS.map((s) => (
              <li key={s.platform}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm opacity-80 transition hover:text-accent hover:opacity-100 [&_svg]:block"
                >
                  <SocialIcon platform={s.platform} size={18} />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[var(--maxw)] flex-col gap-2 pt-6 font-mono text-[11px] uppercase tracking-[0.15em] opacity-50 min-[801px]:flex-row min-[801px]:justify-between">
        <div>{SITE.copyright}</div>
        <div>{SITE.madeWith}</div>
      </div>
    </footer>
  );
}
