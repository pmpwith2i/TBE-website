"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, NAV_CTA, SITE } from "@/constants/site";
import { MAIN_SPONSOR } from "@/constants/sponsors";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const navLinkClass =
  "relative px-4 py-2.5 font-display text-[15px] font-semibold italic uppercase tracking-[0.08em] text-tbe-ink/80 transition-colors duration-200 after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 after:content-[''] hover:text-tbe-black hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const navCtaClass =
  "inline-flex bg-accent px-[22px] py-2.5 font-display text-sm font-extrabold italic uppercase tracking-[0.1em] text-tbe-white shadow-[0_12px_28px_-20px_rgba(200,16,46,0.9)] transition-[background,transform,box-shadow] duration-200 [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)] hover:-translate-y-0.5 hover:bg-tbe-red-dark hover:shadow-[0_16px_32px_-20px_rgba(10,10,10,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

function BrandLogoLockup({
  fetchPriority,
}: {
  fetchPriority?: "high" | "low" | "auto";
}) {
  return (
    <>
      <Image
        src={SITE.logos.appIcon}
        alt=""
        width={512}
        height={512}
        className="h-10 w-10 shrink-0 rounded-full object-contain"
        fetchPriority={fetchPriority}
      />
      <Image
        src={SITE.logos.wordmark}
        alt="Teramo Bike Experience"
        width={60}
        height={30}
        className="h-[30px] w-auto shrink-0"
        fetchPriority={fetchPriority}
      />
    </>
  );
}

function SponsorLogoLockup({
  fetchPriority,
}: {
  fetchPriority?: "high" | "low" | "auto";
}) {
  if (!MAIN_SPONSOR.logo) return null;

  return (
    <div
      className="flex shrink-0 items-center border-l border-black/15 pl-2 min-[390px]:pl-2.5 min-[520px]:pl-3"
      role="img"
      aria-label={`Main sponsor: ${MAIN_SPONSOR.name}, ${MAIN_SPONSOR.detail}`}
    >
      <Image
        src={MAIN_SPONSOR.logo}
        alt=""
        width={700}
        height={167}
        className="h-4 w-auto shrink-0 object-contain min-[390px]:h-5 min-[520px]:h-6 min-[921px]:h-7 xl:h-8"
        fetchPriority={fetchPriority}
      />
    </div>
  );
}

export function Nav({
  variant = "solid",
}: {
  variant?: "solid" | "transparent";
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-[10000] flex items-center justify-between gap-6 border-b border-black/10 bg-tbe-paper/92 px-[var(--gutter)] py-[18px] text-tbe-black shadow-[0_18px_42px_-34px_rgba(10,10,10,0.45)] backdrop-blur-md transition-[background,color,padding,box-shadow] duration-300",
          variant === "transparent" &&
            !scrolled &&
            "bg-tbe-paper/86 shadow-[0_16px_36px_-34px_rgba(10,10,10,0.35)]",
          (variant === "solid" || scrolled) &&
            "bg-tbe-white/96 py-3 shadow-[0_18px_44px_-32px_rgba(10,10,10,0.5)]"
        )}
      >
        <div className="flex min-w-0 items-center gap-2.5 min-[520px]:gap-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 font-display text-[22px] font-black italic uppercase tracking-[0.02em]"
          >
            <BrandLogoLockup fetchPriority="high" />

          </Link>
          <SponsorLogoLockup fetchPriority="high" />
        </div>

        <ul className="m-0 hidden list-none items-center gap-1 p-0 min-[921px]:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    navLinkClass,
                    active && "text-accent after:scale-x-100 hover:text-tbe-red"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href={NAV_CTA.href} className={cn(navCtaClass, "hidden min-[921px]:inline-flex")}>
          {NAV_CTA.label}
        </Link>

        <button
          type="button"
          className="inline-flex flex-col gap-[5px] bg-transparent p-2 text-tbe-black min-[921px]:hidden"
          aria-label="Apri menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span className="block h-0.5 w-[26px] bg-current" />
          <span className="block h-0.5 w-[26px] bg-current" />
          <span className="block h-0.5 w-[26px] bg-current" />
        </button>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-[200] flex flex-col bg-tbe-paper px-[var(--gutter)] py-6 text-tbe-black transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          menuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="mb-12 flex items-center justify-between border-b border-black/10 pb-5">
          <span className="flex items-center gap-3 font-display text-[22px] font-black italic uppercase tracking-[0.02em]">
            <BrandLogoLockup />
            <span className="whitespace-nowrap">{SITE.shortName}</span>
          </span>
          <button
            type="button"
            className="bg-transparent font-display text-3xl leading-none text-current transition-colors hover:text-accent"
            aria-label="Chiudi menu"
            onClick={() => setMenuOpen(false)}
          >
            x
          </button>
        </div>

        <ul className="m-0 flex list-none flex-col gap-1 p-0">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block border-b border-black/10 py-2.5 font-display text-[clamp(36px,9vw,64px)] font-black italic uppercase leading-none text-tbe-black transition-colors hover:text-accent",
                    active && "text-accent"
                  )}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href={NAV_CTA.href}
          className={cn(navCtaClass, "mt-8 self-start px-7 py-3.5 text-lg")}
          onClick={() => setMenuOpen(false)}
        >
          {NAV_CTA.label}
        </Link>
      </div>
    </>
  );
}
