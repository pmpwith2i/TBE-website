"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, NAV_CTA, SITE } from "@/constants/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Fixed top navigation. The bar is always on a dark surface (solid dark, the
 * dark scrolled state, or over a dark hero), so the logo uses one consistent
 * treatment on every page — no per-page color change.
 */
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

  return (
    <>
      <nav className={navClass}>
        <Link href="/" className="nav-logo">
          <Image
            src={SITE.logos.wordmark}
            alt="Teramo Bike Experience"
            width={60}
            height={30}
            style={{ height: 30, width: "auto" }}
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

        <Link href={NAV_CTA.href} className="nav-cta">
          {NAV_CTA.label}
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
              alt="Teramo Bike Experience"
              width={60}
              height={30}
              style={{ height: 30, width: "auto" }}
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
          href={NAV_CTA.href}
          className="nav-cta"
          onClick={() => setMenuOpen(false)}
        >
          {NAV_CTA.label}
        </Link>
      </div>
    </>
  );
}
