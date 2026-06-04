import Image from "next/image";
import { MAIN_SPONSOR } from "@/constants/sponsors";

/**
 * Our principal backer: the logo on a clean white card with a "Main Sponsor"
 * badge. The card stays white so the logo reads on both light (home) and
 * dark (contatti) sections. Self-contained — drop it wherever it fits.
 */
export function MainSponsor() {
  return (
    <div className="main-sponsor">
      <span className="main-sponsor__tag">Main Sponsor</span>
      <div className="main-sponsor__card">
        {MAIN_SPONSOR.logo ? (
          <Image
            src={MAIN_SPONSOR.logo}
            alt={`${MAIN_SPONSOR.name} — ${MAIN_SPONSOR.detail}`}
            width={510}
            height={167}
            className="main-sponsor__logo"
          />
        ) : (
          <span className="main-sponsor__name">{MAIN_SPONSOR.name}</span>
        )}
      </div>
      <span className="main-sponsor__detail">
        {MAIN_SPONSOR.name} · {MAIN_SPONSOR.detail}
      </span>
    </div>
  );
}
