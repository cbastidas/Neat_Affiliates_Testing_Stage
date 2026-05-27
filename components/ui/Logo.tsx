import Link from "next/link";

/**
 * Text wordmark used in the navbar.
 * The original markup expected an injected SVG logo; swap this for an
 * <Image> or inline <svg> when the final brand asset is available.
 */
export default function Logo() {
  return (
    <Link
      href="#"
      className="nav-logo flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
      aria-label="Neat Affiliates home"
    >
      <span className="material-symbols-outlined text-primary text-3xl">
        bolt
      </span>
      <span className="font-headline-md text-xl font-bold tracking-tight">
        <span className="text-gradient">Neat</span>
        <span className="text-on-surface"> Affiliates</span>
      </span>
    </Link>
  );
}
