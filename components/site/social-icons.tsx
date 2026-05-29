/**
 * Brand glyphs for the club's social channels. Self-contained SVGs (currentColor)
 * so they inherit the surrounding text color and don't depend on an icon library.
 */

export function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.02H7.9v-2.92h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.92h-2.34V22C18.34 21.25 22 17.08 22 12.06Z" />
    </svg>
  );
}

export function SocialIcon({
  platform,
  size = 24,
}: {
  platform: "instagram" | "facebook";
  size?: number;
}) {
  return platform === "instagram" ? (
    <InstagramIcon size={size} />
  ) : (
    <FacebookIcon size={size} />
  );
}
