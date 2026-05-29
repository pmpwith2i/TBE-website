import Link from "next/link";
import { SITE, FOOTER_COLUMNS, SOCIALS } from "@/constants/site";
import { BrandMark } from "./brand-mark";
import { SocialIcon } from "./social-icons";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <BrandMark />
          <p style={{ opacity: 0.7, fontSize: 14, maxWidth: "36ch" }}>
            {SITE.legalName} · {SITE.affiliation}
            <br />
            {SITE.address}
            <br />
            {SITE.vat}
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4>Seguici</h4>
          <ul className="footer-socials">
            {SOCIALS.map((s) => (
              <li key={s.platform}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  <SocialIcon platform={s.platform} size={18} />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>{SITE.copyright}</div>
        <div>{SITE.madeWith}</div>
      </div>
    </footer>
  );
}
