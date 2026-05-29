"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  NAV_LINKS,
  NAV_CTA_DEFAULT,
  SITE,
  type NavCta,
} from "@/constants/site";
import { useCart } from "@/lib/cart";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav({
  variant = "solid",
  cta = NAV_CTA_DEFAULT,
  cart = false,
  invertLogo = true,
}: {
  variant?: "solid" | "transparent";
  cta?: NavCta;
  cart?: boolean;
  invertLogo?: boolean;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navClass = [
    "nav",
    variant === "solid" ? "solid" : "",
    scrolled ? "scrolled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const ctaLabel = cart ? `Carrello (${count})` : cta.label;
  const ctaHref = cart ? "#" : cta.href;

  return (
    <>
      <nav className={navClass}>
        <Link href="/" className="nav-logo">
          <Image
            src={SITE.logos.wordmark}
            alt="TBE"
            width={60}
            height={30}
            style={{
              height: 30,
              width: "auto",
              filter: invertLogo ? "invert(1)" : undefined,
            }}
            priority
          />
          <span>{SITE.name}</span>
        </Link>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={isActive(pathname, link.href) ? "active" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href={ctaHref} className="nav-cta">
          {ctaLabel}
        </Link>

        <button
          type="button"
          className="nav-burger"
          aria-label="Apri menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        <div className="nav-mobile-head">
          <span className="nav-logo">
            <Image
              src={SITE.logos.wordmark}
              alt="TBE"
              width={60}
              height={30}
              style={{ height: 30, width: "auto", filter: "invert(1)" }}
            />
            <span>{SITE.shortName}</span>
          </span>
          <button
            type="button"
            className="nav-mobile-close"
            aria-label="Chiudi menu"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <ul className="nav-mobile-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={isActive(pathname, link.href) ? "active" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={ctaHref}
          className="nav-cta"
          onClick={() => setMenuOpen(false)}
        >
          {ctaLabel}
        </Link>
      </div>
    </>
  );
}
